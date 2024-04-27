import {  NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import savednotes from "../models/savedNotesSchema";




// post data to server
export async function POST(req,res) {
  try {



const {postId,userActiveEmail}=await req.json();

// undefined Id Error
  if(postId==undefined){
    return NextResponse.json(
        {
          message: "Please Try Again",
        },
        {
          status: 400,
        }
      );
  }

// user not login 
if(userActiveEmail==undefined){
    return NextResponse.json(
        {
          message: "Please Login To Saved This Post",
        },
        {
          status: 400,
        }
      );
  }


// find User
let findUser=await clientPersonalData.findOne({email:userActiveEmail});
if(findUser==null){
    return NextResponse.json(
        {
          message: "Please Login With Valid Account",
        },
        {
          status: 400,
        }
      );   
}
let userActiveId=findUser._id;

// find weather post is valid or not

let findPost=await uploadPosts.findById(postId);
if(findPost==null){
    return NextResponse.json(
        {
          message: "Post You Provided Is Not Exists",
        },
        {
          status: 400,
        }
      );   

}

let postActiveId=await findPost._id;
let postAuthorId=await findPost.autherId;


// check weather user not saved their own notes
if(postAuthorId==userActiveId){
    return NextResponse.json(
        {
          message: "You Not Save Your Own Notes",
        },
        {
          status: 400,
        }
      );    
}



// check weather already saved this not or not
let checkWeatherAlreadySavedOrNot=await savednotes.findOne({autherId:userActiveId,postId:postActiveId});
// already saved
if(checkWeatherAlreadySavedOrNot){
    return NextResponse.json(
        {
          message: "You Already Saved This Notes",
        },
        {
          status: 400,
        }
      );   
}
// new note saved
else{

    let savesNotes=new savednotes({
        autherId:userActiveId,postId:postActiveId
    })
    await savesNotes.save();
    
  
  return NextResponse.json(
    {
      message: "You Successfully Saved This Note",
    },
    {
      status: 200,
    }
  );

}


     

  
  
  
  
 
  
  





  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
    
    
}
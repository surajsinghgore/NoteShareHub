import {  NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import savednotes from "../models/savedNotesSchema";
import DbConnection from "../controller/DatabaseConnection";


// get notes

export async function GET(req,res){
  await DbConnection();
  if(req.nextUrl.searchParams.get('user')!=undefined){
    let userEmailId=req.nextUrl.searchParams.get('user');

    let userData=await clientPersonalData.findOne({email:userEmailId});
    if(userData==null){
      return NextResponse.json(
        {
          postdata: "User Not Found , Please relogin"
        },
        {
          status: 404,
        }
      );
    }

// find all saved post
let savedNotes=await savednotes.find({autherId:userData._id})


let notesData=[];

for (let index = 0; index < savedNotes.length; index++) {
let findPost=await uploadPosts.findById(savedNotes[index].postId)
  if(findPost!=null){
    notesData.push({id:findPost._id,title:findPost.title,keyword:findPost.keyword,dateandtime:findPost.dateandtime,image:findPost.post_media})
  }
}



    return NextResponse.json(
      {
        data: notesData
      },
      {
        status: 200,
      }
    );
  }
}

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

  await DbConnection();
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




export async function DELETE(req,res){

let {userEmail,postIdToDelete}=await req.json();
  await DbConnection();

    let userData=await clientPersonalData.findOne({email:userEmail});
    if(userData==null){
      return NextResponse.json(
        {
          postdata: "User Not Found , Please relogin"
        },
        {
          status: 404,
        }
      );
    }
let userId=userData._id;
 // find all saved post
let savedNotesData=await savednotes.findOne({autherId:userId,postId:postIdToDelete})
if(savedNotesData==null){
  return NextResponse.json(
    {
      message: "Post Not Found"
    },
    {
      status: 404,
    }
  );
}

await savednotes.findByIdAndDelete(savedNotesData._id);
    return NextResponse.json(
      {
        message: "Note Successfully removed from Your Save Notes"
      },
      {
        status: 200,
      }
    );
  }

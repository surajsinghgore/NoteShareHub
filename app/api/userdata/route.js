import {  NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import DbConnection from "../controller/DatabaseConnection";

export async function GET(req,res){
await DbConnection();
    if(req.nextUrl.searchParams.get('user')!=undefined){
        let userEmailId=req.nextUrl.searchParams.get('user');
        let userActiveEmailId=req.nextUrl.searchParams.get('userLogin');

// check weather user Exists or not
let userData=await clientPersonalData.findOne({email:userEmailId})

if(userData==null){
    return NextResponse.json(
              {
                message: "User Not Found",
              },
              {
                status: 404,
              }
            );
          }

        // check weather user data from without login user 
    if(userActiveEmailId=="no"){
// send only public post of user
let publicUserPost=await uploadPosts.find({autherId:userData._id,visibility:"public"}).select("-autherId -comments -createdAt -dateandtime -description -keyword -mainId -updatedAt -visibility -__v").sort({dateandtime:-1});


let UserDataInfo={name:userData.name,email:userData.email,image:userData.image,follower:userData.follower.length,following:userData.following.length};
return NextResponse.json(
    {
      postdata: publicUserPost,userdata:UserDataInfo,message:"Success"
    },
    {
      status: 200,
    }
  );

    }



// if active account but not of their own profile
    else if(userEmailId!==userActiveEmailId){
// send only public post of user
let publicUserPost=await uploadPosts.find({autherId:userData._id,visibility:"public"}).select("-autherId -comments -createdAt -dateandtime -description -keyword -mainId -updatedAt -visibility -__v").sort({dateandtime:-1});


let UserDataInfo={name:userData.name,email:userData.email,image:userData.image,follower:userData.follower.length,following:userData.following.length};
return NextResponse.json(
    {
      postdata: publicUserPost,userdata:UserDataInfo,message:"Success"
    },
    {
      status: 200,
    }
  );
    }

    else if(userEmailId==userActiveEmailId){
     
// send only public post of user
let publicUserPost=await uploadPosts.find({autherId:userData._id}).select("-autherId -comments -createdAt -dateandtime -description -keyword -mainId -updatedAt -visibility -__v").sort({dateandtime:-1});


let UserDataInfo={name:userData.name,email:userData.email,image:userData.image,follower:userData.follower.length,following:userData.following.length};
return NextResponse.json(
    {
      postdata: publicUserPost,userdata:UserDataInfo,message:"Success"
    },
    {
      status: 200,
    }
  );
    }

    
    
      return NextResponse.json(
        {
          data: "newData[0]",postOwner:"arr",message:"Success"
        },
        {
          status: 200,
        }
      );
    }
  
  
    
  }
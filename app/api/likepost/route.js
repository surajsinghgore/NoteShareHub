const cloudinary = require('cloudinary');
import { NextRequest, NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import likePosts from "../models/likeposts";

import { headers } from 'next/headers'
 




// post data to server
export async function POST(req,res) {
  try {
const {postId}=await req.json();

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

// check user data
  const headersList = headers()
  const emailId = headersList.get('authorization')
let userRatingData=await clientPersonalData.findOne({email:emailId})

if(userRatingData==null){
    return NextResponse.json(
        {
          message: "Please Login To Give Rating",
        },
        {
          status: 404,
        }
      );
}
let userLikeId=userRatingData._id;

// find post 
let findPostData=await uploadPosts.findById(postId);
if(findPostData==null){
    return NextResponse.json(
        {
          message: "Please Try Again",
        },
        {
          status: 404,
        }
      );
}
let likePostId=findPostData._id;
let likeCounter=parseInt(findPostData.like);

// check weather already give like or not
// now update the post

let findWeatherAlreadyLikeToThisPostOrNot=await likePosts.find({autherId:userLikeId,postId:likePostId});
// means already give rate to this id
if(findWeatherAlreadyLikeToThisPostOrNot.length!=0){
    return NextResponse.json(
        {
          message: "You Already Like This Post",
        },
        {
          status: 200,
        }
      );
}
else{
    ++likeCounter;
    await uploadPosts.findByIdAndUpdate(likePostId,{ $set: { like: likeCounter}});
    let likePostEntry = new likePosts({
        autherId:userLikeId,
        postId:likePostId,
    
      });
await likePostEntry.save();
}

return NextResponse.json(
    {
      message: "Post Like Successfully",
    },
    {
      status: 200,
    }
  );

//   check weather user is login or not


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
import {  NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import likePosts from "../models/likeposts";
import { headers } from 'next/headers'
import disLikePosts from "../models/dislikepost";
 




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
let LikeCounter=parseInt(findPostData.like);
let disLikeCounter=parseInt(findPostData.dislike);

// check weather already give like or not
// now update the post
let findWeatherAlreadyDisLikeToThisPostOrNot=await disLikePosts.find({autherId:userLikeId,postId:likePostId});

let findWeatherAlreadyLikeToThisPostOrNot=await likePosts.find({autherId:userLikeId,postId:likePostId});




// means dislike is given by user ,so decrement dislike and increment like
if(findWeatherAlreadyDisLikeToThisPostOrNot.length!=0){
  
  // means already give like to this id
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
  // means like
  else{
  
   let disLikeIdPost=findWeatherAlreadyDisLikeToThisPostOrNot[0]._id;
  
   ++LikeCounter;
   --disLikeCounter;
  
      await uploadPosts.findByIdAndUpdate(likePostId,{ $set: { like: LikeCounter,dislike:disLikeCounter}});
      let LikePostEntry = new likePosts({
          autherId:userLikeId,
          postId:likePostId
      
        });
  await LikePostEntry.save();
  
  // remove like from db
  await disLikePosts.findByIdAndRemove(disLikeIdPost);
  
  
  return NextResponse.json(
      {
        message: "Post Like Successfully",
      },
      {
        status: 200,
      }
    );
  }
  
  
  
  
    
  }
  
  // means not dislike given ,first time like
  else{

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
  // means dislike
  else{
  
   
  
      ++LikeCounter;
  
      await uploadPosts.findByIdAndUpdate(likePostId,{ $set: { like: LikeCounter}});
      let likePostEntry = new likePosts({
          autherId:userLikeId,
          postId:likePostId
      
        });
  await likePostEntry.save();
  
  
  return NextResponse.json(
      {
        message: "Post Like Successfully",
      },
      {
        status: 200,
      }
    );
  
  
  }
  
  
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
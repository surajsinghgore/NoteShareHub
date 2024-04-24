import {  NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import likePosts from "../models/likeposts";
import disLikePosts from "../models/dislikepost";
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
let disLikeCounter=parseInt(findPostData.dislike);
let LikeCounter=parseInt(findPostData.like);





// check weather already give dislike or not
// now update the post

let findWeatherAlreadyDisLikeToThisPostOrNot=await disLikePosts.find({autherId:userLikeId,postId:likePostId});


let findWeatherAlreadyLikeToThisPostOrNot=await likePosts.find({autherId:userLikeId,postId:likePostId});


// means like is given by user ,so decrement like and increment dislike
if(findWeatherAlreadyLikeToThisPostOrNot.length!=0){

// means already give rate to this id
if(findWeatherAlreadyDisLikeToThisPostOrNot.length!=0){
    return NextResponse.json(
        {
          message: "You Already Dislike This Post",
        },
        {
          status: 200,
        }
      );
}
// means dislike
else{

 let LikeIdPost=findWeatherAlreadyLikeToThisPostOrNot[0]._id;

 ++disLikeCounter;
 --LikeCounter;

    await uploadPosts.findByIdAndUpdate(likePostId,{ $set: { dislike: disLikeCounter,like:LikeCounter}});
    let disLikePostEntry = new disLikePosts({
        autherId:userLikeId,
        postId:likePostId
    
      });
await disLikePostEntry.save();

// remove like from db
await likePosts.findByIdAndRemove(LikeIdPost);


return NextResponse.json(
    {
      message: "Post Dislike Successfully",
    },
    {
      status: 200,
    }
  );
}




 






}

// means not like given ,first time dislike
else{

// means already give rate to this id
if(findWeatherAlreadyDisLikeToThisPostOrNot.length!=0){
    return NextResponse.json(
        {
          message: "You Already Dislike This Post",
        },
        {
          status: 200,
        }
      );
}
// means dislike
else{

 

    ++disLikeCounter;

    await uploadPosts.findByIdAndUpdate(likePostId,{ $set: { dislike: disLikeCounter}});
    let disLikePostEntry = new disLikePosts({
        autherId:userLikeId,
        postId:likePostId
    
      });
await disLikePostEntry.save();


return NextResponse.json(
    {
      message: "Post Dislike Successfully",
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
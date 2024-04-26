import {  NextRequest,NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import likePosts from "../models/likeposts";
import { headers } from 'next/headers'
import disLikePosts from "../models/dislikepost";
import mongoose from "mongoose";
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
console.log(typeof userActiveEmailId)



    //   let data=await uploadPosts.findById(postId).select("-autherId -mainId -title -createdAt -description -post_media -visibility -dateandtime -__v -_id -like -dislike -updatedAt -keyword");
      
  
  
  
    //   let newData=await uploadPosts.aggregate([ 
    //     { $match : { _id: new mongoose.Types.ObjectId(postId) } },
    //     { "$unwind": "$comments" }, // Unwind the comments array
    // { "$sort": { "comments.dateandtime": -1 } }, // Sort comments by dateandtime in descending order
    // { "$group": { "_id": "$_id", "comments": { "$push": "$comments" } } }
    //   ])
   
    //   if(data==null){
    //     return NextResponse.json(
    //       {
    //         message: "Post Not Found With Is Id",
    //       },
    //       {
    //         status: 404,
    //       }
    //     );
    //   }
    
    //   let arr=[];
  
    //   for (let index = 0; index <  newData[0].comments.length; index++) {
    //     let id= newData[0].comments[index].userId;
    //   let userData=await clientPersonalData.findById(id);
    //   let userEmail=userData.email;
    //   let userName=userData.name;
    //   let userImage=userData.image;
    //   let postCommentID=newData[0].comments[index]._id;
    //   arr.push({userEmail,userName,userImage,postCommentID})
    //   }
  
    
  
    
    
    
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
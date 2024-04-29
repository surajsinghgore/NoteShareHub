
import {  NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
import showNotification from "../models/showNotification";
import uploadPosts from "../models/uploadposts";

// get all post data which is public
export async function GET(req,res) {
try {
  await DbConnection();

// find all notification
if(req.nextUrl.searchParams.get('userActiveEmail')!=undefined){
  let userActiveEmail=req.nextUrl.searchParams.get('userActiveEmail')
// find userDetails
let userData=await clientPersonalData.findOne({email:userActiveEmail})
if(userData==null){
    return NextResponse.json(
        {
          message: "Please Relogin Account",
        },
        {
          status: 404,
        }
      );
}

let userActiveId=userData._id;
// check pending notification of user
let findPendingNotes=await showNotification.find({"followerWhoNotSeenThePost.userId":userActiveId})
if(findPendingNotes.length==0){
    return NextResponse.json(
        {
          data: [],message:"No Pending Notification"
        },
        {
          status: 200,
        }
      );
}

let dataOfNotification=[];

for (let index = 0; index < findPendingNotes.length; index++) {
   
  // means pending notification
let findPostData=await uploadPosts.findById(findPendingNotes[index].postId).select("_id title autherId");

// find also userData

    let postOwner=findPostData.autherId;
    let postOwnerData=await clientPersonalData.findById(postOwner);


        dataOfNotification.push({ownerName:postOwnerData.name,ownerId:postOwnerData._id,ownerImage:postOwnerData.image,email:postOwnerData.email,postId:findPostData._id,postTitle:findPostData.title})
        console.log({ownerId:postOwnerData._id,ownerImage:postOwnerData.image,email:postOwnerData,postId:findPostData._id,postTitle:findPostData.title})
    

  
}

  return NextResponse.json(
    {
      data: dataOfNotification,message:"Success"
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
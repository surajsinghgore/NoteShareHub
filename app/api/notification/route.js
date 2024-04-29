
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


// delete userNotification
export async function DELETE(req,res){
    
    try {

      
  let postId=req.nextUrl.searchParams.get('postId')
  let userEmail=req.nextUrl.searchParams.get('userEmail')

    if(postId==undefined){
        return NextResponse.json(
            {
              message:"Please Provide Id Of Post"
            },
            {
              status: 400,
            }
          );  
    }
    if(userEmail==undefined){
        return NextResponse.json(
            {
              message:"Please Login Again"
            },
            {
              status: 400,
            }
          );  
    }
    await DbConnection();
    // get user Id
let userData=await clientPersonalData.findOne({email:userEmail})
if(userData==null){
    return NextResponse.json(
        {
          message:"Please Login Again"
        },
        {
          status: 400,
        }
      );  
}
let userActiveId=userData._id;

    // fetch post in notification
let notificationData=await showNotification.findOne({postId,"followerWhoNotSeenThePost.userId":userActiveId})
if(notificationData==null){
    return NextResponse.json(
        {
          message:"Notification Not Found"
        },
        {
          status: 404,
        }
      );  
}
await showNotification.updateOne(  {postId,"followerWhoNotSeenThePost.userId":userActiveId},
    { $pull: { followerWhoNotSeenThePost: { userId: userActiveId } } }
 
  );



// delete full notification from table is all users viewed the profile
let reCheckNotificationData=await showNotification.findOne({postId})
if(reCheckNotificationData.followerWhoNotSeenThePost.length==0){
    await showNotification.findOneAndDelete({postId})
}

        return NextResponse.json(
            {
             message:"Notification Success Removed On Click"
            },
            {
              status: 200,
            }
          );
    } catch (error) {
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
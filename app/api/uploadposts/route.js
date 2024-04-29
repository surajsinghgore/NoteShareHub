const cloudinary = require('cloudinary');
import {  NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
import notificationSchema from "../models/showNotification";
import uploadPosts from "../models/uploadposts";
const crypto = require('crypto');

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});






// post data to server
export async function POST(req) {
  try {

    const formData  = await req.formData()
    const files = formData.getAll('files');
    const title = formData.getAll('title');
    const keyword = formData.getAll('keyword');
    const visibility = formData.getAll('visibility');
    const description = formData.getAll('description');
    const userActiveEmail = formData.get('userActiveEmail');
    await DbConnection();
    
// validate weather all inputs is provided from form or not
if((title==undefined)||(keyword==undefined)||(visibility==undefined)||(description==undefined)||(files==undefined)){
  return NextResponse.json(
    {
      message: "Please fill all the fields properly",
    },
    {
      status: 400,
    }
  );
}
  //  validate valid user or not
  let data=await clientPersonalData.findOne({email:userActiveEmail});
  if(data==null){
    return NextResponse.json(
      {
        message: "User Not Found With This Email Id",
      },
      {
        status: 404,
      }
    );

  }
  let userActiveId=data._id;

  // check all post like title, keywords , description,visibility is equal to post size
  if((files.length!==title.length)||(files.length!==keyword.length)||(files.length!==visibility.length)||(files.length!==description.length)){
    return NextResponse.json(
      {
        message: "Please fill all the fields properly",
      },
      {
        status: 400,
      }
    );
  }
  
// Generate a random unique string (or use any unique data)
const uniqueData = Math.random().toString(); 
// Create a hash using SHA256 algorithm
const hash = crypto.createHash('sha256');
// Update the hash object with the unique data
hash.update(uniqueData);
// Generate the unique number by digesting the hash
const uniqueNumber = hash.digest('hex');

  for (let index = 0; index < files.length; index++) {

    //title value get
let titleArray= title[index].split(",");
titleArray.shift();
let titleValue=titleArray.join();

// keyword value gets
let keywordArray= keyword[index].split(",");
keywordArray.shift();

    //description value get
    let descriptionArray= description[index].split(",");
    descriptionArray.shift();
    let descriptionValue=descriptionArray.join();
    

   //visibility value get
   let visibilityArray= visibility[index].split(",");
   visibilityArray.shift();
   let visibilityValue=visibilityArray.join();
   
    const fileBuffer = await files[index].arrayBuffer();
    const mimeType = files[index].type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
    const res = await cloudinary.uploader.upload(fileUri, {public_id: files[index].name});
let url=res.url;

let sendpostdata=new uploadPosts({
  autherId:userActiveId,
 
  title:titleValue,
  keyword:keywordArray,
  description:descriptionValue,
  post_media:url,
  visibility:visibilityValue,
  mainId:uniqueNumber,
  })
  let postJustSendData=await sendpostdata.save();
// send this to all users who follow them so that they get notified when ever new post is posted only, public post

if(visibilityValue=="public"){


  let notificationSchemaData=new notificationSchema({
    autherId:userActiveId,
    postId:postJustSendData._id,
  })
  for (let index = 0; index < data.follower.length; index++) {
    const userWhoNotSeenId=data.follower[index].userId;
    
    notificationSchemaData.followerWhoNotSeenThePost.push({userId:userWhoNotSeenId})
  }

  
  await notificationSchemaData.save();
}
}
 
    return NextResponse.json(
        {
          message: "Post Successfully Uploaded",
        },
        {
          status: 201,
        }
      );


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
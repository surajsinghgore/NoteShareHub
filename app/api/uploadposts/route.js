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




// delete post
export async function DELETE(req){

try {

  if(req.nextUrl.searchParams.get('id')==undefined){ return NextResponse.json(
    {
      message: "Please Provide Id To DELETE",
    },
    {
      status: 400,
    }
  );}
  if(req.nextUrl.searchParams.get('activeUser')==undefined){
    return NextResponse.json(
      {
        message: "Please Login ",
      },
      {
        status: 400,
      }
    );
  }

let userActiveEmail=req.nextUrl.searchParams.get('activeUser');
let NoteIdToDelete=req.nextUrl.searchParams.get('id');

  // fetch user data
  let userActiveData=await clientPersonalData.findOne({email:userActiveEmail});
  if(userActiveData==null){

    return NextResponse.json(
      {
        message: "Please Login With Valid Account",
      },
      {
        status: 404,
      }
    );
  }

let userActiveId=userActiveData._id.toString();


// fetch post data
let postData=await uploadPosts.findById(NoteIdToDelete);
if(postData==null){
  return NextResponse.json(
    {
      message: "Note Not Found TO DELETE",
    },
    {
      status: 404,
    }
  );
}

const noteMedia = postData.post_media.match(/\/([^\/?#]+)\.\w+$/)[1];



// check weather owner of post or not

if(postData.autherId!=userActiveId){
  return NextResponse.json(
    {
      message: "You Are Not OWNER OF THE POST",
    },
    {
      status: 404,
    }
  );
}
  let res= await cloudinary.uploader.destroy(noteMedia);


await uploadPosts.findByIdAndDelete(NoteIdToDelete)
// also delete notification of post if left
let notificationData=await notificationSchema.findOne({autherId:userActiveId,postId:postData._id});


if(notificationData!=null){
    await notificationSchema.findByIdAndDelete(notificationData._id)

}
return NextResponse.json(
  {
    message: "Note Successfully Deleted",
  },
  {
    status: 200,
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
let userFollowers=data.follower.length;
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


// if o followers then no need to send notification
if(userFollowers!=0){


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



// update notes data

export async function PATCH(req){
  try {

let formData=await req.formData();

 

    const title = formData.get('title');
    const file = formData.get('file');
    const keyword = formData.get('keyword');
    const visibility = formData.get('visibility');
    const description = formData.get('description');
    const userActiveEmail = formData.get('userActiveEmail');
    const postId = formData.get('id');
    const pictureStatus = formData.get('pictureStatus');

    if(title.length==0||title==""||title==null||title==undefined){
      return NextResponse.json(
        {
          message: "Please Enter Title Of The Post",
        },
        {
          status: 400,
        }
      );
    }

    if(keyword.length==0||keyword==""||keyword==null||keyword==undefined){
      return NextResponse.json(
        {
          message: "Please Enter Keyword Of The Post",
        },
        {
          status: 400,
        }
      );
    }

    if(visibility.length==0||visibility==""||visibility==null||visibility==undefined){
      return NextResponse.json(
        {
          message: "Please Enter Visibility Of The Post",
        },
        {
          status: 400,
        }
      );
    }


    if(description.length==0||description==""||description==null||description==undefined){
      return NextResponse.json(
        {
          message: "Please Enter Description Of The Post",
        },
        {
          status: 400,
        }
      );
    }


    if(postId.length==0||postId==""||postId==null||postId==undefined){
      return NextResponse.json(
        {
          message: "Please Enter PostId Of The Post",
        },
        {
          status: 400,
        }
      );
    }


    if(userActiveEmail==null||userActiveEmail==undefined){
      return NextResponse.json(
        {
          message: "Please Login With Active Email Id",
        },
        {
          status: 400,
        }
      );
    }


    const KeywordArray=keyword.split(",");
  // get post Details weather available or not
let noteData=await uploadPosts.findById(postId);

if(noteData==null){


  return NextResponse.json(
    {
      message: "Note is Not Valid ,Please Refresh The Page",
    },
    {
      status: 404,
    }
  );
}

// find user details

let userData=await clientPersonalData.findOne({email:userActiveEmail});
if(userData==null){
  return NextResponse.json(
    {
      message: "Please Login with Valid Account",
    },
    {
      status: 404,
    }
  );
}

// check weather author of post or not

let activeUserId=userData._id.toString();

if(noteData.autherId!=activeUserId){
  return NextResponse.json(
    {
      message: "You are not the Owner Of This Post",
    },
    {
      status: 400,
    }
  );
}





// means not updating image just update normal details
if(pictureStatus=="no"){

  // lets update except image
  
  await uploadPosts.findByIdAndUpdate(noteData._id,{title:title,keyword:KeywordArray,visibility:visibility,description:description});
  return NextResponse.json(
    {
      message: "Note Successfully Updated",
    },
    {
      status: 200,
    }
  );
}
// means also file updated

else{




  if(file==null||file==undefined){
    return NextResponse.json(
      {
        message: "Please Provide Image of the Post",
      },
      {
        status: 400,
      }
    );
  }

// get old filename 

const oldFileName = noteData.post_media.match(/\/([^\/?#]+)\.\w+$/)[1];

// console.log(oldFileFullPath,oldFileName)


await cloudinary.uploader.destroy(oldFileName);

const fileBuffer = await file.arrayBuffer();
const mimeType = file.type;
const encoding = "base64";
const base64Data = Buffer.from(fileBuffer).toString("base64");
const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;


const res = await cloudinary.uploader.upload(fileUri, {public_id: file.filename});
let url=res.url;


await uploadPosts.findByIdAndUpdate(noteData._id,{title:title,keyword:KeywordArray,visibility:visibility,description:description,post_media:url });
return NextResponse.json(
  {
    message: "Note Successfully Updated",
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

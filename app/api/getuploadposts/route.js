
import { NextRequest, NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";

// get all post data which is public
export async function GET(req,res) {
try {
  await DbConnection();

// find single post only
if(req.nextUrl.searchParams.get('post')!=undefined){
  let postId=req.nextUrl.searchParams.get('post')


  let data=await uploadPosts.findById(postId).select("-createdAt -updatedAt -keyword").sort({ dateandtime: -1 });
  
  if(data==null){
    return NextResponse.json(
      {
        message: "Post Not Found With Is Id",
      },
      {
        status: 404,
      }
    );
  }



      let id=data.autherId;
      let userData=await clientPersonalData.findById(id);
      let userEmail=userData.email;
      let userName=userData.name;
      let userImage=userData.image;
let postOwner={
  authorEmail:userEmail,
autherProfile:userImage,
autherName:userName
}
data.authorEmail=userEmail;
data.autherProfile=userImage;
data.autherName=userName;
    
 



  return NextResponse.json(
    {
      data: data,postOwner:postOwner,message:"Success"
    },
    {
      status: 200,
    }
  );
}
// find all post
else{

    let data=await uploadPosts.find({visibility:"public"}).select("-createdAt -updatedAt -keyword").sort({ dateandtime: -1 });
  
let newData=[];

for (let index = 0; index < data.length; index++) {
    let id=data[index].autherId;
    let userData=await clientPersonalData.findById(id);
    let userEmail=userData.email;
    let userName=userData.name;
    let userImage=userData.image;
    let userObj={authorEmail:userEmail,autherProfile:userImage,autherName:userName}

    newData.push({postData:data[index],userData:userObj})
}
  
      return NextResponse.json(
        {
          data: newData,message:"Success"
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
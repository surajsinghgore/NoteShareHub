import { NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import DbConnection from "../controller/DatabaseConnection";
import mongoose from "mongoose";
export async function GET(req,res){
  await DbConnection();

  if(req.nextUrl.searchParams.get('post')!=undefined){
    let postId=req.nextUrl.searchParams.get('post')
  
  
    let data=await uploadPosts.findById(postId).select("-autherId -mainId -title -createdAt -description -post_media -visibility -dateandtime -__v -_id -like -dislike -updatedAt -keyword");
    



    let newData=await uploadPosts.aggregate([ 
      { $match : { _id: new mongoose.Types.ObjectId(postId) } },
      { "$unwind": "$comments" }, // Unwind the comments array
  { "$sort": { "comments.dateandtime": -1 } }, // Sort comments by dateandtime in descending order
  { "$group": { "_id": "$_id", "comments": { "$push": "$comments" } } }
    ])
 
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
  
    let arr=[];
    if(newData.length!=0){

      for (let index = 0; index <  newData[0].comments.length; index++) {
      let id= newData[0].comments[index].userId;
    let userData=await clientPersonalData.findById(id);
    let userEmail=userData.email;
    let userName=userData.name;
    let userImage=userData.image;
    let postCommentID=newData[0].comments[index]._id;
    arr.push({userEmail,userName,userImage,postCommentID})
    }

  
    
  
  
    return NextResponse.json(
      {
        data: newData[0],postOwner:arr,message:"Success"
      },
      {
        status: 200,
      }
    );


  }

 
else{
 
  return NextResponse.json(
    {
      data: [],postOwner:[],message:"Success"
    },
    {
      status: 200,
    }
  );
}

  }
  try {
    const {postId,userEmail}=await req.json();
      
    
   
    if(postId==undefined){
      return NextResponse.json(
        {
          message: "Please Provide Valid Post Id",
        },
        {
          status: 400,
        }
      );
    }
    
        // check post is valid or not
        let postData=await uploadPosts.findById(postId);
        if(postData==null){
          return NextResponse.json(
            {
              message: "Comment Not Found With This Id",
            },
            {
              status: 404,
            }
          );
        }
    // check weather valid user not not
    let userData=await clientPersonalData.findOne({email:userEmail});
    
    if(userData==null){
      return NextResponse.json(
        {
          message: "Please Login Again",
        },
        {
          status: 400,
        }
      );
    }
    
    

    let date=new Date();
    let fulldate=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    var fulltime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    
    let arrays={userId:userData._id,comment:comment,postDate:fulldate,posttime:fulltime};
    
    postData.comments.push(arrays);
    await postData.save();
    
    return NextResponse.json(
      {
        message: "comment successfully posted",
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
export async function POST(req,res) {
  try {
const {postId,comment,userEmail}=await req.json();
  
if(comment==undefined){
  return NextResponse.json(
    {
      message: "Please Try Again",
    },
    {
      status: 400,
    }
  );
}
if(userEmail==undefined){
  return NextResponse.json(
    {
      message: "Please Login to give Comment on this post",
    },
    {
      status: 400,
    }
  );
}
if(postId==undefined){
  return NextResponse.json(
    {
      message: "Please Provide Valid Post Id",
    },
    {
      status: 400,
    }
  );
}


// check weather valid user not not
let userData=await clientPersonalData.findOne({email:userEmail});

if(userData==null){
  return NextResponse.json(
    {
      message: "Please Login Again",
    },
    {
      status: 400,
    }
  );
}


// check post is valid or not
let postData=await uploadPosts.findById(postId)

if(postData==null){
  return NextResponse.json(
    {
      message: "Post Not Found With This Id",
    },
    {
      status: 400,
    }
  );
}

let arrays={userId:userData._id,comment:comment};

postData.comments.push(arrays);
await postData.save();

return NextResponse.json(
  {
    message: "comment successfully posted",
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
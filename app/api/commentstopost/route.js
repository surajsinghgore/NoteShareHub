import {  NextRequest,NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";
import likePosts from "../models/likeposts";
import { headers } from 'next/headers'
import disLikePosts from "../models/dislikepost";
 
export async function GET(req,res){

  if(req.nextUrl.searchParams.get('post')!=undefined){
    let postId=req.nextUrl.searchParams.get('post')
  
  
    let data=await uploadPosts.findById(postId).select("-autherId -mainId -title -createdAt -description -post_media -visibility -dateandtime -__v -_id -like -dislike -updatedAt -keyword").sort({ dateandtime: -1 });
    
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

    for (let index = 0; index <  data.comments.length; index++) {
      let id= data.comments[index].userId;
    let userData=await clientPersonalData.findById(id);
    let userEmail=userData.email;
    let userName=userData.name;
    let userImage=userData.image;
    let postCommentID=data.comments[index]._id;
    arr.push({userEmail,userName,userImage,postCommentID})
    }

  

  
  
  
    return NextResponse.json(
      {
        data: data,postOwner:arr,message:"Success"
      },
      {
        status: 200,
      }
    );
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
let postData=await uploadPosts.findById(postId);
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
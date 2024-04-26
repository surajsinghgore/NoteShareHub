import clientPersonalData from "../models/clientPersonalSchema";
import DbConnection from "../controller/DatabaseConnection";
import {  NextResponse } from "next/server";

export async function POST(req) {
    try {
let {userwhofollow,usertowhofollow}=await req.json();

    // check weather empty or not

    if((userwhofollow==undefined)||usertowhofollow==undefined){
        return NextResponse.json(
            {
              message: "Please Try Again",
            },
            {
              status: 400,
            }
          );
    }
    await DbConnection();
    // check weather user exits or not
let userToFollow=await clientPersonalData.findOne({email:usertowhofollow});
if(userToFollow==null){

    return NextResponse.json(
        {
          message: "User you wanted to follow not exists",
        },
        {
          status: 404,
        }
      );
}


let userWhoFollowData=await clientPersonalData.findOne({email:userwhofollow});
if(userWhoFollowData==null){

    return NextResponse.json(
        {
          message: "Please Re Login Again",
        },
        {
          status: 404,
        }
      );
}



    // check weather already followed to this user already or not
let checkWeatherAlreadyFollowedOrNot=await clientPersonalData.find({"following.userId":userToFollow._id})
console.log(checkWeatherAlreadyFollowedOrNot)

if(checkWeatherAlreadyFollowedOrNot.length!=0){
    return NextResponse.json(
        {
          message: "Sorry,you already followed this Account",
        },
        {
          status: 400,
        }
      );
}
    // first time following
   
else{
 // follow
 let followEntry=await clientPersonalData.findOne({email:userwhofollow});
 followEntry.following.push({userId:userToFollow._id});
 await followEntry.save()
     // followers
     let followersEntry=await clientPersonalData.findOne({email:usertowhofollow});
     followersEntry.follower.push({userId:userWhoFollowData._id});
     await followersEntry.save()
 
     return NextResponse.json(
         {
           message: "You Successfully Followed The User",
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
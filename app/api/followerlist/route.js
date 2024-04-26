import {  NextResponse } from "next/server";
import clientPersonalData from "../models/clientPersonalSchema";
import DbConnection from "../controller/DatabaseConnection";

export async function GET(req,res){

    try {
        await DbConnection();
    if(req.nextUrl.searchParams.get('user')!=undefined){
        let userEmailId=req.nextUrl.searchParams.get('user');
   
// check weather user Exists or not
let userData=await clientPersonalData.findOne({email:userEmailId});
let userFollowersList=userData.follower;
let userFollowingList=userData.following;
let followerlist=[];
let followinglist=[];
for (let index = 0; index < userFollowersList.length; index++) {
 
    let findUser=await clientPersonalData.findById(userFollowersList[index].userId);
   if(findUser!==null){

       followerlist.push({name:findUser.name,email:findUser.email,image:findUser.image})
    }
    
}
for (let index = 0; index < userFollowingList.length; index++) {
 
    let findUser=await clientPersonalData.findById(userFollowingList[index].userId);
   if(findUser!==null){

    followinglist.push({name:findUser.name,email:findUser.email,image:findUser.image})
    }
    
}

return NextResponse.json(
    {
        followinglist:followinglist,followerlist:followerlist,message:"Success"
    },
    {
      status: 200,
    }
  );

}
    } catch (error) {
        console.log(error);
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
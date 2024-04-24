import { NextRequest, NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
export async function POST(req) {
  // const res=await NextRequest.
  await DbConnection();
  let { name, email, image } = await req.json();
  if (name == undefined) {
    return NextResponse.json(
      {
        message: "Please Provide Name Field",
      },
      {
        status: 400,
      }
    );
  }
  if (email == undefined) {
    return NextResponse.json(
      {
        message: "Please Provide Email Field",
      },
      {
        status: 400,
      }
    );
  }
  if (image == undefined) {
    return NextResponse.json(
      {
        message: "Please Provide image Field",
      },
      {
        status: 400,
      }
    );
  }
  if (name == "" || email == "" || image == "") {
    return NextResponse.json(
      {
        message: "Please fill all the fields Properly",
      },
      {
        status: 400,
      }
    );
  }

  //   database connection established
  try {


    // check weather user exits for not 
    let data=await clientPersonalData.findOne({email:email});

    // create new entry only if user not exits in database
    if(!data){
       
    let dataSend = new clientPersonalData({
        name,
        email,
        image,
      });
      
    await dataSend.save();
   
        return NextResponse.json(
          {
            message: "user successfully login",
          },
          {
            status: 200,
          }
        );
      
          
    }
    else{
      let oldImage=data.image;
      if(oldImage!==image){
await clientPersonalData.findByIdAndUpdate(data._id,{ $set: { image: image}});

      }
      

    }
    return NextResponse.json(
        {
          message: "user successfully login",
        },
        {
          status: 200,
        }
      );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error" + error,
      },
      {
        status: 500,
      }
    );
  }
}

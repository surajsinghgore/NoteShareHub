const cloudinary = require('cloudinary');
import { NextRequest, NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
//set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

cloudinary.v2.config({
  cloud_name: 'dyfha7anm',
  api_key: '933632846591738',
  api_secret: 'Z1BBQm44rhRNAiUtLhBFayRjPw8',
  secure: true,
});
export async function POST(req) {
  try {
    // await DbConnection();

    const formData  = await req.formData()
    const files = formData.getAll('files');
    const title = formData.get('title');
    const keyword = formData.get('keyword');
    const visibility = formData.get('visibility');
    const description = formData.get('description');
    const userActiveEmail = formData.get('userActiveEmail');

   
      // let media=files[0];
       let fileName=files[0].name;
        // ressGetCloud=await cloudinary.uploader.upload(fileName, {public_id: files[0]})
     
        const fileBuffer = await files[0].arrayBuffer();
        const mimeType = files[0].type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
        const res = await cloudinary.uploader.upload(fileUri, {public_id: files[0].name});

        // this will be used to upload the file
     

    return NextResponse.json(
        {
          message: "POST HITS",
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
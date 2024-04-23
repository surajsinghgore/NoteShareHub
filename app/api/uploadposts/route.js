import { NextRequest, NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
//set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

export async function POST(req) {
  try {
    // await DbConnection();

    const formData  = await req.formData()
    const files = formData.get('files');
    const title = formData.get('title');
    const keyword = formData.get('keyword');
    const visibility = formData.get('visibility');
    const description = formData.get('description');
    const userActiveEmail = formData.get('userActiveEmail');

console.log(visibility)
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
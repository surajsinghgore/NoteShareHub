import { NextRequest, NextResponse } from "next/server";
import DbConnection from "../controller/DatabaseConnection";
import clientPersonalData from "../models/clientPersonalSchema";
import uploadPosts from "../models/uploadposts";

// get all post data which is public
export async function GET() {
try {
    await DbConnection();
    let data=await uploadPosts.find({visibility:"public"}).select("-createdAt -updatedAt -keyword").sort({ dateandtime: -1 });
    return NextResponse.json(
        {
          data: data,message:"Success"
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
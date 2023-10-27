import mongoose from "mongoose";
import {  NextResponse } from "next/server";
let connectionUrl = process.env.NEXT_PUBLIC_MONOGODB_DB_CONNECTION_URL;

const DbConnection = async (req, res) => {
try {
    let res=await mongoose.connect(connectionUrl);
  if(res){

  }
  else{
console.log(res)
    return NextResponse.json(
        {
          message: "Internal Server Error In Database Connection",
        },
        {
          status: 500,
        }
      );
  }
} catch (error) {
    return NextResponse.json(
        {
          message: "Internal Server Error In Database Connection" + error,
        },
        {
          status: 500,
        }
      );
}

}

export default DbConnection;
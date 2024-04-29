import uploadPost from "../models/uploadposts";
import DbConnection from "../controller/DatabaseConnection";
import {  NextResponse } from "next/server";

export async function GET(req) {

    try {

    


        // without login
        if((req.nextUrl.searchParams.get('search')!=undefined)){
           
            let searchInput=req.nextUrl.searchParams.get('search').toLowerCase();
            const regex = new RegExp(searchInput, 'i');
    
// first search for title
let searchData=[];
let titleData=(await uploadPost.find({visibility:"public",title:regex}).select("_id title").sort({like:-1}).exec());
if(titleData.length!=0){
    for (let i = 0; i < titleData.length; i++) {
        searchData.push(titleData[i])
        
    }

}



// second search for keyword
let keywordData=await uploadPost.find({visibility:"public",keyword:regex}).select("_id title keyword").sort({like:-1}).exec();
keywordData.forEach((result) => {
    const matchingKeywords = result.keyword.filter((kw) => regex.test(kw));  
    searchData.push({_id:result._id,title:matchingKeywords})
  });




          
            return NextResponse.json(
                {data:searchData,
                  message: "success",
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
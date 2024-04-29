import clientData from "../models/clientPersonalSchema";
import uploadPost from "../models/uploadposts";
import DbConnection from "../controller/DatabaseConnection";
import {  NextResponse } from "next/server";

export async function GET(req) {

    try {


// search main page
// search result without login
if((req.nextUrl.searchParams.get('ItemSearch')!==null)&&(req.nextUrl.searchParams.get('userActiveEmail')==null)){
  let mainSearch=req.nextUrl.searchParams.get('ItemSearch');

  const regex = new RegExp(mainSearch, 'i');
  
  // find user Id
  await DbConnection();

  let searchData=[];
//  fetch from title
  
  
    let normalTitleData=(await uploadPost.find({visibility:"public",title:regex}).select("_id title post_media like dislike description").sort({like:-1}).exec());
  if(normalTitleData.length!=0){
      for (let i = 0; i < normalTitleData.length; i++) {
    
          searchData.push({_id:normalTitleData[i]._id,post_media:normalTitleData[i].post_media,title:normalTitleData[i].title,like:normalTitleData[i].like,dislike:normalTitleData[i].dislike,description:normalTitleData[i].description})
      }
  
  }
    
  // second search for keyword
  let normalKeywordData=await uploadPost.find({visibility:"public",keyword:regex}).select("_id title post_media like dislike description keyword").sort({like:-1}).exec();
  normalKeywordData.forEach((result) => {
      const matchingKeywords = result.keyword.filter((kw) => regex.test(kw));  
     for (let index = 0; index < matchingKeywords.length; index++) {
    searchData.push({_id:result._id,post_media:result.post_media,title:matchingKeywords[index],like:result.like,dislike:result.dislike,description:result.description})
      
     }
    });
  
  // remove duplicate
  
  const uniqueArray = Object.values(searchData.reduce((acc, obj) => {
    acc[obj.title] = obj;
    return acc;
  }, {}));
    return NextResponse.json(
      {data:uniqueArray,
        message: "success",
      },
      {
        status: 200,
      }
    );
    
  }
  
  

// search result with login
 if((req.nextUrl.searchParams.get('ItemSearch')!==null)&&(req.nextUrl.searchParams.get('userActiveEmail')!=null)){
let mainSearch=req.nextUrl.searchParams.get('ItemSearch');
let userActiveEmail=req.nextUrl.searchParams.get('userActiveEmail');
const regex = new RegExp(mainSearch, 'i');

// find user Id
await DbConnection();
let userData=await clientData.findOne({email:userActiveEmail});
if(userData==null){
  return NextResponse.json(
    {data:searchData,
      message: "Please login again",
    },
    {
      status: 404,
    }
  );
}

let userActiveId=userData._id;
// !fetch from user Records first [title]
// first search for title
let searchData=[];
let titleData=await uploadPost.find({autherId:userActiveId,title:regex}).select("_id title post_media like dislike description").exec();

if(titleData.length!=0){
    for (let i = 0; i < titleData.length; i++) {
        searchData.push(titleData[i])
        
    }

}

// !fetch from user Records first [keyword]
let keywordData=await uploadPost.find({autherId:userActiveId,keyword:regex}).select("_id title post_media keyword like dislike description").exec();
keywordData.forEach((result) => {
    const matchingKeywords = result.keyword.filter((kw) => regex.test(kw));  
   for (let index = 0; index < matchingKeywords.length; index++) {


    searchData.push({_id:result._id,post_media:result.post_media,title:matchingKeywords[index],like:result.like,dislike:result.dislike,description:result.description})
   }
  });


  let normalTitleData=(await uploadPost.find({visibility:"public",title:regex}).select("_id title post_media like dislike description").sort({like:-1}).exec());
if(normalTitleData.length!=0){
    for (let i = 0; i < normalTitleData.length; i++) {
  
        searchData.push({_id:normalTitleData[i]._id,post_media:normalTitleData[i].post_media,title:normalTitleData[i].title,like:normalTitleData[i].like,dislike:normalTitleData[i].dislike,description:normalTitleData[i].description})
    }

}



// second search for keyword
let normalKeywordData=await uploadPost.find({visibility:"public",keyword:regex}).select("_id title post_media like dislike description keyword").sort({like:-1}).exec();
normalKeywordData.forEach((result) => {
    const matchingKeywords = result.keyword.filter((kw) => regex.test(kw));  
   for (let index = 0; index < matchingKeywords.length; index++) {
  searchData.push({_id:result._id,post_media:result.post_media,title:matchingKeywords[index],like:result.like,dislike:result.dislike,description:result.description})
    
   }
  });

// remove duplicate

const uniqueArray = Object.values(searchData.reduce((acc, obj) => {
  acc[obj.title] = obj;
  return acc;
}, {}));
  return NextResponse.json(
    {data:uniqueArray,
      message: "success",
    },
    {
      status: 200,
    }
  );
  
}




// search bar logic
        // without login
      if((req.nextUrl.searchParams.get('search')!=null)&&(req.nextUrl.searchParams.get('userActive')==null)){
           
            let searchInput=req.nextUrl.searchParams.get('search').toLowerCase();
            const regex = new RegExp(searchInput, 'i');
await DbConnection();
    
// first search for title
let searchData=[];
let titleData=(await uploadPost.find({visibility:"public",title:regex}).select("title _id").sort({like:-1}).exec());
if(titleData.length!=0){
    for (let i = 0; i < titleData.length; i++) {
        searchData.push(titleData[i])
        
    }

}



// second search for keyword
let keywordData=await uploadPost.find({visibility:"public",keyword:regex}).select("title keyword _id").sort({like:-1}).exec();
keywordData.forEach((result) => {
    const matchingKeywords = result.keyword.filter((kw) => regex.test(kw));  
   for (let index = 0; index < matchingKeywords.length; index++) {
  searchData.push({_id:result._id,title:matchingKeywords[index]})
    
   }
  });


// remove duplicate

const uniqueArray = Object.values(searchData.reduce((acc, obj) => {
  acc[obj.title] = obj;
  return acc;
}, {}));


          
            return NextResponse.json(
                {data:uniqueArray,
                  message: "success",
                },
                {
                  status: 200,
                }
              );
          }

// with login
else if((req.nextUrl.searchParams.get('search')!==null)&&(req.nextUrl.searchParams.get('userActive')!==null)){
 
  let searchInput=req.nextUrl.searchParams.get('search').toLowerCase();
  let userActiveEmail=req.nextUrl.searchParams.get('userActive').toLowerCase();
  const regex = new RegExp(searchInput, 'i');
await DbConnection();


let userData=await clientData.findOne({email:userActiveEmail});
if(userData==null){
  return NextResponse.json(
    {data:searchData,
      message: "Please login again",
    },
    {
      status: 404,
    }
  );
}

let userActiveId=userData._id;
// first search for title
let searchData=[];

let titleDataUser=await uploadPost.find({autherId:userActiveId,title:regex}).select("title _id").sort({like:-1}).exec();
if(titleDataUser.length!=0){
for (let i = 0; i < titleDataUser.length; i++) {
searchData.push(titleDataUser[i])

}

}



// second search for keyword
let keywordDataUser=await uploadPost.find({autherId:userActiveId,keyword:regex}).select("_id title keyword").sort({like:-1}).exec();
keywordDataUser.forEach((result) => {
const matchingKeywords = result.keyword.filter((kw) => regex.test(kw));  
for (let index = 0; index < matchingKeywords.length; index++) {
searchData.push({_id:result._id,title:matchingKeywords[index]})

}
});










let titleData=await uploadPost.find({visibility:"public",title:regex}).select("title _id").sort({like:-1}).exec();
if(titleData.length!=0){
for (let i = 0; i < titleData.length; i++) {
searchData.push(titleData[i])

}

}



// second search for keyword
let keywordData=await uploadPost.find({visibility:"public",keyword:regex}).select("title keyword _id").sort({like:-1}).exec();
keywordData.forEach((result) => {
const matchingKeywords = result.keyword.filter((kw) => regex.test(kw));  
for (let index = 0; index < matchingKeywords.length; index++) {
searchData.push({_id:result._id,title:matchingKeywords[index]})

}
});



// remove duplicate

const uniqueArray = Object.values(searchData.reduce((acc, obj) => {
  acc[obj.title] = obj;
  return acc;
}, {}));


  return NextResponse.json(
      {data:uniqueArray,
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
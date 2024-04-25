"use client";
import { useSelector } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useRef, useEffect } from "react";
import Card from "../../Features/EnablePostOptions";

import HomePageSkeletion from '../HomePageSkeleton'



export default function HomePostCard() {
  const postState = useSelector((state) => state.PostReloadState);
  const countRef = useRef(2);
  const [Data,setDatas]=useState([]);
  const countData = useRef();

  const [data, setData] = useState();

  const fetchData = async () => {

    countRef.current = countRef.current + 2;
    countData.current = Data.slice(0, countRef.current);
    setData(countData.current);
  };


  // fetch all post data which is public access
const fetchPosts=async()=>{
  let fetchData=await fetch('/api/getuploadposts');
  let res=await fetchData.json();
  if(fetchData.status==200){
   
    setDatas(res.data);
    setData(res.data.slice(0,2));
    countData.current= Data.slice(0, 2)
  }
}
  useEffect(()=>{
  
    fetchPosts()
  },[postState.state])
  return (
    <>

    {(data!=undefined)?  <InfiniteScroll
        dataLength={data.length} //current data length
        next={fetchData}
        hasMore={Data.length !== data.length} //Total Size != current data size
        loader={<HomePageSkeletion number={2}/>} // loading
        endMessage="" //once finished
      >
        {data.length > 0 &&
          data.map((item) => {
            return <Card Data={item} key={item.postData._id} />;
          })}
      </InfiniteScroll>:<HomePageSkeletion number={2}/>}
    

    </>
  );
}

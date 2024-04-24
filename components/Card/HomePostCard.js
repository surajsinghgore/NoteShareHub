"use client";
// const Data = [
//   {
//     image: "/profile.webp",
//     name: "suraj singh1",
//     time: "3 hours before",
//     id: 1,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis",
//     media: "/img.jpg",
//     like: "22 k",
//     dislike: "32 k",
//     comment: "12 k",
//   },
//   {
//     image: "/profile.webp",
//     name: "suraj singh2",
//     time: "3 hours before",
//     id: 2,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis",
//     media: "/img.jpg",
//     like: "2 k",
//     dislike: "3 k",
//     comment: "1 k",
//   },
//   {
//     image: "/profile.webp",
//     name: "suraj singh2",
//     time: "3 hours before",
//     id: 3,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis",
//     media: "/img.jpg",
//     like: "2 k",
//     dislike: "3 k",
//     comment: "1 k",
//   },
// ];

import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useRef, useEffect } from "react";
import Card from "../../Features/EnablePostOptions";




export default function HomePostCard() {
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
  },[])
  return (
    <>

    {(data!=undefined)?  <InfiniteScroll
        dataLength={data.length} //current data length
        next={fetchData}
        hasMore={Data.length !== data.length} //Total Size != current data size
        loader={<h4>Loading...</h4>} // loading
        endMessage="" //once finished
      >
        {data.length > 0 &&
          data.map((item) => {
            return <Card Data={item} key={item.id} />;
          })}
      </InfiniteScroll>:""}
    

    </>
  );
}

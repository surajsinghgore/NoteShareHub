"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faEllipsis,
  faShareNodes,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/legacy/image";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import "swiper/css";  
import Link from "next/link";
import { useSelector ,useDispatch} from "react-redux";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
 

import { PostReloadState } from "../../redux/slice/ReloadPostsState";

export default function Index() {
    const[data,setData]=useState([]);
    const[postOwner,setPostOwner]=useState([]);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const searchParams = useSearchParams()
  const loginState = useSelector((state) => state.clientLoginState);
  const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
  const postState = useSelector((state) => state.PostReloadState);
    const dropdown = useRef(null);
const [date,setDate]=useState("");
const [time,setTime]=useState("");
 
  const [showAllDescription,setShowAllDescription]=useState(false);

      // show all description 
  const expandDescription=()=>{
    setShowAllDescription(true)
        }         

  const [optionState, setOptionsState] = useState(false);
  const enableOption = () => {
    setOptionsState(!optionState);
  };
//   disable on outside click
  useEffect(() => {
    
    // only add the event listener when the dropdown is opened
    if (!optionState) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setOptionsState(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [optionState]);




  const likePost=async(id)=>{

    // first check weather user login in or not
if(loginState.state){

  let activeUserEmail=clientLoginInfo.email;

let likePost=await fetch('/api/likepost',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': activeUserEmail
  },body: JSON.stringify({ postId: id }),
})

let res=await likePost.json();

if(likePost.status=="500"){
  toast.error(res.message);
  return;
}
if(likePost.status=="400"){
  toast.warning(res.message);
  return;
}
if(likePost.status=="404"){
  toast.error(res.message);
  return;
}

if(likePost.status=="200"){
  toast.success(res.message);

  if(res.message=="You Already Like This Post"){
return;
  }
  let value=Boolean(postState.state);

  dispatch(PostReloadState(!value));
}
}else{
  toast.error("Please Log In to give a like to this post.");
  return; 
}
  }


  const diskLikePost=async(id)=>{

    // first check weather user login in or not
if(loginState.state){

  let activeUserEmail=clientLoginInfo.email;

let likePost=await fetch('/api/dislikeposts',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': activeUserEmail
  },body: JSON.stringify({ postId: id }),
})

let res=await likePost.json();

if(likePost.status=="500"){
  toast.error(res.message);
  return;
}
if(likePost.status=="400"){
  toast.warning(res.message);
  return;
}
if(likePost.status=="404"){
  toast.error(res.message);
  return;
}

if(likePost.status=="200"){
  toast.success(res.message);

  if(res.message=="You Already Dislike This Post"){
return;
  }
  let value=Boolean(postState.state);

  dispatch(PostReloadState(!value));
}
}else{
  toast.error("Please Log In to give a Dislike to this post.");
  return; 
}
  }



  const commentsToThePost=async(id)=>{

    // first check weather user login in or not
if(loginState.state){

  push(`/commentstopost?post=${id}`);

}else{
  toast.error("Please Log In to give a Comments to this post.");
  return; 
}
  }

const fetchSinglePost=async()=>{
let postId=searchParams.get('post');
let fetchSinglePost=await fetch(`/api/getuploadposts?post=${postId}`);
let res=await fetchSinglePost.json();

if(fetchSinglePost.status=="404"){
    toast.error(res.message);
    setTimeout(()=>{
        push("/")

    },1500)
}
if(fetchSinglePost.status=="500"){
    toast.error("Post Not Found");
    setTimeout(()=>{
        push("/")

    },1500)
}

 setData(res.data);
 setPostOwner(res.postOwner)

 const currentDate = new Date(res.data.dateandtime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
  const day = currentDate.getDate();

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  setDate(`${day}-${month}-${year}`)
  setTime(`${hours}:${minutes} ${amOrPm}`)
}
  useEffect(()=>{
    fetchSinglePost();
  },[])
  return (
 

    <div>

    <div className="mediaPost">
    
    {/* post section */}
    <div className="post_section">

    {(data!=undefined)?<>
      
          
            <div className="post" ref={dropdown}>
             <Toaster position="bottom-center" richColors closeButton />
              {/* top section */}
              <div className="top_section">
                {/* hide menu on click */}
                {optionState && (
                  <div className="hide_menu" >
                    <li>
                      <div className="hidemenu_icons">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="hidemenu_icon"
                        />
                      </div>
                      <div className="hidemenu_desc">
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>

                    <li>
                      <div className="hidemenu_icons">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="hidemenu_icon"
                        />
                      </div>
                      <div className="hidemenu_desc">
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>

                    <li>
                      <div className="hidemenu_icons">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="hidemenu_icon"
                        />
                      </div>
                      <div className="hidemenu_desc">
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>
                  </div>
                )}

                {/* profile */}
                <div className="image_profile">
                 <Link href={"/users/"+postOwner.authorEmail}> <Image
                    src={postOwner.autherProfile}
                    alt={postOwner.autherProfile}
                    layout="fill"
                    className="profile_image"
                    priority
                  /></Link>
                </div>
                {/* User Name */}
                <div className="user_detail">
                <Link href={"/users/"+postOwner.authorEmail}>  <h2>{postOwner.autherName}</h2></Link>
                  <h3>{time} {date} </h3>
                </div>

                {/* option btn */}
                <div className="option" >
                  <div className="post_icon">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
              </div>

              {/* title */}
              <div className="post_title">
                <h2>
                {data.title}
              
                 
                </h2>
              </div>
              {/* description */}
              <div className="post_description">
                <p>
               
               {(data.description==undefined)?"":<>{(showAllDescription)?<>{data.description}</>:<> {(data.description.length>158)?<>{data.description.slice(0,158)}<span onClick={()=>expandDescription()}>See More</span></> :data.description}
                 </>}</>
             }
                 
                </p>
              </div>

              {/* media */}
              <div className="media">

            
            <div className="media_container">
                  <Image
                    src= {data.post_media}
                    alt={data.post_media}
                    layout="fill"
                    className="media_image1"
                    priority
                  />
                </div>
           
              
              </div>

              {/* bottom section */}
              <div className="bottom_section">
                {/* like */}
                <div className="like" onClick={()=>likePost(data._id)}>
                  <div className="bottom_like_icon">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="bottom_icon"
                    />
                  </div>
                  <div className="count">{data.like}</div>
                </div>

                {/* dislike */}
                <div className="like" onClick={()=>diskLikePost(data._id)}>
                  <div className="bottom_like_icon dislike">
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className="bottom_icon"
                    />
                  </div>
                  <div className="count">{data.dislike}</div>
                </div>

                {/* comment */}
                <div className="like" onClick={()=>commentsToThePost(data._id)}>
                  <div className="bottom_like_icon comment">
                    <FontAwesomeIcon icon={faComment} className="bottom_icon" />
                  </div>
                  <div className="count">{(data.comments==undefined)?"":data.comments.length}</div>
                </div>

                {/* share */}
                <div className="like share">
                  <div className="bottom_like_icon">
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className="bottom_icon"
                    />
                  </div>
                  <div className="count">SHARE</div>
                </div>
              </div>
            </div>
       
    </>:""}
    
   
    
    
    
    
    </div>
    
    
    
    {/* right section */}
    <div className="right_section">
    
    
    </div>
    
    </div>
    
        </div>
         
          );
       
}

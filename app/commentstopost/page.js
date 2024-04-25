"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBookmark,
  faEllipsis,
  faShareNodes,
  faThumbsDown,
  faThumbsUp,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/legacy/image";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import "swiper/css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import style from "./commentStyle.module.css";

import { PostReloadState } from "../../redux/slice/ReloadPostsState";
import ClientLoginState from "@/redux/slice/ClientLoginState";

export default function Index() {
  const router = useRouter();
  const[comment,setComment]=useState("");
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [commentUserData, setCommentUserData] = useState([]);
  const [postOwner, setPostOwner] = useState([]);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const loginState = useSelector((state) => state.clientLoginState);
  const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
  const postState = useSelector((state) => state.PostReloadState);
  const dropdown = useRef(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [showAllDescription, setShowAllDescription] = useState(false);

  // show all description
  const expandDescription = () => {
    setShowAllDescription(true);
  };

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


  const fetchComments=async()=>{
    let postId = searchParams.get("post");
    let fetchCommentsPost = await fetch(`/api/commentstopost?post=${postId}`);
let res=await fetchCommentsPost.json();

if(fetchCommentsPost.status=="200"){
  setCommentData(res.data.comments)
  setCommentUserData(res.postOwner)
}

  }
  const fetchSinglePost = async () => {
    let postId = searchParams.get("post");
    let fetchSinglePost = await fetch(`/api/getuploadposts?post=${postId}`);
    let res = await fetchSinglePost.json();

    if (fetchSinglePost.status == "404") {
      toast.error(res.message);
      setTimeout(() => {
        push("/");
      }, 1500);
    }
    if (fetchSinglePost.status == "500") {
      toast.error("Post Not Found");
      setTimeout(() => {
        push("/");
      }, 1500);
    }

    setData(res.data);
    setPostOwner(res.postOwner);

    const currentDate = new Date(res.data.dateandtime);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
    const day = currentDate.getDate();

    // Extract time components
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";

    setDate(`${day}-${month}-${year}`);
    setTime(`${hours}:${minutes} ${amOrPm}`);



  };
  useEffect(() => {
    fetchSinglePost();
    fetchComments()
  }, []);


const submitComment=async(id)=>{

if(comment==""){
  
  toast.warning("please enter comment");
  return 
}
let userEmail=clientLoginInfo.email;


let sendComments=await fetch('/api/commentstopost',{
  method:"POST",
 body:JSON.stringify({comment,userEmail,postId:id})
 
})
let res=await sendComments.json();
if(sendComments.status=="500"){
  toast.error(res.message);
  return
}
if(sendComments.status=="404"){
  toast.error(res.message);
  return
}
if(sendComments.status=="400"){
  toast.warning(res.message);
  return
}
if(sendComments.status=="200"){
  toast.success(res.message);
  fetchComments();
  setComment("");
}


}

  return (
    <>
             <Toaster position="bottom-center" richColors closeButton />

      {/* hide background div */}
      <div className={style.commentBgHide}></div>
      {(data!=undefined)?<><div className={style.commentDiv}>
<div className={style.mainCommentContainer}>


      <div className={style.mainCommentDiv}>
       
       
        {/* top title of the post */}
        <div className={style.topFixed}>
        <div className={style.topTitle}>
          <h1> {data.title}</h1>

       <div className={style.closeCommentBtn} title="Close this comment" onClick={() => router.back()}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        </div>



{/* main post section */}
<div className={style.mainPostParent}>

{/* post title */}
<div className={style.postTitleDetail}>
<div className={style.top_section}>
                {/* hide menu on click */}
                {optionState && (
                  <div className={style.hide_menu} >
                    <li>
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc}>
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>

                   

                    <li>
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc}>
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>
                  </div>
                )}

                {/* profile */}
                <div className={style.image_profile}>
                 <Link href={"/users/"+postOwner.authorEmail}> <Image
                    src={postOwner.autherProfile}
                    alt={postOwner.autherProfile}
                    layout="fill"
                    className={style.profile_image}
                    priority
                  /></Link>
                </div>
                {/* User Name */}
                <div className={style.user_detail}>
                <Link href={"/users/"+postOwner.authorEmail}>  <h2>{postOwner.autherName}</h2></Link>
                  <h3>{time} {date}</h3>
                </div>

                {/* option btn */}
                <div className={style.option} onClick={() => enableOption()}>
                  <div className={style.post_icon}>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
              </div>

              {/* post description */}
<div className={style.post_description}>
                <p>
               
              {(showAllDescription)?<>{data.description}</>:<> {(data.description!=undefined)?<>
                {((data.description.length)>158)?<>{data.description.slice(0,158)}<span onClick={()=>expandDescription()}>See More</span></> :data.description}
              </>:""}
                 </>}
         
                </p>
              </div>
</div>


{/* post media */}
<div className={style.media}>

            
<div className={style.media_container}>
      <Image
        src= {data.post_media}
        alt={data.post_media}
        layout="fill"
        className={style.media_image1}
        priority
      />
    </div>

  
  </div>
{/* bottom like share */}
<div className={style.bottom_section}>
                {/* like */}
                <div className={style.like} >
                  <div className={style.bottom_like_icon}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={style.bottom_icon}
                    />
                  </div>
                  <div className={style.count}>{data.like}</div>
                </div>

                {/* dislike */}
                <div className={style.like}>
                  <div className={`${style.bottom_like_icon} ${style.dislike}`}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={style.bottom_icon}
                    />
                  </div>
                  <div className="count">{data.dislike}</div>
                </div>

            

                {/* share */}
                <div className={`${style.like} ${style.share}`}>
                  <div className={style.bottom_like_icon}>
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className={style.bottom_icon}
                    />
                  </div>
                  <div className={style.count}>SHARE</div>
                </div>
              </div>




              {/* shows comments of user */}

<div className={style.postComments}>

{(commentData.length!=0)?<>

    {commentData.map((items,index)=>{
  return <div className={style.comment1} key={items._id}>
<div className={style.user}>
<Link href={"/user"+commentUserData[index].userEmail}>
<Image src={commentUserData[index].userImage} alt={commentUserData[index].userImage} className={style.userCommentImage} layout="fill" priority/></Link>
</div>

<div className={style.comments}>
<Link href={"/user"+commentUserData[index].userEmail}><h3>{commentUserData[index].userName}</h3></Link>
<p>{items.comment}</p>
</div>
</div>
})}





</>:""}

</div>

</div>







        {/* write comments to post */}
        <div className={style.commentFixed}>
<div className={style.commentSend}>
{/* user profile active */}
<div className={style.userActiveProfile}>
<Image src={clientLoginInfo.image} alt={clientLoginInfo.image} className={style.userActiveProfileImage} layout="fill" priority/>
</div>
{/* write comment */}
<div className={style.writeComment}>

<textarea name="comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder={"Comment as "+clientLoginInfo.name}></textarea>
<button title="Post This Comment" onClick={()=>submitComment(data._id)}> <FontAwesomeIcon icon={faLocationArrow} className={style.sendPostArrow}/></button>
</div>
</div>

        </div>
      </div>

      </div>
      </div>
      </>:""}

    </>
  );
}

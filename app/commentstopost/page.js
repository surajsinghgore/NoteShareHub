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

export default function Index() {
  const [data, setData] = useState([]);
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
  }, []);
  return (
    <>
      {/* hide background div */}
      <div className={style.commentBgHide}></div>

<div className={style.commentDiv}>
<div className={style.mainCommentContainer}>


      <div className={style.mainCommentDiv}>
       
       
        {/* top title of the post */}
        <div className={style.topFixed}>
        <div className={style.topTitle}>
          <h1>TITLTE oF THE POST IS</h1>

          <div className={style.closeCommentBtn} title="Close this comment">
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
                 <Link href={"/users/"}> <Image
                    src={clientLoginInfo.image}
                    alt={clientLoginInfo.image}
                    layout="fill"
                    className={style.profile_image}
                    priority
                  /></Link>
                </div>
                {/* User Name */}
                <div className={style.user_detail}>
                <Link href={"/users/"}>  <h2>{clientLoginInfo.name}</h2></Link>
                  <h3>23:23 Am 23/24/20203 </h3>
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
               
              {/* {(showAllDescription)?<>{Data.postData.description}</>:<> {(Data.postData.description.length>158)?<>{Data.postData.description.slice(0,158)}<span onClick={()=>expandDescription()}>See More</span></> :"sshh88"}
                 </>} */}
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab modi ullam earum non, fugiat rerum, 
                </p>
              </div>
</div>


{/* post media */}
<div className={style.media}>

            
<div className={style.media_container}>
      <Image
        src= {"/note.jpg"}
        alt={"/note.jpg"}
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
                  <div className={style.count}>2</div>
                </div>

                {/* dislike */}
                <div className={style.like}>
                  <div className={`${style.bottom_like_icon} ${style.dislike}`}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={style.bottom_icon}
                    />
                  </div>
                  <div className="count">34</div>
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

<textarea name="" placeholder={"Comment as "+clientLoginInfo.name}></textarea>
<button title="Post This Comment"> <FontAwesomeIcon icon={faLocationArrow} className={style.sendPostArrow}/></button>
</div>
</div>

        </div>
      </div>

      </div>
      </div>
    </>
  );
}

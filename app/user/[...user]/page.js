"use client";
import { useSession } from "next-auth/react";
import style from './users.module.css'
import { useParams } from 'next/navigation';
import { useSelector,useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";

import { setClientData } from "../../../redux/slice/ClientLoginInfo";
import { clientLoginState } from "../../../redux/slice/ClientLoginState";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
 faGear,
 faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/legacy/image";

import Link from "next/link";
import { useEffect, useState } from 'react';

export default function Page() {
  const session = useSession();
  const loginState = useSelector((state) => state.clientLoginState);
  const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
    const getParams = useParams();
    const [param,setParam]=useState(decodeURIComponent(getParams.user[0]))
 const [postData,setPostData]=useState([])
 const [userData,setUserData]=useState([])
const[unFollowStatus,setUnFollowStatus]=useState(false);
  const dispatch = useDispatch();

//  fetching user data
const fetchUserData=async()=>{
 
  // if user not login ,means normal user search
  if(loginState.state==false){
    let fetchUserData=await fetch(`/api/userdata?user=${param}&userLogin=no`);
    let res=await fetchUserData.json();

    if(fetchUserData.status=="500"){
      toast.error(res.message);
      return;
    }

    if(fetchUserData.status=="404"){
   
      toast.error(res.message);
      return;
     }
    if(fetchUserData.status=="200"){
      if(res.postdata.length!=0){
        setPostData(res.postdata)

      }
      setUserData(res.userdata)

     }
  }
  // if login
  else{
    let fetchUserData=await fetch(`/api/userdata?user=${param}&userLogin=${clientLoginInfo.email}`);
    let res=await fetchUserData.json();

    if(fetchUserData.status=="500"){
      toast.error(res.message);
      return;
    }

    if(fetchUserData.status=="404"){
   
      toast.error(res.message);
      return;
     }
   
    if(fetchUserData.status=="200"){
     
      setPostData(res.postdata)
      setUserData(res.userdata)
if(res.unfollow){
  setUnFollowStatus(res.unfollow)
}
     }
  }
}

useEffect(()=>{
  fetchUserData();
},[])

useEffect(() => {
  if (session.data != undefined) {
    if (session.data.user.image != undefined) {
    
      dispatch(clientLoginState(true));
   
      
      dispatch(
        setClientData({
          name: session.data.user.name,
          email: session.data.user.email,
          image: session.data.user.image,
        })
      );
      fetchUserData();
    }else{
      fetchUserData();

    }
  }

}, [session]);


const unFollowUser=async()=>{


if(loginState.state==false){
  toast.error("Please Login to follow this account");
  return;
}

// check weather same user will not follow themselves
if(clientLoginInfo.email==userData.email){
  toast.warning("Sorry, you do not follow yourself");
  return;

}

let followToUserReq=await fetch("/api/unfollowuser",{
  method:"POST",
  body:JSON.stringify({userwhofollow:clientLoginInfo.email,usertowhofollow:userData.email})
})

    let res=await followToUserReq.json();

    if(followToUserReq.status=="500"){
      toast.error(res.message);
      return;
    }

    if(followToUserReq.status=="404"){
   
      toast.error(res.message);
      return;
     }

    if(followToUserReq.status=="400"){
   
      toast.warning(res.message);
      return;
     }
    if(followToUserReq.status=="200"){
      fetchUserData();
      setUnFollowStatus(false)
     }

}
const followUser=async()=>{
 
// first login need to login before follow user

if(loginState.state==false){
  toast.error("Please Login to follow this account");
  return;
}

// check weather same user will not follow themselves
if(clientLoginInfo.email==userData.email){
  toast.warning("Sorry, you do not follow yourself");
  return;

}

let followToUserReq=await fetch("/api/followuser",{
  method:"POST",
  body:JSON.stringify({userwhofollow:clientLoginInfo.email,usertowhofollow:userData.email})
})

    let res=await followToUserReq.json();

    if(followToUserReq.status=="500"){
      toast.error(res.message);
      return;
    }

    if(followToUserReq.status=="404"){
   
      toast.error(res.message);
      return;
     }

    if(followToUserReq.status=="400"){
   
      toast.warning(res.message);
      return;
     }
    if(followToUserReq.status=="200"){
      fetchUserData();

     }

}
  return (
   <>
      <Toaster position="bottom-center" richColors closeButton />

   {(userData.length!=0)?<>
   <div className={style.users}>

   <div className={style.mainUserBody}>

{/* user profile menu */}
<div className={style.userProfileMenu}>
{/* profile */}
<div className={style.profile}>
<Image src={userData.image} alt={userData.image} className={style.userProfileMainImage}layout="fill"/>
</div>

{/* details button */}
<div className={style.userDetails}>
{/* top user details and buttons */}
<div className={style.top}>
<h2>{userData.name}</h2>

{(unFollowStatus)?<button className={style.followBtn} onClick={()=>unFollowUser()}>Unfollow</button>:<button className={style.followBtn} onClick={()=>followUser()}>Follow</button>}

<button className={style.MessageBtn}>Message</button>

{(loginState.state)?
<>{(clientLoginInfo.email==param)?<div className={style.settingIcon} title="Open Setting">
<Link href="/user"><FontAwesomeIcon icon={faGear} className={style.settingUser} /></Link>
</div>:""}</>
:""}

</div>

{/* stats */}
<div className={style.userStatus}>
  <li><b>{(postData!=undefined)?postData.length:"0"}</b> posts</li>
  <li><b>{userData.follower}</b> followers</li>
  <li><b>{userData.following}</b> following</li>
</div>
</div>



</div>

{/* bottom icons */}
<div className={style.detailsIcons}>

<div className={style.menusIcons}>
<li>
<Link href=""><div className={style.IconParent}>

<div className={style.imageIcon}>
  <Image src="/saved.png" alt="saved" layout='fill' className={style.savedIcon}/>
</div>
</div>
<p>Saved Notes</p></Link>
</li>

</div>
</div>


{/* user post section */}

<div className={style.userPostSection}>

<div className={style.postSections}>
{(postData.length!=0)?<>

  {postData.map((item)=>{
    return  <Link href={`/commentstopost?post=${item._id}`} key={item._id}>
<div className={style.post}>

<div className={style.postMedia}>
<Image src={item.post_media} alt={item.post_media} layout='fill'/>

</div>


<div className={style.numbersOfPost}>
<div className={style.hoverBgHide}>


</div>

{/* post title */}
<div className={style.postTitle}>
{item.title}
</div>
<div className={style.postLike}>

<div className={style.like}>
<FontAwesomeIcon icon={faThumbsUp} className={style.numbersOfPostIcon} />
<span>{item.like}</span>
</div>
<div className={style.like}>
<FontAwesomeIcon icon={faComment} className={style.numbersOfPostIcon} />
<span>{item.comments.length}</span>

</div>
</div>

</div>
</div></Link>

  })}
</>:""}





</div>
</div>




   </div>
   </div></>:<div className={style.NoUserFind}>No User Found with <span>{param}</span></div>}
   
    
    </>
   
  );
}

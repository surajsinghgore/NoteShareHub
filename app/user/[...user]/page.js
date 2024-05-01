"use client";
import { useSession } from "next-auth/react";
import style from './users.module.css'
import { useParams } from 'next/navigation';
import { useSelector,useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import Card from "../../../components/UserPost/Card";

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
  const [mainPost,setMainPost]=useState(true);
  const [backupPostData,setBackupPostData]=useState([])
  const [showFollower,setFollower]=useState(false);
  const [followerData,setFollowerData]=useState([]);
  const [followingData,setFollowingData]=useState([]);
  const [showFollowing,setFollowing]=useState(false);
  const session = useSession();
  const loginState = useSelector((state) => state.clientLoginState);
  const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
    const getParams = useParams();
    const [param,setParam]=useState(decodeURIComponent(getParams.user[0]))
 const [postData,setPostData]=useState([])
 const [userData,setUserData]=useState([])
const[unFollowStatus,setUnFollowStatus]=useState(false);
  const dispatch = useDispatch();
  const [search,setSearch]=useState("")
const[menuOption,setMenuOption]=useState(false);
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
        setBackupPostData(res.postdata)
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
      setBackupPostData(res.postdata)
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
     if(param==session.data.user.email){

       setMenuOption(true)
     }else{
      setMenuOption(true)


     }
      dispatch(clientLoginState(false));
   
      
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


const fetchFollowersAndFollowingData=async()=>{
  
  let fetchUserData=await fetch(`/api/followerlist?user=${param}`);
  let res=await fetchUserData.json();


  if(fetchUserData.status=="500"){
    toast.error(res.message);
    return;
  }

 
  if(fetchUserData.status=="200"){
    setFollowerData(res.followerlist)
    setFollowingData(res.followinglist)
   }
}
const followerList=()=>{
  setMainPost(false);  
  setFollowing(false)
  setFollower(true)
  fetchFollowersAndFollowingData();
}

const fetchMainData=()=>{
  setMainPost(true);  
  setFollowing(false)
  setFollower(false)
}

const followingList=async()=>{
  setFollowing(true)
  setMainPost(false);  
  setFollower(false)
  fetchFollowersAndFollowingData();

  

}



const unFollowUserBtn=async(usertowhofollow)=>{


  if(loginState.state==false){
    toast.error("Please Login to follow this account");
    return;
  }
  
  // check weather same user will not follow themselves
  if(clientLoginInfo.email==usertowhofollow){
    toast.warning("Sorry, you do not follow yourself");
    return;
  
  }
  
  let followToUserReq=await fetch("/api/unfollowuser",{
    method:"POST",
    body:JSON.stringify({userwhofollow:clientLoginInfo.email,usertowhofollow:usertowhofollow})
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
        fetchFollowersAndFollowingData()
       }
  
  }



  const searchBarForPost=(e)=>{
  setSearch(e.target.value);

  if(e.target.value==""){
    setPostData(backupPostData);
  }
  else{
  
    const filterData=backupPostData.filter((item)=>{
      return item.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    if(filterData.length!=0){
      setPostData(filterData);
  
    }else{


      
  
 
      const filterData = backupPostData.filter(post =>
        post.keyword.some(keyword => keyword.toLowerCase().includes(e.target.value.toLowerCase()))
      );
      setPostData(filterData);
  
    }
  
  }
  }

  const sendMessage=()=>{
    
    toast.message('Message To User', {
      description: 'coming soon',
    })
  }
  return (
   <>
      <Toaster position="bottom-center" richColors closeButton />

   {(userData.length!=0)?<>
   <div className={style.users}>

   <div className={style.mainUserBody} >

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
<h2 onClick={()=>fetchMainData()}>{userData.name}</h2>

{(unFollowStatus)?<button className={style.followBtn} onClick={()=>unFollowUser()}>Unfollow</button>:<button className={style.followBtn} onClick={()=>followUser()}>Follow</button>}

<button className={style.MessageBtn} onClick={()=>sendMessage()}>Message</button>

{(loginState.state)?
<>{(clientLoginInfo.email==param)?<div className={style.settingIcon} title="Open Setting">
<Link href="/user"><FontAwesomeIcon icon={faGear} className={style.settingUser} /></Link>
</div>:""}</>
:""}

</div>

{/* stats */}
<div className={style.userStatus}>
  <li onClick={()=>fetchMainData()}><b>{(postData!=undefined)?postData.length:"0"}</b> posts</li>
  <li onClick={()=>followerList()}><b>{userData.follower}</b> followers</li>
  <li onClick={()=>followingList()}><b>{userData.following}</b> following</li>
</div>
</div>



</div>







{/* bottom icons */}
{(loginState.state)?
<>{(clientLoginInfo.email==param)?<div className={style.detailsIcons}>

<div className={style.menusIcons}>
<li>
<Link href="/savednotes"><div className={style.IconParent}>

<div className={style.imageIcon}>
  <Image src="/saved.png" alt="saved" layout='fill' className={style.savedIcon}/>
</div>
</div>
<p>Saved Notes</p></Link>
</li>

</div>
</div>:""}</>
:""}



{/* followers list */}
{(showFollower)?<div className={style.followerList} style={(followerData.length==1)?{height:"27.4vw"}:{height:"auto"}}>
<h6>Followers List:</h6>
{(followerData.length!=0)?<>
{followerData.map((item)=>  <li key={item._id}>
<div className={style.followerProfile}>

<div className={style.imageProfiles}>
<Link href={"/user/"+item.email}>
<Image src={item.image} alt="profile" className={style.imagesProfiles} layout="fill"/></Link>
</div>

</div>
<div className={style.menu}>
<h2><Link href={"/user/"+item.email}>{item.name}</Link></h2>

</div>
</li>
)}
</>:<div className={style.NoUserFind} style={{marginTop:"-18%"}}>No Record Found</div>}


</div>:""}


{/* following list */}
{(showFollowing)?<div className={style.followerList} style={(followingData.length<=1)?{height:"auto"}:""}>
<h6>Following List:</h6>
{(followingData.length!=0)?<>
{followingData.map((item)=>  <li key={item._id}>
<div className={style.followerProfile}>

<div className={style.imageProfiles}>
<Link href={"/user/"+item.email}>
<Image src={item.image} alt="profile" className={style.imagesProfiles} layout="fill"/></Link>
</div>

</div>
<div className={style.menu}>
<h2><Link href={"/user/"+item.email}>{item.name}</Link></h2>

<button onClick={()=>unFollowUserBtn(item.email)}>unfollow</button>
</div>
</li>
)}
</>:<div className={style.NoUserFind} style={{marginTop:"-18%"}}>No Record Found</div>}


</div>:""}


{/* user post section */}

{(mainPost)?
  <div className={style.userPostSection}>


<div className={style.searchBarForPost}>

<input type="search" placeholder={`🔍 search for post by ${userData.name}`} value={search} onChange={(e)=>searchBarForPost(e)}/>
</div>

<div className={style.postSections}>



{(postData.length!=0)?<>
{/*  edit btn enable */}
{/* <Link href={`/commentstopost?post=${item._id}`} key={item._id}> */}
{(menuOption)?<>
{/* with edit btn */}
{postData.map((item)=>{
    return  <Card item={item} key={item._id} />

  })}









</>:

<>
{/* without edit btn */}
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
</>}

</>:<div className={style.noDataFound}>No Notes Found</div>}





</div>
</div>

:""}


   </div>
   </div></>:<div className={style.NoUserFind}>No User Found with <span>{param}</span></div>}
   
    
    </>
   
  );
}

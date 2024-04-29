"use client";
import Image from "next/legacy/image";
import style from "./header.module.css";
import logo from "../public/logo.png";
import user from "../public/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
 
import {
  faMagnifyingGlass,
  faBell,
  faArrowUpFromBracket,
  faBookmark,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useEffect, useRef,useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import { setClientData } from "../redux/slice/ClientLoginInfo";
import { clientLoginState } from "../redux/slice/ClientLoginState";

export default function Header() {
  const dispatch = useDispatch();
  const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
  const pathname = usePathname()
  const session = useSession();
  const [imageEnable, setImageEnable] = useState(false);
  const [imagePath, setImagePath] = useState("");
const [showNotification,setShowNotification]=useState(false);
const[notificationData,setNotificationData]=useState([]);
const dropdown = useRef(null);
const[showSearchSuggestion,setShowSearchSuggestion]=useState(false);
const [search,setSearch]=useState("");
const [searchData,setSearchData]=useState([]);

// main search bar logic
const handleMainSearch=async(e)=>{
  setSearch(e.target.value)
  if(e.target.value==""){
    setShowSearchSuggestion(false);
    return;
  }else{

  let mainSearchRes=await fetch(`/api/mainsearch?search=${e.target.value}`);
    
    setShowSearchSuggestion(true);
let res=await mainSearchRes.json();

if(mainSearchRes.status=="200"){
  setSearchData(res.data);
}


  }
}
//   disable on outside click
useEffect(() => {
    
  // only add the event listener when the dropdown is opened
  if (!showNotification) return;
  function handleClick(event) {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setShowNotification(false);
    }
  }
  window.addEventListener("click", handleClick);
  // clean up
  return () => window.removeEventListener("click", handleClick);
}, [showNotification]);


  // fetch notification data
  const fetchNotificationData=async()=>{
    if(session.data!=null){
    let fetchNotification=await fetch(`/api/notification?userActiveEmail=${session.data.user.email}`)

    let res=await fetchNotification.json();
    if(fetchNotification.status==200){
  
      setNotificationData(res.data)
    }
    }

  }

  useEffect(() => {
    if (session.data != undefined) {
      if (session.data.user.image != undefined) {
      
        dispatch(clientLoginState(true));
        fetchNotificationData();
        setImageEnable(true);
        dispatch(
          setClientData({
            name: session.data.user.name,
            email: session.data.user.email,
            image: session.data.user.image,
          })
        );
        setImagePath(session.data.user.image);
      }
    }

    // manage profile when logout
    if (clientLoginInfo.image == false) {
      setImageEnable(false);
      setImagePath("");
    }
    setImagePath(clientLoginInfo.image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

// delete notification on click to post
const deleteNotificationOnClick=async(postId)=>{
  if(session.data!=null){
    let fetchNotificationDelete=await fetch(`/api/notification?postId=${postId}&userEmail=${session.data.user.email}`,{
      method:"DELETE",
    })

    let res=await fetchNotificationDelete.json();
   
    if(fetchNotificationDelete.status==200){
      fetchNotificationData()
      
    }



    }
}

  return (
    <div className={style.Header} style={(pathname==="/commentstopost")?{zIndex:-1}:{zIndex:999}} ref={dropdown}>
      {/* logo */}
      <div className={style.logo}>
        <div className={style.image}>
          <Link href="/">
            {" "}
            <Image src={logo} alt="logo" layout="responsive" priority />
          </Link>
        </div>
        <div className={style.logo_name}>
          <Link href="/">Note Share Hub</Link>
        </div>
      </div>

      {/* search bar */}
      <div className={style.search}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
        <input
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(e)=>handleMainSearch(e)}
          placeholder="Start Search Topic For Handwritten Note"
        />
        {(showSearchSuggestion)?<>
{/* search bar suggestion */}
<div className={style.searchMainSuggestion}>
{(searchData.length!=0)?<>
{searchData.map((item,index)=>{
return <Link href="" key={index}><li>{item.title}</li></Link>
})}

</>:<h2>No Data Found</h2>}



</div>

        </>:""}

      </div>



      {/* small menu  */}
      <div className={style.menu}>
      <Link href="/"> <div className={(pathname==="/")?style.active:style.iconCard} title="Home Page">
      
          <FontAwesomeIcon icon={faHouse} className={style.menu_icon} />
        </div></Link>
        <Link href="/savednotes"> <div className={(pathname==="/savednotes")?style.active:style.iconCard} title="Saved Notes">
          <FontAwesomeIcon icon={faBookmark} className={style.menu_icon} />
        </div></Link>

        <Link href="/uploadnotes"><div className={(pathname==="/uploadnotes")?style.active:style.iconCard} title="Upload Notes">
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className={style.menu_icon}
          />
        </div></Link>
      </div>
      <div className={style.notification} title="Check Notification">
        {(notificationData.length!=0)?<div className={style.dot}></div>:""}
        <FontAwesomeIcon icon={faBell} className={style.notification_icon} onClick={()=>setShowNotification(!showNotification)}/>



     
      </div>

      <div className={style.user_panel}>
        {imageEnable ? (
          <Link href={"/user/"+clientLoginInfo.email}>
            <Image
              src={imagePath}
              alt="user profile"
              layout="fill"
              className={style.profileImage}
              priority
            />
          </Link>
        ) : (
          <Link href="/user">
            <Image src={user} alt="user" layout="fill" priority />
          </Link>
        )}
      </div>


{/* show notification  */}
      {(showNotification)?<>
    {/* suggestion */}
    <div className={style.arrow_up}></div>
    <div className={style.notifSuggestion}>
<div className={style.topNotifi}>
Notification <span>{notificationData.length}</span>
</div>
        {(notificationData.length!=0)?<>

                 
{/* post */}
<div className={style.notiPost}>
    {notificationData.map((item)=>{
   
      return <Link href={`http://localhost:3000/commentstopost?post=${item.postId}`}  key={item.postId} onClick={()=>deleteNotificationOnClick(item.postId)}>  
      
      <div className={style.post1} >
<div className={style.profileUser}>
<Image src={item.ownerImage} alt={item.ownerImage} className={style.profileUserImage}layout="fill"/>
</div>

<div className={style.descriptions}>
<b>{item.ownerName} </b> posted a new notes on {item.postTitle}
</div>
</div>

</Link>

    })}

</div>



        </>:<h1 className={style.NoNotificationFound}>No pending notification at this moment</h1>}

</div>



 
      </>:""}




    </div>
  );
}

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './style.module.css'
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import SearchPageSkeleton from '../../components/SearchMainPageSkeleton'

import { Toaster, toast } from "sonner";
import Image from "next/legacy/image";

import { useParams } from 'next/navigation';
import {
 
  faBookmark,
  faComment,
  faEllipsis,
  faShareNodes,
  faThumbsDown,
  faThumbsUp,
  faGlobe,
  faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Link from "next/link";


import { useState, useEffect, useRef } from "react";

import "swiper/css";  

import { useSelector ,useDispatch} from "react-redux";
import { useRouter } from 'next/navigation';


import { PostReloadState } from "../../redux/slice/ReloadPostsState";

export default function Page() {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const loginState = useSelector((state) => state.clientLoginState);
  const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
  const postState = useSelector((state) => state.PostReloadState);
    const dropdown = useRef(null);
const [shareState, setShareState] = useState(false);
const [currentShareAddress,setCurrentShareAddress]=useState();

  const [showAllDescription,setShowAllDescription]=useState(false);
const[loading,setLoading]=useState(true);
    const pathname = usePathname();
    const getParams = useParams();
    const [param,setParam]=useState(decodeURIComponent(getParams.search[1]))
const[pageData,setPageData]=useState([]);
  const session = useSession();
 

//   fetch search data to view
const fetchSearchData=async()=>{
  console.log('object')
  setLoading(true)
    // with login
    if (session.data != undefined) {
    
        let mainSearchRes=await fetch(`/api/mainsearch?ItemSearch=${param}&userActiveEmail=${session.data.user.email}`);
let res=await mainSearchRes.json();
setLoading(false)

if(mainSearchRes.status=="200"){


 
 

 



const uniqueArray = Object.values(res.data.reduce((acc, obj) => {
  acc[obj._id] = obj;
  return acc;
}, {}));

setPageData(uniqueArray)      
       

}
      
      
          
        
      }
// without login
else{
    let mainSearchRes=await fetch(`/api/mainsearch?ItemSearch=${param}`);
    let res=await mainSearchRes.json();

setLoading(false)

    if(mainSearchRes.status=="200"){
      setPageData(res.data)
    }   
}


}


useEffect(()=>{
    fetchSearchData();
},[param,session])






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
      fetchSearchData();
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
      fetchSearchData()
      dispatch(PostReloadState(!value));
    }
    }else{
      toast.error("Please Log In to give a Dislike to this post.");
      return; 
    }
      }
    
    
    
      const commentsToThePost=async(id)=>{
    
    
    
      push(`/commentstopost?post=${id}`);
    
    
      }
    
    
      
      const share = (id) => {
        setCurrentShareAddress(`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/commentstopost?post=${id}`)
        setShareState(!shareState);
      };
    
    const dateandtimeCal=(dateandtime)=>{
      const currentDate = new Date(dateandtime);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
    
     return (`${hours}:${minutes} ${amOrPm} ${day}-${month}-${year} `)
    }
    
      const savedNotes=async(id)=>{
    if(loginState.state==false){
      toast.error("Please Log In to saved this post.");
    return; }
    let userActiveEmail=clientLoginInfo.email;
    
    
    let savedNotes=await fetch("/api/savednotes",{
      method:"POST",
      body:JSON.stringify({postId:id,userActiveEmail:userActiveEmail})
    })
    let res=await savedNotes.json();
    if(savedNotes.status=="500"){
      toast.error(res.message);
      return;
    }
    if(savedNotes.status=="400"){
      toast.warning(res.message);
      setOptionsState(false)
    
      return;
    }
    if(savedNotes.status=="404"){
      toast.error(res.message);
      return;
    }
    
    if(savedNotes.status=="200"){
      toast.success(res.message);
      setOptionsState(false)
      }
    
      }
  return (
    <div className={style.searchResult}>
       <Toaster position="bottom-center" richColors closeButton />
    {/* left search menu */}
    <div className={style.leftMenu}>
<h2>Search Results</h2>
<h5>Filters</h5>
{/* links */}
<div className={style.searchLinks}>
  <li>
  <Link href="">
    <div className={style.icon}>
    <FontAwesomeIcon icon={faGlobe} className={style.LinkIcon} />

    </div>
    <div className={style.text}>
      All
    </div>
    </Link>
  </li>

 
</div>
    </div>



    {/*right search menu */}
    <div className={style.rightMenu}>

    
{/* result */}
{/* */}
{(pageData.length!=0)?<>

  {(pageData.map((item,index)=>{
    return <div className={style.post} ref={dropdown} key={index}>
          
              {/* top section */}
     
              <div className={style.top_section}>
                {/* hide menu on click */}
                {optionState && (
                  <div className={style.hide_menu} >
                  
                    <li onClick={()=>savedNotes(item._id)}>
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc}>
                        <h2>Save Note</h2>
                        <h3>Add this to your saved notes</h3>
                      </div>
                    </li>


                    <li >

                   
                      <div className={style.hidemenu_icons}>
                    <Link href={item.post_media} download={item.post_media}>
                        <FontAwesomeIcon
                          icon={faCloudArrowDown}
                          className={style.hidemenu_icon}
                        />
                      </Link>
                      </div>
                      <div className={style.hidemenu_desc}>
                    <Link href={item.post_media} download={item.post_media}>
                  
                        <h2>Download</h2>
                        <h3>Download this note</h3>
                      </Link>
                      </div>
                    </li>
                  
                  </div>
                )}

                {/* profile */}
                <div className={style.image_profile}>
                 <Link href={"/user/"+item.autherEmail}> <Image
                    src={item.autherProfile}
                    alt={item.autherProfile}
                    layout="fill"
                    className={style.profile_image}
                    priority
                  /></Link>
                </div>
                {/* User Name */}
                <div className={style.user_detail}>
                <Link href={"/user/"+item.autherEmail}>  <h2>{item.autherName}</h2></Link>
                  <h3> {dateandtimeCal(item.dateandtime)} </h3>
                </div>

                {/* option btn */}
                <div className={style.option} onClick={() => enableOption()}>
                  <div className={style.post_icon}>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
              </div>

              {/* title */}
              <div className={style.post_title}>
                <h2>
             {item.title}
              
                 
                </h2>
              </div>
              {/* description */}
              <div className={style.post_description}>
                <p>
           
              {(showAllDescription)?<>{item.description}</>:<> {(item.description.length>158)?<>{item.description.slice(0,158)}<span onClick={()=>expandDescription()}>See More</span></> :item.description}
                 </>}
             
                </p>
              </div>

              {/* media */}
              <div className={style.media}>

            
            <div className={style.media_container}>
                  <Image
                    src= {item.post_media}
                    alt={item.post_media}
                    layout="fill"
                    className={style.media_image1}
                    
                    priority
                  />
                </div>
           
              
              </div>

              {/* bottom section */}
              <div className={style.bottom_section}> 
                {/* like */}
                <div className={style.like} onClick={()=>likePost(item._id)}>
                  <div className={style.bottom_like_icon}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={style.bottom_icon}
                    />
                  </div>
                  <div className={style.count}>{item.like}</div>
                </div>

                {/* dislike */}
                <div className={style.like}  onClick={()=>diskLikePost(item._id)}>
                  <div className={`${style.bottom_like_icon} ${style.dislike}`} >
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={style.bottom_icon}
                    />
                  </div>
                  <div className={style.count}>{item.dislike}</div>
                </div>

                {/* comment */}
                <div className={style.like} onClick={()=>commentsToThePost(item._id)}>
                  <div className={`${style.bottom_like_icon} ${style.comment}`}>
                    <FontAwesomeIcon icon={faComment} className="bottom_icon" />
                  </div>
                  <div className={style.count}>{(item.comments==undefined)?"0":item.comments.length}</div>
                </div>

                {/* share */}
                <div className={`${style.like} ${style.share}`} onClick={()=>share(item._id)}>
                  <div className={style.bottom_like_icon}>
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className={style.bottom_icon}
                    />
                  </div>
                  <div className={style.count}>SHARE</div>
                </div>

          {/* share options */}
          {(shareState)?<> <div className={style.shareOptions}>

<li>

<WhatsappShareButton
    url={currentShareAddress}
    title={"This this handwritten notes on "+item.title}
    separator={":: "}
   className={style.Demo__some_network__share_button}
  >
    <WhatsappIcon round={true} size="30"  className={style.Icons}></WhatsappIcon>
  </WhatsappShareButton>
</li>
  <li>
    <FacebookShareButton
      url={currentShareAddress}
   
    
    >
      <FacebookIcon
        round={true}
        size="30"
         className={style.Icons}
      ></FacebookIcon>
    </FacebookShareButton>
  </li>

  <li> <TwitterShareButton
    url={currentShareAddress}
    
    title={item.title}

  >
    <TwitterIcon round={true} size="30"  className={style.Icons}></TwitterIcon>
  </TwitterShareButton></li>


  <li><LinkedinShareButton
    url={currentShareAddress}
    
  >
    <LinkedinIcon round={true} size="30"  className={style.Icons}></LinkedinIcon>
  </LinkedinShareButton></li>

  <li>
  <TelegramShareButton
    url={currentShareAddress}
    title={item.title}
  >
    <TelegramIcon round={true} size="30"  className={style.Icons}></TelegramIcon>
  </TelegramShareButton>
  </li>
</div></>:""}



              </div>
            </div>
  }))}
</>:<>{(loading)?<SearchPageSkeleton number={1}/>: <h6 className={style.noResultFound}>No Result Found</h6>}</>}




</div>
    </div>
  )
}

"use client";
import style from './users.module.css'

import { useParams } from 'next/navigation';
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
 faGear,
 faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import ClientLoginVerify from "@/middleware/ClientLoginVerify";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

import { clientLoginState } from "../../../redux/slice/ClientLoginState";
import Link from "next/link";
import { useState } from 'react';

export default function Page() {
    const getParams = useParams();
    const [param,setParam]=useState(decodeURIComponent(getParams.user[0]))
  const dispatch = useDispatch();
  const router = useRouter();

 
  return (
   
   <div className={style.users}>
   <div className={style.mainUserBody}>

{/* user profile menu */}
<div className={style.userProfileMenu}>
{/* profile */}
<div className={style.profile}>
<Image src={"/profile.webp"} alt="profile" className={style.userProfileMainImage}layout="fill"/>
</div>

{/* details button */}
<div className={style.userDetails}>
{/* top user details and buttons */}
<div className={style.top}>
<h2>suraj singh</h2>

<button class={style.followBtn}>Follow</button>
<button class={style.MessageBtn}>Message</button>


<div className={style.settingIcon} title="Open Setting">
<Link href="/user"><FontAwesomeIcon icon={faGear} className={style.settingUser} /></Link>
</div>
</div>

{/* stats */}
<div className={style.userStatus}>
  <li><b>140</b> posts</li>
  <li><b>140</b> followers</li>
  <li><b>140</b> following</li>
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


<Link href="/commentstopost?post=32323">
<div className={style.post}>

<div className={style.postMedia}>
<Image src={"/note.jpg"} alt="image" layout='fill'/>

</div>


<div className={style.numbersOfPost}>
<div className={style.hoverBgHide}>


</div>

{/* post title */}
<div className={style.postTitle}>
DOMAIN NAME SERVER
</div>
<div className={style.postLike}>

<div className={style.like}>
<FontAwesomeIcon icon={faThumbsUp} className={style.numbersOfPostIcon} />
<span>50</span>
</div>
<div className={style.like}>
<FontAwesomeIcon icon={faComment} className={style.numbersOfPostIcon} />
<span>50</span>

</div>
</div>

</div>
</div></Link>


</div>
</div>




   </div>
   </div>
    
    
   
  );
}

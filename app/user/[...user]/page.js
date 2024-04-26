"use client";
import style from './users.module.css'

import { useParams } from 'next/navigation';
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAngleRight,
  faBell,
  faLock,
  faBookmark,
  faFileInvoice,
  faIdCard,
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
<div className={style.top}>
<h2>suraj singh</h2>

<button class={style.followBtn}>Follow</button>
<button class={style.MessageBtn}>Message</button>

</div>
</div>
</div>

   </div>
   </div>
    
    
   
  );
}

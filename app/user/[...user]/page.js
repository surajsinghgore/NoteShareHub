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

import { useRouter } from "next/navigation";

import { clientLoginState } from "../../../redux/slice/ClientLoginState";
import Link from "next/link";
import { useState } from 'react';

export default function Page() {
    const getParams = useParams();
    const [param,setParam]=useState(getParams.user[0])
  const dispatch = useDispatch();
  const router = useRouter();

 
  return (
   
   <div className={style.users}>
   <div className={style.mainUserBody}>

    <h1>{param}</h1>

   </div>
   </div>
    
    
   
  );
}

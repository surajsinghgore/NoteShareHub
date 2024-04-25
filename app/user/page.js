"use client";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import style from "./user.module.css";
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
import { setClientData } from "../../redux/slice/ClientLoginInfo";
import { clientLoginState } from "../../redux/slice/ClientLoginState";
import Link from "next/link";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

 
  return (
   
   <div className="user">
    <h1>suraj</h1>
   </div>
    
    
   
  );
}

'use client'
// import {  signIn, useSession } from "next-auth/react"

import {  useSelector } from "react-redux";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
faEllipsis,faShareNodes,faThumbsDown,faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/legacy/image";
import HomePostCard from "@/components/Card/HomePostCard";
export default function Home() {
// get client data

  return (
    <div>

<div className="mediaPost">

{/* post section */}
<div className="post_section">


<HomePostCard />




</div>



{/* right section */}
<div className="right_section">


</div>

</div>

    </div>
  )
}

'use client'
// import {  signIn, useSession } from "next-auth/react"
import Header from "../layout/Header";

import {  useSelector } from "react-redux";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
faEllipsis,faShareNodes,faThumbsDown,faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/legacy/image";
export default function Home() {
// get client data

  return (
    <div>

<div className="mediaPost">

{/* post section */}
<div className="post_section">


<div className="post">


{/* top section */}
  <div className="top_section">

  {/* hide menu on click */}
<div className="hide_menu">
<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>


<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>

<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>
</div>




{/* profile */}
    <div className="image_profile">
<Image src="/profile.webp" alt="post_user" layout="fill" className="profile_image"/> 
    </div>
    {/* User Name */}
    <div className="user_detail">
      <h2>suraj singh</h2>
      <h3>3 hours ago</h3>
    </div>

    {/* option btn */}
    <div className="option">
      <div className="post_icon">
      <FontAwesomeIcon icon={faEllipsis}  />

      </div>
    </div>
  </div>


  {/* description */}
  <div className="post_description">
<p>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis
    <span>See More</span>
 </p>

  </div>

  {/* media */}
<div className="media">
<div className="media_container">
  <Image src="/img.jpg" alt="ndod" layout="fill" className="media_image1"/>
</div>
</div>

{/* bottom section */}
<div className="bottom_section">
{/* like */}
<div className="like">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faThumbsUp} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* dislike */}
<div className="like">
<div className="bottom_like_icon dislike">
<FontAwesomeIcon icon={faThumbsDown} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* comment */}
<div className="like">
<div className="bottom_like_icon comment" >
<FontAwesomeIcon icon={faComment} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>


{/* share */}
<div className="like share">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faShareNodes} className="bottom_icon" />
</div>
<div className="count">
  SHARE
</div>
</div>



</div>
</div>




<div className="post">


{/* top section */}
  <div className="top_section">

  {/* hide menu on click */}
<div className="hide_menu">
<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>


<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>

<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>
</div>




{/* profile */}
    <div className="image_profile">
<Image src="/profile.webp" alt="post_user" layout="fill" className="profile_image"/> 
    </div>
    {/* User Name */}
    <div className="user_detail">
      <h2>suraj singh</h2>
      <h3>3 hours ago</h3>
    </div>

    {/* option btn */}
    <div className="option">
      <div className="post_icon">
      <FontAwesomeIcon icon={faEllipsis}  />

      </div>
    </div>
  </div>


  {/* description */}
  <div className="post_description">
<p>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis
    <span>See More</span>
 </p>

  </div>

  {/* media */}
<div className="media">
<div className="media_container">
  <Image src="/img.jpg" alt="ndod" layout="fill" className="media_image1"/>
</div>
</div>

{/* bottom section */}
<div className="bottom_section">
{/* like */}
<div className="like">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faThumbsUp} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* dislike */}
<div className="like">
<div className="bottom_like_icon dislike">
<FontAwesomeIcon icon={faThumbsDown} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* comment */}
<div className="like">
<div className="bottom_like_icon comment" >
<FontAwesomeIcon icon={faComment} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>


{/* share */}
<div className="like share">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faShareNodes} className="bottom_icon" />
</div>
<div className="count">
  SHARE
</div>
</div>



</div>
</div>


<div className="post">


{/* top section */}
  <div className="top_section">

  {/* hide menu on click */}
<div className="hide_menu">
<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>


<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>

<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>
</div>




{/* profile */}
    <div className="image_profile">
<Image src="/profile.webp" alt="post_user" layout="fill" className="profile_image"/> 
    </div>
    {/* User Name */}
    <div className="user_detail">
      <h2>suraj singh</h2>
      <h3>3 hours ago</h3>
    </div>

    {/* option btn */}
    <div className="option">
      <div className="post_icon">
      <FontAwesomeIcon icon={faEllipsis}  />

      </div>
    </div>
  </div>


  {/* description */}
  <div className="post_description">
<p>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis
    <span>See More</span>
 </p>

  </div>

  {/* media */}
<div className="media">
<div className="media_container">
  <Image src="/img.jpg" alt="ndod" layout="fill" className="media_image1"/>
</div>
</div>

{/* bottom section */}
<div className="bottom_section">
{/* like */}
<div className="like">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faThumbsUp} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* dislike */}
<div className="like">
<div className="bottom_like_icon dislike">
<FontAwesomeIcon icon={faThumbsDown} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* comment */}
<div className="like">
<div className="bottom_like_icon comment" >
<FontAwesomeIcon icon={faComment} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>


{/* share */}
<div className="like share">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faShareNodes} className="bottom_icon" />
</div>
<div className="count">
  SHARE
</div>
</div>



</div>
</div>


<div className="post">


{/* top section */}
  <div className="top_section">

  {/* hide menu on click */}
<div className="hide_menu">
<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>


<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>

<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>
</div>




{/* profile */}
    <div className="image_profile">
<Image src="/profile.webp" alt="post_user" layout="fill" className="profile_image"/> 
    </div>
    {/* User Name */}
    <div className="user_detail">
      <h2>suraj singh</h2>
      <h3>3 hours ago</h3>
    </div>

    {/* option btn */}
    <div className="option">
      <div className="post_icon">
      <FontAwesomeIcon icon={faEllipsis}  />

      </div>
    </div>
  </div>


  {/* description */}
  <div className="post_description">
<p>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis
    <span>See More</span>
 </p>

  </div>

  {/* media */}
<div className="media">
<div className="media_container">
  <Image src="/img.jpg" alt="ndod" layout="fill" className="media_image1"/>
</div>
</div>

{/* bottom section */}
<div className="bottom_section">
{/* like */}
<div className="like">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faThumbsUp} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* dislike */}
<div className="like">
<div className="bottom_like_icon dislike">
<FontAwesomeIcon icon={faThumbsDown} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* comment */}
<div className="like">
<div className="bottom_like_icon comment" >
<FontAwesomeIcon icon={faComment} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>


{/* share */}
<div className="like share">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faShareNodes} className="bottom_icon" />
</div>
<div className="count">
  SHARE
</div>
</div>



</div>
</div>


<div className="post">


{/* top section */}
  <div className="top_section">

  {/* hide menu on click */}
<div className="hide_menu">
<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>


<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>

<li>
<div className="hidemenu_icons">
<FontAwesomeIcon icon={faBookmark} className="hidemenu_icon" />
</div>
<div className="hidemenu_desc">
  <h2>Save Post</h2>
  <h3>Add this to your saved items</h3>
</div>
</li>
</div>




{/* profile */}
    <div className="image_profile">
<Image src="/profile.webp" alt="post_user" layout="fill" className="profile_image"/> 
    </div>
    {/* User Name */}
    <div className="user_detail">
      <h2>suraj singh</h2>
      <h3>3 hours ago</h3>
    </div>

    {/* option btn */}
    <div className="option">
      <div className="post_icon">
      <FontAwesomeIcon icon={faEllipsis}  />

      </div>
    </div>
  </div>


  {/* description */}
  <div className="post_description">
<p>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quisquam, et repellendus ducimus tenetur sapiente ullam dolorum tempora neque nobis expedita omnis
    <span>See More</span>
 </p>

  </div>

  {/* media */}
<div className="media">
<div className="media_container">
  <Image src="/img.jpg" alt="ndod" layout="fill" className="media_image1"/>
</div>
</div>

{/* bottom section */}
<div className="bottom_section">
{/* like */}
<div className="like">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faThumbsUp} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* dislike */}
<div className="like">
<div className="bottom_like_icon dislike">
<FontAwesomeIcon icon={faThumbsDown} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>

{/* comment */}
<div className="like">
<div className="bottom_like_icon comment" >
<FontAwesomeIcon icon={faComment} className="bottom_icon" />
</div>
<div className="count">
  2.8K 
</div>
</div>


{/* share */}
<div className="like share">
<div className="bottom_like_icon">
<FontAwesomeIcon icon={faShareNodes} className="bottom_icon" />
</div>
<div className="count">
  SHARE
</div>
</div>



</div>
</div>
</div>



{/* right section */}
<div className="right_section">


</div>

</div>

    </div>
  )
}

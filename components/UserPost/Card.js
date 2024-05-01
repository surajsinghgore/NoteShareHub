"use client";
import Image from "next/legacy/image";
import style from '../../app/user/[...user]/users.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
  faComment,
 faEllipsisVertical,
 faGear,
 
 faPenSquare,
 
 faThumbsUp,
 faTrash
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function Card(props) {
    const [menuOption,setMenuOption]=useState(false);
    const { item } = props;

    const handleMainMenu=()=>{
        setMenuOption(!menuOption)
    }
  return (
    <div className={style.post} key={item._id}>

<FontAwesomeIcon icon={faEllipsisVertical} className={style.mainSetting} onClick={()=>handleMainMenu()}/>
{(menuOption&&<div className={style.menuOpen}>
<li >
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faPenSquare}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc}>
                        <h2>Edit Note</h2>
                        <h3>Edit this to note</h3>
                      </div>
                    </li>

                    <li >
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc}>
                        <h2>Delete</h2>
                        <h3>Remove this to Note</h3>
                      </div>
                    </li>
</div>)}

    <div className={style.postMedia}>
    <Image src={item.post_media} alt={item.post_media} layout='fill'/>
    
    </div>
    
    
  
    </div>
  )
}

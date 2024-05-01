"use client";
import Image from "next/legacy/image";
import style from '../../app/user/[...user]/users.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
  faCloudArrowDown,
  faComment,
 faEllipsisVertical,
 faGear,
 
 faPenSquare,
 
 faThumbsUp,
 faTrash
} from "@fortawesome/free-solid-svg-icons";
import { useState ,useRef,useEffect} from "react";
import Link from "next/link";
export default function Card(props) {
    const dropdown = useRef(null);

    const [menuOption,setMenuOption]=useState(false);
    const { item } = props;

    const handleMainMenu=()=>{
        setMenuOption(!menuOption)
    }



    //   disable on outside click
  useEffect(() => {
    
    // only add the event listener when the dropdown is opened
    if (!menuOption) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setMenuOption(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [menuOption]);

  return (
    <div className={style.post} key={item._id} ref={dropdown}>

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
                        <h3>Edit this  note</h3>
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
                        <h2>Delete Note</h2>
                        <h3>Remove this  Note</h3>
                      </div>
                    </li>
                    


</div>)}

<Link href={"/commentstopost?post="+item._id}> <div className={style.postMedias}>
    <Image src={item.post_media} alt={item.post_media} layout='fill'/>
    
    </div>
    </Link>
    
  
    </div>
  )
}

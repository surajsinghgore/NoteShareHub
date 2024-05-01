"use client";
import style from './LeftSideMenu.module.css';
// font awesome
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import { useDispatch,useSelector } from "react-redux";
import { notificationState } from "../redux/slice/NotificationStatus";
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faBookmark,
    faCloudArrowUp,
faNewspaper,
faSliders,
faUser
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useEffect } from 'react';
export default function LeftSideMenu() {
    const pathname = usePathname();
  const session = useSession();
  const dispatch = useDispatch();
  const notificationStates = useSelector((state) => state.notificationState);


  const showNotification=()=>{
    if(notificationStates.state){
        dispatch(notificationState(false));

    }else{
        dispatch(notificationState(true));

    }
  }




  useEffect(() => {
    if (session.data != undefined) {
      if (session.data.user.image != undefined) {

      }
    }

    
  }, [session]);

  return (

   <div className={style.leftSideMenu} style={(pathname==="/savednotes"||pathname==="/commentstopost"||pathname.includes("/user/")||(pathname.includes("/search")))?{zIndex:-1}:{zIndex:999}}> 
      <div className={style.links_container}>


{/* news Feed */}
<div className={style.section}>
    <h2>General</h2>
    <div className={style.links}>
{/* link 1 */}
        <div className={style.link_card}>
            <div className={style.icon}>
        <Link href={(session.data!=null)?`/savednotes`:"/login"}>
            <FontAwesomeIcon icon={faBookmark} className={style.menu_icon} />
            </Link>
            </div>
            <div className={style.title}>
            <Link href={(session.data!=null)?`/savednotes`:"/login"}>
               Saved Notes
               </Link>  </div>
        </div>
       

       {/* link 2 */}
       <div className={style.link_card}>
       <div className={style.icon}>
        <Link href={(session.data!=null)?`/user/${session.data.user.email}`:"/login"}>
            <FontAwesomeIcon icon={faUser} className={style.menu_icon} />
            </Link>
            </div>
            <div className={style.title}>
            <Link href={(session.data!=null)?`/user/${session.data.user.email}`:"/login"}>
               My Account
               </Link>  </div>
        </div>


        {/* link 3 */}
        <div className={style.link_card}>
       <div className={style.icon}>
        <Link href="/user">
            <FontAwesomeIcon icon={faSliders} className={style.menu_icon} />
            </Link>
            </div>
            <div className={style.title}>
            <Link href="/user">
              Account Setting
               </Link>  </div>
        </div>
    </div>
</div>



<div className={style.section}>
    <h2>Upload Manage</h2>
    <div className={style.links}>
{/* link 1 */}
        <div className={style.link_card}>
        <div className={style.icon}>
        <Link href="/savednotes">
            <FontAwesomeIcon icon={faCloudArrowUp} className={style.menu_icon} />
            </Link>
            </div>
            <div className={style.title}>
            <Link href="/savednotes">
               Upload Notes
               </Link>  </div>
        </div>
       

       {/* link 2 */}
       <div className={style.link_card} onClick={()=>showNotification()}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faBell} className={style.menu_icon} />
            </div>
            <div className={style.title}>
               Show Notification
            </div>
        </div>
    </div>
</div>




      </div>
    </div>
  )
}

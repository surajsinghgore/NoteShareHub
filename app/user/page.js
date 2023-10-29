"use client";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";



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

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();



  const logOut = async () => {
    signOut({redirect:false});
    dispatch(clientLoginState(false));

    dispatch(setClientData({
      name: '',
      email: '',
      image: false,
    }))
     router.push("/");
  };
  return (
    <div className={style.user_panel}>
      <ClientLoginVerify />
      <div className={style.user_container}>
        <h1>User Settings</h1>

        {/* general sitting links */}
        <div className={style.links}>
          <h2>General</h2>
          <div className={style.link}>
            <div className={`${style.icon} ${style.userInfo}`}>
              <FontAwesomeIcon icon={faUser} className={style.menu_icon} />
            </div>

            <div className={style.title}>Account Information</div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>

          <div className={`${style.link} ${style.lastLink}`}>
            <div className={`${style.icon} ${style.bookMark}`}>
              <FontAwesomeIcon icon={faBookmark} className={style.menu_icon} />
            </div>

            <div className={style.title}>Bookmark Notes</div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>
        </div>

        {/* post related */}
        <div className={style.links}>
          <h2>Activity</h2>
          <div className={style.link}>
            <div className={`${style.icon} ${style.myPost}`}>
              <FontAwesomeIcon
                icon={faFileInvoice}
                className={style.menu_icon}
              />
            </div>

            <div className={style.title}>My Post</div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>

          <div className={`${style.link} ${style.lastLink}`}>
            <div className={`${style.icon} ${style.logout}`}>
              <FontAwesomeIcon icon={faIdCard} className={style.menu_icon} />
            </div>

            <div className={style.title}>Followed Accounts</div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>
        </div>

        {/* other services */}
        <div className={style.links}>
          <h2>Other</h2>
          <div className={style.link}>
            <div className={`${style.icon} ${style.notification}`}>
              <FontAwesomeIcon icon={faBell} className={style.menu_icon} />
            </div>

            <div className={style.title}>Notification</div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>

          <div className={`${style.link} ${style.lastLink}`}>
            <div className={`${style.icon} ${style.logout}`}>
              <FontAwesomeIcon icon={faLock} className={style.menu_icon} />
            </div>

            <div className={style.title} onClick={() => logOut()}>
              Lockout
            </div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>
        </div>
      </div>
    </div>
  );
}

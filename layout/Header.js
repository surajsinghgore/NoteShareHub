"use client";
import Image from "next/legacy/image";
import style from "./header.module.css";
import logo from "../public/logo.png";
import user from "../public/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import {
  faMagnifyingGlass,
  faBell,
  faArrowUpFromBracket,
  faBookmark,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const session = useSession();
  const [imageEnable, setImageEnable] = useState(false);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    console.log("d");
    if (session.data != undefined) {
      if (session.data.user.image != undefined) {
        setImageEnable(true);
        console.log(session.data.user.image);
        setImagePath(session.data.user.image);
      }
    }
  }, [session]);
  return (
    <div className={style.Header}>
      {/* logo */}
      <div className={style.logo}>
        <div className={style.image}>
          <Link href="/">
            {" "}
            <Image src={logo} alt="logo" layout="responsive" />
          </Link>
        </div>
        <div className={style.logo_name}>
          <Link href="/">Note Share Hub</Link>
        </div>
      </div>

      {/* search bar */}
      <div className={style.search}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Start Search Topic For Handwritten Note"
        />
      </div>

      {/* small menu  */}
      <div className={style.menu}>
        <div className={style.active} title="Home Page">
          <FontAwesomeIcon icon={faHouse} className={style.menu_icon} />
        </div>
        <div className={style.iconCard} title="Saved Notes">
          <FontAwesomeIcon icon={faBookmark} className={style.menu_icon} />
        </div>
        <div className={style.iconCard} title="upload Notes">
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className={style.menu_icon}
          />
        </div>
      </div>
      <div className={style.notification} title="check Notification">
        <div className={style.dot}></div>
        <FontAwesomeIcon icon={faBell} className={style.notification_icon} />
      </div>

      <div className={style.user_panel}>
        {imageEnable ? (
          <Link href="/user">
            <Image
              src={imagePath}
              alt="user"
              layout="fill"
              style={{ borderRadius: "60px" }}
            />
          </Link>
        ) : (
          <Link href="/user">
            <Image src={user} alt="user" layout="fill" />
          </Link>
        )}
      </div>
    </div>
  );
}

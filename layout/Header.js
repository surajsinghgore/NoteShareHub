import Image from 'next/image'
import style from './header.module.css'
import logo from '../public/logo.png'
import user from '../public/user.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className={style.Header}>
    {/* logo */}
     <div className={style.logo}>
      <div className={style.image}>
        <Image src={logo} alt="logo" layout='fill' />
      </div>
      <div className={style.logo_name}>Note Share Hub</div>
     </div>

     {/* search bar */}
     <div className={style.search}>
     <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={style.icon}
      />
      <input type="search" name="search" id="search" placeholder='Start Search Topic For Handwritten Note' />
     </div>
     <div className={style.notification}>

     <FontAwesomeIcon icon="fa-regular fa-bell" />
     </div>

     <div className={style.user_panel}>
     <Image src={user} alt="user" layout='fill' />

     </div>
    </div>
  )
}

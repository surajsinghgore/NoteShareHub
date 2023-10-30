'use client';
import ClientLoginVerify from '@/middleware/ClientLoginVerify'
import style from './AccountInformation.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/legacy/image';

import { useSelector } from "react-redux";

export default function Page() {
    const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
    console.log(clientLoginInfo)
  return (
      <div className={style.user_account}>
      <ClientLoginVerify />
    <div className={style.section}>
{/* top header section */}
<div className={style.top}>
<div className={style.icon}>

<Link href="/user">

<FontAwesomeIcon icon={faLeftLong}  />
</Link>
</div>
<h1>Account Information</h1>
</div>


{/* .profile section */}
<div className={style.profile}>

<div className={style.profile_image}>
<Image src={clientLoginInfo.image} alt="client profile " layout='fill' className={style.image}/>

</div>

<div className={style.name_section}>
<h2>{clientLoginInfo.name}</h2>
<p>{clientLoginInfo.email}</p>
</div>
</div>


    </div>
    </div>
  )
}

'use client';

import Image from 'next/legacy/image';
import style from './login.module.css';
import {  signIn, useSession } from "next-auth/react"
import { useEffect } from 'react';

export default function Page() {
    const session=useSession();
    const LoginWithGoogle=async()=>{

        signIn("google")
    }

    useEffect(()=>{

console.log(session)
    },[session]);
    
  return (
    <div className={style.login}>
      <div className={style.googleBtn} title='Login With Google'>
<div className={style.googleImage}>
<Image src="/google.png" alt="google image login btn" layout='fill' />
</div>
<div className={style.title} onClick={()=>LoginWithGoogle()}>Login with Google</div>
      </div>
    </div>
  )
}

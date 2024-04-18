'use client';

import Image from 'next/legacy/image';
import style from './login.module.css';
import {  signIn, useSession } from "next-auth/react"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClientLoginVerify from '@/middleware/ClientLoginVerify';

export default function Page() {
    const { push } = useRouter();
    const router = useRouter();
    const session=useSession();
    const LoginWithGoogle=async()=>{

        signIn("google")
    }

    const sendDataToDb=async()=>{
        let name=session.data.user.name;
        let email=session.data.user.email;
        let image=session.data.user.image;
        if((name!=undefined)||(email!=undefined)||(image!=undefined)){
        let res=await fetch('/api/clientLogin',{
            method:"POST",
            body:JSON.stringify({name,email,image})
        })
        if(res.status==200){
            localStorage.setItem('clientLogin',true);
            push('/');

            return;
        }
        
    }
    }
    useEffect(()=>{

        if(session.data!=undefined){      
        let name=session.data.user.name;
        let email=session.data.user.email;
        let image=session.data.user.image;
        if((name!=undefined)||(email!=undefined)||(image!=undefined)){
            sendDataToDb()
        }

        if (localStorage.getItem("clientLogin")) {
          push('/');
          }
    }
    },[session.data]);
    



  return (
    <div className={style.login}>
    <ClientLoginVerify />
      <div className={style.googleBtn} title='Login With Google'  onClick={()=>LoginWithGoogle()}>
<div className={style.googleImage}>
<Image src="/google.png" alt="google image login btn" layout='fill' priority/>
</div>
<div className={style.title}>Login with Google</div>
      </div>
    </div>
  )
}
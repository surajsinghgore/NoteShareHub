"use client";

import Image from "next/legacy/image";
import style from "./login.module.css";
import { signIn, useSession } from "next-auth/react";
import LoadingBar from "react-top-loading-bar";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientData } from "../../redux/slice/ClientLoginInfo";
import { clientLoginState } from "../../redux/slice/ClientLoginState";
export default function Page() {
  const [progress, setProgress] = useState(100);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const router = useRouter();
  const session = useSession();

  const loginState = useSelector((state) => state.clientLoginState);
  // page not allowed once login In
  if (loginState.state) {
    router.back();
  }

  const LoginWithGoogle = async () => {
    setProgress(30);
    await signIn("google");
    setProgress(60);
    sendDataToDb();
  };

  const sendDataToDb = async () => {
    sendDataToDb(70)
    let name = await session.data.user.name;
    let email = await session.data.user.email;
    let image = await session.data.user.image;
    dispatch(setClientData({ name, email, image }));
    if (name != undefined || email != undefined || image != undefined) {
      let res = await fetch("/api/clientLogin", {
        method: "POST",
        body: JSON.stringify({ name, email, image }),
      });
      setProgress(100);
      if (res.status == 200) {
        localStorage.setItem("clientLogin", true);
        dispatch(clientLoginState(true));
        push("/");
      }
    }
  };

  return (
    <>
 <LoadingBar
        color="#242c3f"
        progress={progress}
        onLoaderFinished={() => setProgress(progress)}
        height={6}
      />

    <div className={style.login}>
      <div
        className={style.googleBtn}
        title="Login With Google"
        onClick={() => LoginWithGoogle()}
      >
        <div className={style.googleImage}>
          <Image
            src="/google.png"
            alt="google image login btn"
            layout="fill"
            priority
          />
        </div>
        <div className={style.title}>Login with Google</div>
      </div>
    </div>
    </>
  );
}

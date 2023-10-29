"use client";

import Image from "next/legacy/image";
import style from "./login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { setClientData } from "../../redux/slice/ClientLoginInfo";
import { clientLoginState } from "../../redux/slice/ClientLoginState";
export default function Page() {
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
    signIn("google");
  };

  const sendDataToDb = async () => {
    console.log("firedEvent");
    let name = session.data.user.name;
    let email = session.data.user.email;
    let image = session.data.user.image;
    dispatch(setClientData({ name, email, image }));
    if (name != undefined || email != undefined || image != undefined) {
      let res = await fetch("/api/clientLogin", {
        method: "POST",
        body: JSON.stringify({ name, email, image }),
      });
      if (res.status == 200) {
        dispatch(clientLoginState(true));
        push("/");
        return;
      }
    }
  };
  useEffect(() => {
    if (session != undefined) {
      if (session.data != undefined) {
        let name = session.data.user.name;
        let email = session.data.user.email;
        let image = session.data.user.image;
        if (name != undefined || email != undefined || image != undefined) {
          sendDataToDb();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data]);

  return (
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
  );
}

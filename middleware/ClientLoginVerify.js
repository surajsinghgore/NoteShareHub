"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function ClientLoginVerify({ children }) {
  const { push } = useRouter();
  const loginState = useSelector((state) => state.clientLoginState);

  useEffect(() => {
    if (!loginState.state) {
      push("/login");
    }
  });
  return <div>{loginState && children }</div>;
}
 
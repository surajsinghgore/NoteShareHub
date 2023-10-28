"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientLoginVerify() {
  const { push } = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("clientLogin")) {
      push("/login");
    }
  });
  return <></>;
}

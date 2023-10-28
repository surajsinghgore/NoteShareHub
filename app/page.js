'use client'
// import {  signIn, useSession } from "next-auth/react"
import Header from "../layout/Header";

import {  useSelector } from "react-redux";

export default function Home() {
// get client data
const count = useSelector((state) => state.clientLoginInfo); // Access the counter state

  return (
    <div>


{/* <button onClick={() => signIn("google")}>Login</button> */}
    </div>
  )
}

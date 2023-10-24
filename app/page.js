'use client'
import {  signIn, useSession } from "next-auth/react"


export default function Home() {
 const session=useSession();
 console.log(session)
  return (
    <div>


<button onClick={() => signIn("google")}>Login</button>
    </div>
  )
}

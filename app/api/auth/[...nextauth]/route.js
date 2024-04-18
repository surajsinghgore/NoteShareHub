import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler=NextAuth({

  providers:[
    GoogleProvider({
 
      clientId:process.env.NEXT_PUBLIC_GOOGLE_APP_CLIENT_ID,
      clientSecret:process.env.NEXT_PUBLIC_GOOGLE_APP_CLIENT_SECRET,
   
     })
  ], secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET_KEY,
})


export {handler as GET,handler as POST}
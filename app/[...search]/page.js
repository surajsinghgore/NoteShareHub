"use client";

import style from './style.module.css'
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useParams } from 'next/navigation';

export default function Page() {
    const pathname = usePathname();
    const getParams = useParams();
    const [param,setParam]=useState(decodeURIComponent(getParams.search[1]))
const[pageData,setPageData]=useState([]);
  const session = useSession();
 

//   fetch search data to view
const fetchSearchData=async()=>{

    // with login
    if (session.data != undefined) {
    
        let mainSearchRes=await fetch(`/api/mainsearch?ItemSearch=${param}&userActiveEmail=${session.data.user.email}`);
let res=await mainSearchRes.json();
console.log(res)
if(mainSearchRes.status=="200"){
    setPageData(res.data)       

}
      
      
          
        
      }
// without login
else{
    let mainSearchRes=await fetch(`/api/mainsearch?ItemSearch=${param}`);
    let res=await mainSearchRes.json();
    console.log(res)
    if(mainSearchRes.status=="200"){
        setPageData(res.data)       
    
    }   
}


}


useEffect(()=>{
    fetchSearchData();
},[param,session])

  return (
    <div className={style.searchResult}>
      <h2>{param}</h2>
    </div>
  )
}

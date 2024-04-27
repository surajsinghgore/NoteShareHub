"use client";
import ClientLoginVerify from "@/middleware/ClientLoginVerify";

import style from './savednotes.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector ,useDispatch} from "react-redux";
import { Toaster, toast } from "sonner";

import {
    faMagnifyingGlass,
   
  } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { setClientData } from "../../redux/slice/ClientLoginInfo";
import { clientLoginState } from "../../redux/slice/ClientLoginState";
import Link from "next/link";

export default function Page() {
  const [copyofData,setCopyOfData]=useState([])
  const [data,setData]=useState([]);
  const loginState = useSelector((state) => state.clientLoginState);
  const clientLoginInfo = useSelector((state) => state.clientLoginInfo);
  const session = useSession();
  const dispatch = useDispatch();
const [search,setSearch]=useState("")

  const fetchNotes=async()=>{




    if((clientLoginInfo.email==undefined)||clientLoginInfo.email==""){
      toast.error("Please Login To Fetch Notes");
return;
    }

const fetchNotes=await fetch(`/api/savednotes?user=${clientLoginInfo.email}`);
let res=await fetchNotes.json();

if(fetchNotes.status=="500"){
  toast.error(res.message);
  return;
}

if(fetchNotes.status=="400"){
  toast.error(res.message);
  return;
}
if(fetchNotes.status=="404"){
  toast.error(res.message);
  return;
}

if(fetchNotes.status=="200"){
  setData(res.data)
  setCopyOfData(res.data)


}
  }



  const removeSaveNote=async(id)=>{




    if((clientLoginInfo.email==undefined)||clientLoginInfo.email==""){
      toast.error("Please Login To Fetch Notes");
return;
    }

const fetchNotesRes=await fetch("/api/savednotes",{
  method:"DELETE",
  body:JSON.stringify({userEmail:clientLoginInfo.email,postIdToDelete:id})
});
let res=await fetchNotesRes.json();

if(fetchNotesRes.status=="500"){
  toast.error(res.message);
  return;
}

if(fetchNotesRes.status=="400"){
  toast.error(res.message);
  return;
}
if(fetchNotesRes.status=="404"){
  toast.error(res.message);
  return;
}

if(fetchNotesRes.status=="200"){

  toast.success(res.message);
fetchNotes();


}
  }

  useEffect(()=>{
   
    if (session.data != undefined) {
      if (session.data.user.image != undefined) {
      
        dispatch(clientLoginState(true));
     
        
        dispatch(
          setClientData({
            name: session.data.user.name,
            email: session.data.user.email,
            image: session.data.user.image,
          })
        );
        fetchNotes();
      }
    }
  },[session])



  // search notes using saved search bar

const searchSavedNotes=(e)=>{
  // copyofData
setSearch(e.target.value);

if(e.target.value==""){
  setData(copyofData);
}
else{

  const filterData=copyofData.filter((item)=>{
    return item.title.toLowerCase().includes(e.target.value.toLowerCase())
  })
  if(filterData.length!=0){
    setData(filterData);

  }else{
    const filterData = copyofData.filter(post =>
      post.keyword.some(keyword => keyword.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setData(filterData);

  }

}
}

  return (
    <>
   <ClientLoginVerify />
<div className={style.savedNotes}>
     
     <Toaster position="bottom-center" richColors closeButton />

   {/* top search */}
   <div className={style.searchNotesTop}>
<input type="search" placeholder='Search Notes From Saved Notes' value={search} onChange={(e)=>searchSavedNotes(e)}/>
<FontAwesomeIcon icon={faMagnifyingGlass} className={style.searchIcon} />

   </div>

<h6>MY SAVED NOTES:-</h6>



<div className={style.savedNotesMedia}>


{(data.length!=0)?<>

{(data.map((item)=>{
  let date = new Date(item.dateandtime);
let amOrPm="";
{(date.getHours>=12)?amOrPm="Pm":amOrPm="Am"}
  return  <div className={style.mediaPosts} key={item.id}>


  <div className={style.mediaPost}>

  <button onClick={()=>removeSaveNote(item.id)}>remove</button>
  <Link href={`/commentstopost?post=${item.id}`}>
{/* image */}
<div className={style.postImage}>
<Image src={item.image} alt="note" layout='fill' className={style.Image}/>

</div>

{/* title */}
<div className={style.postTitle}>

<h1>{item.title}</h1>
<p>{`${date.getHours()}-${date.getMinutes()} ${amOrPm}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>


</div></Link>
  </div>

</div>
}))}
    </>: <div className={style.notSavedNotesMedia}>
<h2>You Not Saved Any Notes</h2>
</div>}
</div>

   </div>






 
  
   
    </>
  )
}

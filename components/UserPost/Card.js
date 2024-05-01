"use client";
import LoadingBar from "react-top-loading-bar";

import Image from "next/legacy/image";
import style from '../../app/user/[...user]/users.module.css'
import {  toast } from "sonner";
import { useSession } from "next-auth/react";
import { useSelector,useDispatch } from "react-redux";
import { DeletePostReload } from "../../redux/slice/DeletePostReload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
  faCloudArrowDown,
  faComment,
 faEllipsisVertical,
 faGear,
 
 faPenSquare,
 
 faThumbsUp,
 faTrash
} from "@fortawesome/free-solid-svg-icons";
import { useState ,useRef,useEffect} from "react";
import Link from "next/link";
export default function Card(props) {
    const dropdown = useRef(null);
    const session = useSession();
    const DeletePostReloads = useSelector((state) => state.DeletePostReload);
    const [progress, setProgress] = useState(100);

    const [menuOption,setMenuOption]=useState(false);
    const { item } = props;
    const dispatch = useDispatch();

    const handleMainMenu=()=>{
        setMenuOption(!menuOption)
    }



    //   disable on outside click
  useEffect(() => {
    
    // only add the event listener when the dropdown is opened
    if (!menuOption) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setMenuOption(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [menuOption]);




  const deleteNotePost=async(id)=>{
     setProgress(30)
if(id==undefined||id==null){
    toast.warning("Please TRY AGAIN");
    return;
}
  if(session.data==null){
    toast.warning("Please Login To DELETE THIS POST");
    return;
  }
const deleteRes=await fetch(`/api/uploadposts?id=${id}&activeUser=${session.data.user.email}`,{
    method:"DELETE"
})
setProgress(60)

let res=await deleteRes.json();
setProgress(100)

if(deleteRes=="500"){
    toast.error(res.message);
    return; 
}

if(deleteRes=="400"){
    toast.warning(res.message);
    return; 
}

if(deleteRes=="404"){
    toast.error(res.message);
    return; 
}


   
if(DeletePostReloads.state){
    dispatch(DeletePostReload(false));
}else{

    dispatch(DeletePostReload(true));

}
toast.success(res.message);

  }
  return (
    <div className={style.post} key={item._id} ref={dropdown}>
   <LoadingBar
        color="#242c3f"
        progress={progress}
      
        height={6}
      />
<FontAwesomeIcon icon={faEllipsisVertical} className={style.mainSetting} onClick={()=>handleMainMenu()}/>
{(menuOption&&<div className={style.menuOpen}>
<li >
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faPenSquare}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc}>
                        <h2>Edit Note</h2>
                        <h3>Edit this  note</h3>
                      </div>
                    </li>

                    <li >
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc} onClick={()=>deleteNotePost(item._id)}>
                        <h2>Delete Note</h2>
                        <h3>Remove this  Note</h3>
                      </div>
                    </li>
                    


</div>)}

<Link href={"/commentstopost?post="+item._id}> <div className={style.postMedias}>
    <Image src={item.post_media} alt={item.post_media} layout='fill'/>
    
    </div>
    </Link>
    
  
    </div>
  )
}

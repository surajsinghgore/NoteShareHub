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
  faClose,
  faCloudArrowDown,
  faComment,
 faEllipsisVertical,
 faGear,
 
 faPaperPlane,
 
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
const [updateModal,setUpdateModal]=useState(false);
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



const updateNotePost=async(id)=>{
    setUpdateModal(true);
}
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
    <>

   {(updateModal)?<></>:""}

<div className={style.updateModelBg}>
</div>
<div className={style.updateForm}>
<div className={style.closeBtn}>
<FontAwesomeIcon
title="Close Update Form"
                          icon={faClose}
                          className={style.close}
                        />
</div>
<h2>Update Post</h2>
<div className={style.mainForm}>


{/* left */}
<div className={style.left}>

                                <div className={style.post_info}>
                                  <li>
                                    <div className={style.title}>Title</div>
                                    <div className={style.input}>
                                      <input
                                        type="text"
                                        placeholder="Enter Title Of This Post"
                                    
                                      />
                                    </div>
                                  </li>

                                  <li>
                                    <div className={style.title}>
                                      Enter Keywords
                                    </div>
                                    <div className={style.input}>
                                      <input
                                        type="text"
                                       
                                        placeholder="Enter Keywords Of This Post like web,android,iot"
                                      />
                                    </div>
                                  </li>

                                  <li>
                                    <div className={style.title}>
                                      Post Visibility
                                    </div>
                                    <div className={style.input}>
                                      <select
                                        name="visibility"
                                       
                                      >
                                        <option>public</option>
                                        <option>private</option>
                                      </select>
                                    </div>
                                  </li>

                                  <li>
                                    <div className={style.title}>
                                      Post Description
                                    </div>
                                    <div className={style.input}>
                                      <textarea
                                        name="description"
                                        
                                        
                                        placeholder="Describe The Post In Detail"
                                      ></textarea>
                                    </div>
                                  </li>
                                </div>
                          


</div>


{/* right */}
<div className={style.right}>
<div className={style.title}>
                                  Selected Media
                                </div>
                                <div className={style.mediaImages}>
                                  <Image
                                    src="/note.jpg"
                                    alt="media"
                                    layout="fill"
                                    priority
                                  />
                                </div>
                                <div className={style.imageMediaDes}>
                                  <h2>Filename</h2>
                                  <p>3232312131</p>
                                </div>

</div>
</div>
{/* btn */}
<div className={style.uploadBtn}>
                      <button >
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          title="Discard this post"
                          className={style.postMedia}
                        />{" "}
                        Update Note
                      </button>
                    </div>

</div>








    {/* <div className={style.post} key={item._id} ref={dropdown}>
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
                      <div className={style.hidemenu_icons} onClick={()=>updateNotePost(item._id)}>
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
    
  
    </div> */}
    </>
  )
}

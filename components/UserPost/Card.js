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
 faEdit,
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
  // data
  
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [visibility, setVisibility] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
const[fileChangesStatus,setFileChangeStatus]=useState(false);


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


// fetching notes default value
const updateNotePost=async(id)=>{

    setUpdateModal(true);
    // fetch data
    let fetchData=await fetch(`/api/getuploadposts?post=${id}`);
    let data=await fetchData.json();
    if(fetchData.status=="200"){
       setTitle(data.data.title);
       let keywords=data.data.keyword.toString();

     setKeyword(keywords);
       setVisibility(data.data.visibility);
     setDescription(data.data.description);
       setFile(data.data.post_media);
      setFileName(data.data.post_media.match(/\/([^\/?#]+)\.\w+$/)[1]);


    

    }
  
}

const closeUpdateForm=()=>{
    setUpdateModal(false);
 
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

  const handleChanges = async (e) => {
    setFileChangeStatus(true)
    setFile(URL.createObjectURL(e.target.files[0]));
setFileName(e.target.files[0].name)
    // extractTextFromImage(e.target.files);
  };


  const updateRecords=async(id)=>{
 
if(session.data==null){
  toast.warning("Please Login To Update This Note");
  setProgress(100)
    return;
}
if(id==undefined||id==null){
  toast.warning("Please try again by refreshing the page");
    setProgress(100)
      return;
}

const data=new FormData();
data.append("title",title)
data.append("id",id)
data.append("userActiveEmail",session.data.user.email);
data.append("keyword",keyword)
data.append("description",description)
data.append("visibility",visibility)



      // let's update note
      // check weather image is updated or not
      // Yes post also updated
if(fileChangesStatus){

}


// image not updated
else{

data.append("pictureStatus",'no')


  // ! [title field]
  if ((title.length == 0)||title.length == " ") {
    toast.warning("Please Enter Title in Post ");
  setProgress(100)
    return;
  }

    // ! [keyword field]
    if ((keyword.length == 0)||keyword.length == " ") {
      toast.warning("Please Enter Keyword in Post ");
    setProgress(100)
      return;
    }

    
    // ! [description field]
    if ((description.length == 0)||description.length == " ") {
      toast.warning("Please Enter Description in Post ");
    setProgress(100)
      return;
    }
    const updateNotesRes=await fetch("/api/uploadposts",{
      method:"PATCH",
      
      body:data
    })
    setProgress(100)
    if (!updateNotesRes.ok) {
      throw new Error('Failed to update profile');
  }

let res=await updateNotesRes.json();
  if(updateNotesRes=="500"){
    toast.error(res.message);
    return; 
}

if(updateNotesRes=="400"){
    toast.warning(res.message);
    return; 
}

if(updateNotesRes=="404"){
    toast.error(res.message);
    return; 
}



  setUpdateModal(false);
  if(DeletePostReloads.state){
    dispatch(DeletePostReload(false));
}else{

    dispatch(DeletePostReload(true));

}
toast.success(res.message);





}
  }
  return (
    <>
<LoadingBar
        color="#242c3f"
        progress={progress}
      
        height={6}
      />
   {(updateModal)?<>
{/* update view */}
    <div className={style.updateModelBg} >
</div>
<div className={style.updateForm} >
<div className={style.closeBtn} onClick={()=>closeUpdateForm()}>
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
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
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
                                        value={keyword}
                                    onChange={(e)=>setKeyword(e.target.value)}
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
                                        value={visibility}
                                    onChange={(e)=>setVisibility(e.target.value)}
                                    defaultValue={visibility}
                                      >
                                    
                                      <option >public</option>
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
                                        value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                                        
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
                                <div className={style.editDivImage} title="Edit Image" >
                               
                          <label className={style.button} htmlFor="upload">
                          <FontAwesomeIcon
                          icon={faEdit}
                          
                          className={style.editImage}
                        />
                          </label>
                          <input
                            id="upload"
                            type="file"
                            onChange={(e)=>handleChanges(e)}
                        accept="image/jpg, image/png, image/gif, image/webp,image/jpeg,"
                          />
                        
                        
                        
                        </div>
                                  <Image
                                    src={file}
                                    alt={file}
                                    layout="fill"
                                    priority
                                  />
                                </div>
                                <div className={style.imageMediaDes}>
                                  <h2>Filename</h2>
                                  <p>{fileName}</p>
                                </div>

</div>
</div>
{/* btn */}
<div className={style.uploadBtn}>
                      <button onClick={()=>updateRecords(item._id)}>
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          title="Discard this post"
                          className={style.postMedia}
                        />{" "}
                        Update Note
                      </button>
                    </div>

</div>

   </>:
   <>
   {/* normal view */}
   <div className={style.post} key={item._id} ref={dropdown}>
   
<FontAwesomeIcon icon={faEllipsisVertical} className={style.mainSetting} onClick={()=>handleMainMenu()}/>
{(menuOption&&<div className={style.menuOpen}>
<li onClick={()=>updateNotePost(item._id)}>
                      <div className={style.hidemenu_icons}>
                        <FontAwesomeIcon
                          icon={faPenSquare}
                          className={style.hidemenu_icon}
                        />
                      </div>
                      <div className={style.hidemenu_desc} >
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
    
  
    </div>
   </>}









   
    </>
  )
}

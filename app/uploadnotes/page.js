"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/legacy/image";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];

import style from "./uploadnotes.module.css";
import {
   faPenNib,
    faTrash,
  faPaperPlane,faCloudArrowUp
  } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
<FontAwesomeIcon icon="fa-solid fa-pen-nib" />
  
export default function Page() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };

    const handleChanges = async (e) => {
      
          setFile(e.target.files);
      };
    useEffect(()=>{

console.log(file)
    },[file])
  return (
    <div>

    <div className="mediaPost">
    
    {/* post section */}
    {(file)==null? <><div className="post_section">
    <FileUploader handleChange={handleChange}  multiple={true} name="file" types={fileTypes} >
   <div className={style.uploadMedia}>
<h1>File Upload</h1>
<div className={style.fileUpload}>
<div className={style.uploadIconsMedia}>
<label className={style.menuIcon} htmlFor="upload">
<FontAwesomeIcon
            icon={faCloudArrowUp}
         
            className={style.uploadMedias}
          /> </label>

</div>
<h2>Drag and Drop Files</h2>
<h3><hr /> or <hr/></h3>
<div className={style.container}>
      <div className={style.button_wrap}>
    
        <label className={style.button} htmlFor="upload">Upload Notes</label>
        <input id="upload" type="file" onChange={handleChanges} multiple/>
      </div>
    </div>

</div>
   </div>
</FileUploader>

    </div></>:<>
    {/* after upload files */}
    <div className={style.mainUploadContainer}>

    
<div className={style.upload}>
<div className={style.TopIcon}>
<FontAwesomeIcon
            icon={faPenNib}
            className={style.postIcon}
          />
<span>Create Post #1</span>
</div>
<div className={style.deleteIcon}>

<FontAwesomeIcon
            icon={faTrash}
            title="Discard this post"
            className={style.deleteIcon}
          />
</div>
<div className={style.innerUpload}>
{/* left media */}
<div className={style.leftMedia}>
<div className={style.post_info}>

<li>
<div className={style.title}>Title</div>
<div className={style.input}>
<input type="text" placeholder="Enter Title Of This Post"/>
</div>
</li>




<li>
<div className={style.title}>Enter Keywords</div>
<div className={style.input}>
<input type="text" placeholder="Enter Keywords Of This Post"/>
</div>
</li>


<li>
<div className={style.title}>Post Visibility</div>
<div className={style.input}>
<select name="visibility">
    <option>public</option>
    <option>private</option>
</select>
</div>
</li>

<li>
<div className={style.title}>Post Description</div>
<div className={style.input}>
<textarea name="description" placeholder="Describe The Post In Detail">
   
</textarea>
</div>
</li>
</div>
</div>
{/* right media */}
<div className={style.rightMedia}>

<div className={style.title}>Selected Media</div>
<div className={style.mediaImages}>
<Image src="/note.jpg" alt="media" layout="fill" />
</div>
<div className={style.imageMediaDes}>
<h2>Filename</h2>
<p>images2.jpg</p>
</div>
</div>
</div>


</div>
    
    
    <div className={style.uploadBtn}>
<button><FontAwesomeIcon
            icon={faPaperPlane}
            title="Discard this post"
            className={style.postMedia}
          /> Post</button>
    </div>


    </div>
    </>
    
    }
   

    
    
    
    

    
    </div>
    
    
        </div>
  )
}

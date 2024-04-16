import HomePostCard from "@/components/Card/HomePostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/legacy/image";
import style from "./uploadnotes.module.css";
import {
   faPenNib,
    faTrash,
  faPaperPlane
  } from "@fortawesome/free-solid-svg-icons";
<FontAwesomeIcon icon="fa-solid fa-pen-nib" />
  
export default function page() {
  return (
    <div>

    <div className="mediaPost">
    
    {/* post section */}
    <div className="post_section">
    
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



    </div>
    
    
    
 
    
    </div>
    
    
        </div>
  )
}

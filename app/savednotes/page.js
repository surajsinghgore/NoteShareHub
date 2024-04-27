import style from './savednotes.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faMagnifyingGlass,
   
  } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/legacy/image';
  
export default function page() {
  return (
    <div className={style.savedNotes}>
    {/* top search */}
    <div className={style.searchNotesTop}>
<input type="search" placeholder='Search Notes From Saved Notes' />
<FontAwesomeIcon icon={faMagnifyingGlass} className={style.searchIcon} />

    </div>

<h6>MY SAVED NOTES:-</h6>

{/* notsavedNotes */}
{/* <div className={style.notSavedNotesMedia}>
<h2>You Not Saved Any Notes</h2>
</div> */}

<div className={style.savedNotesMedia}>

<div className={style.mediaPost}>
{/* image */}
<div className={style.postImage}>
<Image src={"/note.jpg"} alt="note" layout='fill' className={style.Image}/>

</div>

{/* title */}
<div className={style.postTitle}>

<h1>SURAJ SINGH</h1>
<p>23:23 Pm 23/23/2003 </p>
</div>
</div>

</div>

    </div>
  )
}

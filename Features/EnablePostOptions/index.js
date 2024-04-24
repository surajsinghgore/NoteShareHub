import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faEllipsis,
  faShareNodes,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/legacy/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";  
export default function Index(props) {
    const dropdown = useRef(null);
const [date,setDate]=useState("");
const [time,setTime]=useState("");
  const { Data } = props;
  const [showAllDescription,setShowAllDescription]=useState(false);

      // show all description 
  const expandDescription=()=>{
    setShowAllDescription(true)
        }         
useEffect(()=>{
  const currentDate = new Date(Data.dateandtime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
  const day = currentDate.getDate();

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  setDate(`${day}-${month}-${year}`)
  setTime(`${hours}:${minutes} ${amOrPm}`)
},[])
  const [optionState, setOptionsState] = useState(false);
  const enableOption = () => {
    setOptionsState(!optionState);
  };
//   disable on outside click
  useEffect(() => {
    
    // only add the event listener when the dropdown is opened
    if (!optionState) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setOptionsState(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [optionState]);
  return (
 
            <div className="post" ref={dropdown}>
              {/* top section */}
              <div className="top_section">
                {/* hide menu on click */}
                {optionState && (
                  <div className="hide_menu" >
                    <li>
                      <div className="hidemenu_icons">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="hidemenu_icon"
                        />
                      </div>
                      <div className="hidemenu_desc">
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>

                    <li>
                      <div className="hidemenu_icons">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="hidemenu_icon"
                        />
                      </div>
                      <div className="hidemenu_desc">
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>

                    <li>
                      <div className="hidemenu_icons">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="hidemenu_icon"
                        />
                      </div>
                      <div className="hidemenu_desc">
                        <h2>Save Post</h2>
                        <h3>Add this to your saved items</h3>
                      </div>
                    </li>
                  </div>
                )}

                {/* profile */}
                <div className="image_profile">
                  <Image
                    src={Data.autherProfile}
                    alt={Data.autherProfile}
                    layout="fill"
                    className="profile_image"
                    priority
                  />
                </div>
                {/* User Name */}
                <div className="user_detail">
                  <h2>{Data.autherName}</h2>
                  <h3>{time} {date} </h3>
                </div>

                {/* option btn */}
                <div className="option" onClick={() => enableOption()}>
                  <div className="post_icon">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
              </div>

              {/* title */}
              <div className="post_title">
                <h2>
                {Data.title}
              
                 
                </h2>
              </div>
              {/* description */}
              <div className="post_description">
                <p>
               
              {(showAllDescription)?<>{Data.description}</>:<> {(Data.description.length>158)?<>{Data.description.slice(0,158)}<span onClick={()=>expandDescription()}>See More</span></> :Data.description}
                 </>}
             
                </p>
              </div>

              {/* media */}
              <div className="media">

            
            <div className="media_container">
                  <Image
                    src= {Data.post_media}
                    alt={Data.post_media}
                    layout="fill"
                    className="media_image1"
                    priority
                  />
                </div>
           
              
              </div>

              {/* bottom section */}
              <div className="bottom_section">
                {/* like */}
                <div className="like">
                  <div className="bottom_like_icon">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="bottom_icon"
                    />
                  </div>
                  <div className="count">{Data.like}</div>
                </div>

                {/* dislike */}
                <div className="like">
                  <div className="bottom_like_icon dislike">
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className="bottom_icon"
                    />
                  </div>
                  <div className="count">{Data.dislike}</div>
                </div>

                {/* comment */}
                <div className="like">
                  <div className="bottom_like_icon comment">
                    <FontAwesomeIcon icon={faComment} className="bottom_icon" />
                  </div>
                  <div className="count">{Data.comments.length}</div>
                </div>

                {/* share */}
                <div className="like share">
                  <div className="bottom_like_icon">
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className="bottom_icon"
                    />
                  </div>
                  <div className="count">SHARE</div>
                </div>
              </div>
            </div>
          );
       
}

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

  const { Data } = props;
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
                    src={Data.image}
                    alt={Data.media}
                    layout="fill"
                    className="profile_image"
                    priority
                  />
                </div>
                {/* User Name */}
                <div className="user_detail">
                  <h2>{Data.name}</h2>
                  <h3>{Data.time}</h3>
                </div>

                {/* option btn */}
                <div className="option" onClick={() => enableOption()}>
                  <div className="post_icon">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
              </div>

              {/* description */}
              <div className="post_description">
                <p>
                {Data.description.split(0,168)}
              
                  <span>See More</span>
                </p>
              </div>

              {/* media */}
              <div className="media">

              {(Data.media.length==1)? 
            <> 
            <div className="media_container">
                  <Image
                    src= {Data.media}
                    alt={Data.media}
                    layout="fill"
                    className="media_image1"
                    priority
                  />
                </div>
            </>  :
            <>
              <Swiper 
        slidesPerView={'auto'}
        spaceBetween={0}
        className="mySwiper"
        >
              <SwiperSlide > <div className="media_container many">
            <Image
              src={"/img.jpg"}
              alt={"Data.media"}
              layout="fill"
              className="media_image1"
              priority
            />
          </div></SwiperSlide>
        <SwiperSlide> <div className="media_container many">
            <Image
              src={"/img2.jpg"}
              alt={"Data.media"}
              layout="fill"
              className="media_image1"
              priority
            />
          </div></SwiperSlide>
        <SwiperSlide>
         <div className="media_container many">
            <Image
              src={"/img3.jpg"}
              alt={"Data.media"}
              layout="fill"
              className="media_image1"
              priority
            />
          </div></SwiperSlide>
       
      </Swiper>
                
      </>    
              }
              
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
                  <div className="count">{Data.comment}</div>
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

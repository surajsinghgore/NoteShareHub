"use client";
import style from './LeftSideMenu.module.css';
// font awesome
import { usePathname } from 'next/navigation'
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faNewspaper
} from "@fortawesome/free-solid-svg-icons";
export default function LeftSideMenu() {
    const pathname = usePathname()
  return (
//    <div className={style.leftSideMenu} style={{zIndex:-1}}>
   <div className={style.leftSideMenu} style={(pathname==="/commentstopost"||pathname.includes("/user/"))?{zIndex:-1}:{zIndex:999}}> 
      <div className={style.links_container}>


{/* news Feed */}
<div className={style.section}>
    <h2>News Feeds</h2>
    <div className={style.links}>
{/* link 1 */}
        <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
       

       {/* link 2 */}
       <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
    </div>
</div>



<div className={style.section}>
    <h2>News Feeds</h2>
    <div className={style.links}>
{/* link 1 */}
        <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
       

       {/* link 2 */}
       <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
    </div>
</div>



<div className={style.section}>
    <h2>News Feeds</h2>
    <div className={style.links}>
{/* link 1 */}
        <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
       

       {/* link 2 */}
       <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
    </div>
</div>


<div className={style.section}>
    <h2>News Feeds</h2>
    <div className={style.links}>
{/* link 1 */}
        <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
       

       {/* link 2 */}
       <div className={style.link_card}>
            <div className={style.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={style.menu_icon} />
            </div>
            <div className={style.title}>
                Newsfeed
            </div>
        </div>
    </div>
</div>
      </div>
    </div>
  )
}

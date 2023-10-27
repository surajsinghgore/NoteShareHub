import style from "./user.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
export default function page() {
  return (
    <div className={style.user_panel}>
      <div className={style.user_container}>
        <h1>User Settings</h1>

        <div className={style.links}>
          <h2>General</h2>
          <div className={style.link}>
            <div className={style.icon}>
              <FontAwesomeIcon icon={faUser} className={style.menu_icon} />
            </div>

            <div className={style.title}>Account Information</div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>



          <div className={`${style.link} ${style.lastLink}`}>
            <div className={style.icon}>
              <FontAwesomeIcon icon={faUser} className={style.menu_icon} />
            </div>

            <div className={style.title}>Account Information</div>
            <FontAwesomeIcon icon={faAngleRight} className={style.right} />
          </div>
        </div>


       




      </div>
    </div>
  );
}

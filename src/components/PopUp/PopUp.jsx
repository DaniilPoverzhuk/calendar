import React, { useRef, useEffect, useState } from "react";
import style from "./popup.module.scss";
import { priority } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function PopUp({ setPriority }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const popup = useRef();

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  const handleOutsideClick = (event) => {
    if (!event.composedPath().includes(popup.current)) {
      setShowPopUp(false);
    }
  };

  const choosePriority = (idx) => {
    setPriority(priority[idx]);
    setShowPopUp(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className={style.popup} ref={popup}>
      <div className={style.popupBtn} onClick={togglePopUp}>
        <FontAwesomeIcon icon={faEllipsisV} color="#fff" />
      </div>
      {showPopUp && (
        <ul className={style.popupBlock}>
          {priority.map((item, idx) => (
            <button
              key={idx}
              className={style.popupItem}
              onClick={() => choosePriority(idx)}
            >
              <span
                className={style.popupItemPriority}
                style={{ backgroundColor: item.color }}
              ></span>
              <span className={style.popupItemValue} style={{ color: "#fff" }}>
                {item.level}
              </span>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PopUp;

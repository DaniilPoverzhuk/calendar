import React, { useContext } from "react";
import style from "./popup.module.scss";
import { priority } from "../../constants";
import Context from "../../context";

function PopUp({}) {
  const { popup } = useContext(Context);
  return (
    <div className={style.popupBlock} ref={popup}>
      <ul>
        {priority.map((item, idx) => (
          <button key={idx} className={style.popupItem}>
            <span
              className={style.popupItemPriority}
              style={{ backgroundColor: item.color }}
            ></span>
            <span className={style.popupItemValue}>{item.level}</span>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default PopUp;

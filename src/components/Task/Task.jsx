import style from "./task.module.scss";
import React from "react";

function Task({ value }) {
  return (
    <li className={style.task}>
      <div className={style.taskTop}>
        <p className={style.taskPriority}></p>
        <p className={style.taskValue}>{value}</p>
      </div>
      <div className={style.taskBottom}>12 - 12:30 PM</div>
    </li>
  );
}

export default Task;

import style from "./task.module.scss";
import React from "react";

function Task({ value, time, priority }) {
  return (
    <li className={style.task}>
      <div className={style.taskTop}>
        <p
          className={style.taskPriority}
          style={{ backgroundColor: priority || "#eee" }}
        ></p>
        <p className={style.taskValue}>{value}</p>
      </div>
      <div className={style.taskBottom}>
        {time.firstTime.hours}:{time.firstTime.minutes} -{" "}
        {time.secondTime.hours}:{time.secondTime.minutes}
      </div>
    </li>
  );
}

export default Task;

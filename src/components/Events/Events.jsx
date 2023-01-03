import React, { useState } from "react";
import style from "./events.module.scss";

function Events() {
  const [tasks, setTask] = useState([]);
  return (
    <div className={style.event}>
      <div className={style.eventInner}>
        <div className={style.eventTop}>
          <div className={style.eventTopDay}>Friday, 16</div>
        </div>
        <div className={style.eventAddTask}>
          <input type="text" placeholder="Add task" />
          <span className={style.bar}></span>
        </div>
        <div className={style.listTask}>
          <ul>
            {tasks.length ? (
              tasks.map((item) => <li>{item}</li>)
            ) : (
              <h4>There is no tasks</h4>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Events;

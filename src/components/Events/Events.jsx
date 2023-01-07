import React, { useState } from "react";
import style from "./events.module.scss";

function Events({ clickedDay, tasks, setTasks }) {
  const [value, setValue] = useState("");

  return (
    <div className={style.event}>
      <div className={style.eventInner}>
        <div className={style.eventTop}>
          <div className={style.eventTopDay}>Friday, 16</div>
          <div className={style.eventAddTask}>
            <input
              type="text"
              placeholder="Add task"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              // onKeyDown={addTask}
            />
            <span className={style.bar}></span>
          </div>
        </div>
        <div className={style.eventListTask}>
          <ul>
            <h4>There is no tasks</h4>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Events;

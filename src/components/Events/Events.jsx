import React, { useState } from "react";
import { isCheck } from "../../helpers/helper";
import Task from "../Task/Task";
import style from "./events.module.scss";
import PopUp from "../PopUp/PopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { click } from "@testing-library/user-event/dist/click";
import { months } from "../../constants";

function Events({ clickedDay, tasks, setTasks }) {
  const [value, setValue] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);

  const addTask = (event) => {
    event.preventDefault();
    if (isCheck(tasks, clickedDay)) {
      setTasks([
        ...tasks.map((task) => {
          if (JSON.stringify(task.date) === JSON.stringify(clickedDay)) {
            return { ...task, todos: [...task.todos, value] };
          }
          return task;
        }),
      ]);
      setValue("");
      return;
    }
    setTasks([
      ...tasks,
      {
        date: clickedDay,
        todos: [value],
      },
    ]);

    setValue("");
  };

  console.log(clickedDay);

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <div className={style.event}>
      <div className={style.eventInner}>
        <div className={style.eventTop}>
          <div className={style.eventTopDay}>
            {months[clickedDay.month]}, {clickedDay.day}
          </div>
          <form className={style.eventAddTask} onSubmit={addTask}>
            <div className={style.eventBlock}>
              <input
                type="text"
                placeholder="Add task"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              <div className={style.btnPopUp} onClick={togglePopUp}>
                <FontAwesomeIcon icon={faEllipsisV} color="#fff" />
              </div>
              {showPopUp && <PopUp />}
            </div>
            <div className={style.eventSetTime}>
              <input type="number" placeholder="From" />
              <input type="number" placeholder="To" />
              <input type="submit" value="Add Task" />
            </div>
          </form>
        </div>
        <div className={style.eventListTask}>
          <p className={style.eventSubTitle}>Upcoming tasks</p>
          <ul>
            {tasks[0]?.todos.length ? (
              tasks
                .filter(
                  (task) =>
                    JSON.stringify(task.date) === JSON.stringify(clickedDay)
                )[0]
                ?.todos.map((todo, idx) => <Task value={todo} key={idx} />)
            ) : (
              <h4 className={style.warning}>There are no tasks</h4>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Events;

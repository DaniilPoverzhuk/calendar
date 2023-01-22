import React, { useEffect, useState } from "react";
import { isCheck, validTime } from "../../helpers/helper";
import Task from "../Task/Task";
import style from "./events.module.scss";
import PopUp from "../PopUp/PopUp";
import { months, typesTime } from "../../constants";
import { useForm } from "react-hook-form";

function Events({ clickedDay, tasks, setTasks }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [value, setValue] = useState("");
  const [time, setTime] = useState({
    firstTime: { hours: 0, minutes: 0 },
    secondTime: { hours: 0, minutes: 0 },
  });
  const [priority, setPriority] = useState();
  const [valid, setValid] = useState({ time: true, priority: true });

  const handlerSetTime = (event) => {
    const type = event.target.placeholder;
    const value = event.target.value;
    const hours = value.slice(0, 2);
    const minutes = value.slice(-2);

    switch (type) {
      case typesTime.FROM:
        setTime({ ...time, firstTime: { hours, minutes } });
        break;

      case typesTime.TO:
        setTime({ ...time, secondTime: { hours, minutes } });
        break;
    }
  };

  const addTask = (data, event) => {
    event.preventDefault();

    if (!priority?.color.length) {
      return setValid({ ...valid, priority: false });
    }

    if (!validTime(time)) {
      return setValid({ ...valid, time: false });
    }

    setValid({ priority: true, time: true });

    if (isCheck(tasks, clickedDay)) {
      setTasks([
        ...tasks.map((task) => {
          if (JSON.stringify(task.date) === JSON.stringify(clickedDay)) {
            return {
              ...task,
              todos: [{ value: data.value, time, priority }, ...task.todos],
            };
          }
          return task;
        }),
      ]);
      setValue("");
      setTime({
        firstTime: { hours: 0, minutes: 0 },
        secondTime: { hours: 0, minutes: 0 },
      });
      setPriority();
      return;
    }
    setTasks([
      ...tasks,
      {
        date: clickedDay,
        todos: [{ value: data.value, time, priority }],
      },
    ]);

    setValue("");
    setTime({
      firstTime: { hours: 0, minutes: 0 },
      secondTime: { hours: 0, minutes: 0 },
    });
    setPriority();
    console.log(tasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={style.event}>
      <div className={style.eventInner}>
        <div className={style.eventTop}>
          <div className={style.eventTopDay}>
            {months[clickedDay.month]}, {clickedDay.day}
          </div>
          <form className={style.eventAddTask} onSubmit={handleSubmit(addTask)}>
            <div className={style.eventBlock}>
              <input
                {...register("value", {
                  required: "Поле обязательно к заполнению",
                })}
                type="text"
                placeholder="Add task"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              {errors?.value && (
                <span className={style.error}>{errors?.value?.message}</span>
              )}
              <PopUp setPriority={setPriority} />
            </div>
            <div className={style.eventSetTime}>
              <div style={{ position: "relative" }}>
                <input
                  {...register("from", {
                    required: "Поле обязательно к заполнению",
                  })}
                  type="time"
                  placeholder="From"
                  value={`${time.firstTime.hours}:${time.firstTime.minutes}`}
                  onChange={handlerSetTime}
                />
                {errors?.from && (
                  <span className={style.errorTime}>
                    {errors?.from?.message}
                  </span>
                )}
                {!valid.time && (
                  <span className={style.error}>Enter valid time</span>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  {...register("to", {
                    required: "Поле обязательно к заполнению",
                  })}
                  type="time"
                  placeholder="To"
                  value={`${time.secondTime.hours}:${time.secondTime.minutes}`}
                  onChange={handlerSetTime}
                />
                {errors?.to && (
                  <span className={style.errorTime}>{errors?.to?.message}</span>
                )}
                {!valid.time && (
                  <span className={style.error}>Enter valid time</span>
                )}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <input type="submit" value="Add Task" />
              {!valid.priority && (
                <span className={style.errorPriority}>
                  Set priority fro task
                </span>
              )}
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
                ?.todos.map((todo, idx) => (
                  <Task
                    value={todo.value}
                    time={todo.time}
                    priority={todo.priority.color}
                    key={idx}
                  />
                ))
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

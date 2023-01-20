import React, { useContext, useState } from "react";
import Context from "../../context";
import { isToday } from "../../helpers/helper";
import classNames from "classnames";
import "./day.scss";

function Day({ day, status }) {
  const { currentDate, date, handlerDay } = useContext(Context);

  return (
    <div
      className={classNames({
        item: true,
        hidden: !day,
        currentDay: isToday(currentDate, date, day),
        active: status,
      })}
      onClick={() => handlerDay(day)}
    >
      {day}
    </div>
  );
}

export default Day;

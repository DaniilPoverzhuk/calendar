import React, { useContext, useEffect } from "react";
import Context from "../../context";
import { isToday } from "../../helpers/helper";
import classNames from "classnames";
import "./day.scss";

function Day({ number }) {
  const { currentDate, date, setClickedDay, clickedDay, setId, id } =
    useContext(Context);

  const handlerDay = () => {
    setId((prev) => prev + 1);
    setClickedDay({
      id: ++id,
      date: { day: number, month: date.month, year: date.year },
    });
  };

  return (
    <div
      className={classNames({
        item: true,
        hidden: !number,
        currentDay: isToday(currentDate, date, number),
      })}
      onClick={() => handlerDay()}
    >
      {number}
    </div>
  );
}

export default Day;

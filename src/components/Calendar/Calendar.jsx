import React from "react";
import style from "./calendar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { months, nameOfDays } from "../../constants";
import Day from "../Day/Day";

function Calendar({
  numberOfDays,
  date,
  prevMonth,
  nextMonth,
  handlerSetCurrentDate,
}) {
  return (
    <div className={style.calendar}>
      <div className={style.calendarInner}>
        <div className={style.calendarTop}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={style.arrow}
            onClick={prevMonth}
          />
          <div className={style.calendarTopDate}>
            <div className={style.calendarTopMonth}>{months[date.month]}</div>
            <div className={style.calendarTopYear}>{date.year}</div>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className={style.arrow}
            onClick={nextMonth}
          />
          <button
            className={style.calendarTopBtnToday}
            onClick={handlerSetCurrentDate}
          >
            Today
          </button>
        </div>
        <div className={style.calendarMain}>
          <ul className={style.calendarNameOfDays}>
            {nameOfDays.map((day) => (
              <li> {day} </li>
            ))}
          </ul>
          <div className={style.calendarDays}>
            {numberOfDays.map((day) => (
              <Day number={day} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

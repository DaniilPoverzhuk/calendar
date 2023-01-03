import React from "react";
import style from "./calendar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Day from "../Day/Day";
import { nameOfDays } from "../../constants";

function Calendar({
  days,
  month,
  year,
  prevMonth,
  nextMonth,
  handlerBtnCurrentDate,
  currentDate,
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
            <div className={style.calendarTopMonth}>{month}</div>
            <div className={style.calendarTopYear}>{year}</div>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className={style.arrow}
            onClick={nextMonth}
          />
          <button
            className={style.calendarTopBtnToday}
            onClick={handlerBtnCurrentDate}
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
            {days.map((day, index) => (
              <Day
                {...currentDate}
                month={month}
                year={year}
                key={index}
                day={day}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

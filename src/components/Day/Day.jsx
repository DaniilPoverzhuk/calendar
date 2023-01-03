import React from "react";
import "./day.scss";

function Day({ month, year, currentDay, currentMonth, currentYear, day }) {
  const isCurrentDat = () => {
    if (currentDay == day && currentMonth == month && currentYear == year) {
      return true;
    }
    return false;
  };
  return (
    <div
      className={`item ${!day ? "hidden" : ""} ${
        isCurrentDat() ? "currentDay" : ""
      }`}
    >
      {day}
    </div>
  );
}

export default Day;

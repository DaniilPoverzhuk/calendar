import { useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import Events from "./components/Events/Events";
import { months } from "./constants";
import { getArrayOfDays } from "./helpers/helper";
import { format, lastDayOfMonth } from "date-fns";

function App() {
  const datejs = new Date();
  const [date, setDate] = useState({
    month: datejs.getMonth(),
    year: datejs.getFullYear(),
  });
  const [qntDays, setQntDays] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    currentDay: null,
    currentMonth: null,
    currentYear: null,
  });

  useEffect(() => {
    const getCurrentDate = () => Date.now();
    setCurrentDate({
      currentYear: format(getCurrentDate(), "y"),
      currentMonth: format(getCurrentDate(), "LLLL"),
      currentDay: format(getCurrentDate(), "d"),
    });
  }, []);

  useEffect(() => {
    console.log(date.month);
    const newDate = new Date(date.year, date.month);
    const lastDay = format(lastDayOfMonth(newDate), "d");
    const firstDay = format(newDate, "i");

    setQntDays(getArrayOfDays(lastDay, firstDay));
  }, [date.month]);

  const prevMonth = () => {
    if (!date.month) {
      setDate({ month: 11, year: date.year - 1 });
      return;
    }
    setDate({ ...date, month: date.month - 1 });
  };

  const nextMonth = () => {
    if (date.month === 11) {
      setDate({ month: 0, year: date.year + 1 });
      return;
    }
    setDate({ ...date, month: date.month + 1 });
  };

  const handlerBtnCurrentDate = () => {
    setDate({
      month: months.indexOf(currentDate.currentMonth),
      year: currentDate.currentYear,
    });
  };

  return (
    <div className="App">
      <Calendar
        days={qntDays}
        month={months[date.month]}
        year={date.year}
        currentDate={currentDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        handlerBtnCurrentDate={handlerBtnCurrentDate}
      />
      <Events />
    </div>
  );
}

export default App;

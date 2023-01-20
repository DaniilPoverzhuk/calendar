import { useEffect, useRef, useState } from "react";
import { getArrayOfDays, getCurrentDate } from "./helpers/helper";
import { format, getDaysInMonth, getISODay } from "date-fns";
import Calendar from "./components/Calendar/Calendar";
import Events from "./components/Events/Events";
import Context from "./context";

function App() {
  const [days, setDays] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [clickedDay, setClickedDay] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [date, setDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [currentDate, setCurrentDate] = useState({
    currentDay: null,
    currentMonth: null,
    currentYear: null,
  });
  const popup = useRef(null);

  useEffect(() => {
    setCurrentDate({
      currentDay: format(getCurrentDate(), "d"),
      currentMonth: format(getCurrentDate(), "LLLL"),
      currentYear: format(getCurrentDate(), "y"),
    });

    setClickedDay({
      day: +format(getCurrentDate(), "d"),
      month: +format(getCurrentDate(), "L") - 1,
      year: +format(getCurrentDate(), "y"),
    });

    setDate({
      ...date,
      month: +format(getCurrentDate(), "L") - 1,
      year: +format(getCurrentDate(), "y"),
    });
  }, []);

  useEffect(() => {
    const daysOfMonth = getDaysInMonth(new Date(date.year, date.month));
    const firstDayOfMonth = getISODay(new Date(date.year, date.month), "d");

    setDays(getArrayOfDays(firstDayOfMonth, daysOfMonth));
  }, [date.month]);

  const prevMonth = () => {
    if (!date.month) {
      setDate({ ...date, month: 11, year: date.year - 1 });
      return;
    }
    setDate({ ...date, month: date.month - 1 });
  };

  const nextMonth = () => {
    if (date.month === 11) {
      setDate({ ...date, month: 0, year: date.year + 1 });
      return;
    }
    setDate({ ...date, month: date.month + 1 });
  };

  const handlerSetCurrentDate = () => {
    setDate({
      ...date,
      month: +format(getCurrentDate(), "L") - 1,
      year: +format(getCurrentDate(), "y"),
    });
  };

  const handlerDay = (day) => {
    setClickedDay({ day, month: date.month, year: date.year });
    setDays(
      days.map((item) => {
        if (item && item.day === day) {
          return { ...item, status: true };
        }
        return { ...item, status: false };
      })
    );
  };

  return (
    <div className="App">
      <Context.Provider value={{ currentDate, date, handlerDay, popup }}>
        <Calendar
          days={days}
          date={date}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          handlerSetCurrentDate={handlerSetCurrentDate}
        />
        <Events clickedDay={clickedDay} tasks={tasks} setTasks={setTasks} />
      </Context.Provider>
    </div>
  );
}

export default App;

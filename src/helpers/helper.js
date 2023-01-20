import { months } from "../constants";

export const getArrayOfDays = (startDay, endDay) => {
  const result = [];
  for (let i = 0; i < startDay - 1; i++) {
    result.push(null);
  }
  for (let i = 1; i <= endDay; i++) {
    result.push({ day: i, status: false });
  }
  return result;
};

export const isToday = (currentDate, date, number) => {
  if (
    currentDate.currentDay == number &&
    currentDate.currentMonth == months[date.month] &&
    currentDate.currentYear == date.year
  ) {
    return true;
  }
  return false;
};

export const getCurrentDate = () => Date.now();

export const isCheck = (array, target) => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (JSON.stringify(item.date) === JSON.stringify(target)) {
      return true;
    }
  }
  return false;
};

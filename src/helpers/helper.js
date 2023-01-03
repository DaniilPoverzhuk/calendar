export const getArrayOfDays = (lastDayOfMonth, firstDayOfMonth) => {
  const result = [];

  for (let i = 0; i < firstDayOfMonth - 1 ; i++) {
    result.push(null);
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    result.push(i);
  }

  return result;
};
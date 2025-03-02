export const convertMin2HourMin = (min: number) => {
  const hour = Math.floor(min / 60);
  const minute = min % 60;
  return `${hour}h : ${minute}m`;
};

export const convertMin2HourFixed = (min: number) => {
  const hour = (min / 60).toFixed(2);
  return `${hour} hrs`;
};

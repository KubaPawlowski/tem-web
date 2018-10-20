export const secondsToDayHourSeconds = (input) => {
  const h = Math.floor(input / 3600);
  const m = Math.floor((input - (h * 3600)) / 60);
  const s = input - (h * 3600) - (m * 60);

  const padH = h < 10 ? 0 : '';
  const padM = m < 10 ? 0 : '';
  const padS = s < 10 ? 0 : '';

  return `${padH}${h}:${padM}${m}:${padS}${s}`;
};

export const getCurrentDate = (input) => {
  // outputs date in 20180218 format

  const fullCurrentTime = input || new Date();
  const currentYear = fullCurrentTime.getFullYear();
  const currentMonth = (fullCurrentTime.getMonth() + 1) < 10
    ? `0${fullCurrentTime.getMonth() + 1}`
    : fullCurrentTime.getMonth() + 1;
  const currentDay = fullCurrentTime.getDate() < 10
    ? `0${fullCurrentTime.getDate()}`
    : fullCurrentTime.getDate();
  const currentDate = `${currentYear}${currentMonth}${currentDay}`;

  return (currentDate.toString());
};

export const getHour = (input) => {
  // outputs miliseconds to 12:00 format
  const fullTime = new Date(parseInt(input, 10));
  const h = fullTime.getHours() < 10 ? `0${fullTime.getHours()}` : fullTime.getHours();
  const m = fullTime.getMinutes() < 10 ? `0${fullTime.getMinutes()}` : fullTime.getMinutes();
  return `${h}:${m}`;
};

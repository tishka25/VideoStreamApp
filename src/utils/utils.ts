import datetime from "./datetime";

export function getScreenshotUrl(cid: string | number, bid: string) {
  return `https://www.tvizio.bg/caps/rec_multi/${cid}_${bid}_1.png`;
}

export function getWeekDayString(date: Date) {
  if(isNaN(date.getTime())) return "";
  const weekDays = [
    "Неделя",
    "Понеделник",
    "Вторник",
    "Сряда",
    "Четвъртък",
    "Петък",
    "Събота",
  ];
  try {
    return weekDays[date.getDay()];
  } catch (e) {
    return "";
  }
}

export function getMonthString(dateString: string, hourString?: string) {
  const date = datetime.generateDate(dateString, hourString);
  if(isNaN(date.getTime())) return "";
  const monthStrings = [
    "Януару",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ];
  try {
    return monthStrings[date.getMonth()];
  } catch (error) {
    return "";
  }
}

export function getPrettyDateString(
  dateString: string,
  showTime = true,
  showYear = false,
  hourString = ""
) {
  const date = datetime.generateDate(dateString, hourString);
  if(isNaN(date.getTime())) return "";
  try {
    let day: any = date.getDate();
    if (day < 10) day = `0${day}`;
    return `${getWeekDayString(date)} ${day} ${getMonthString(
      dateString
    )} ${showYear ? date.getFullYear() : ""} ${
      showTime ? date.toTimeString().substr(0, 5) : ""
    }`;
  } catch (error) {
    return "";
  }
}
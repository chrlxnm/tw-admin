import { addDays, format } from "date-fns";

import { id } from "date-fns/locale";

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function getFiveNextDay() {
  const today = new Date();

  // Array to hold the names and dates
  const nextFiveDays = [];

  // Loop to generate the next 5 days
  for (let i = 0; i < 5; i++) {
    const nextDay = addDays(today, i);
    let formattedDate;
    if (i === 0) {
      formattedDate = `Hari ini ${format(nextDay, "dd/MM", { locale: id })}`;
    } else {
      formattedDate = format(nextDay, "eeee dd/MM", { locale: id });
    }
    nextFiveDays.push(formattedDate);
  }
  return nextFiveDays;
}

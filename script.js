const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function calendarCreator(allDays, startDay) {
  const days = [false, false, false, false, false, false, false];
  const cal = [[...days]];
  let s_index = startDay;
  let week = 0;
  for (let day = 0; day < allDays; day++) {
 
    cal[week][s_index] = day + 1;

    if (s_index === 6) {
      cal.push([...days]);
      week += 1;
      s_index = 0;
    } else {
      s_index += 1;
    }
  }
  console.log(cal)
  return cal;
}

const getallDaysForMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};

const getstartDayOfMonth = function (month, year) {
  return new Date(year, month - 1, 1).getDay(); // 0 - 6
};

const createCalendar = function (calendar) {
  const weeks = weekdays.map((val, index) => {
    return `<div class="day-cell"> ${val} </div> `;
  });
  const allWeeks = calendar.map((week) => {
    const allDays = week.map((day) => {
     
      return `<div id="day-${day ? day : ""}" class="day-cell"> ${
        day ? `<span> ${day}</span>` : ""
      } </div>`;
    });
   
    return `
                    <div class="week-row">
                        ${allDays.join("")}
                    </div>
                `;
  });
  allWeeks.unshift(`<div class="week-row">${weeks.join("")}</div>`);
  let htmlCalendar = allWeeks.join("");
  document.getElementById("calendar").innerHTML = htmlCalendar;
};

const toggleHighlightDate = (date) => {
  const dayCell = document.getElementById(`day-${date}`);
  if (dayCell) {
    if (dayCell.className.indexOf("active") > -1) {
      dayCell.className += "day-cell";
    } else dayCell.className += " active";
  }
};

const changeCalendarMonthYear = function (month, year) {
  const allDaysInMonth = getallDaysForMonth(month, year);
  const startDayInMonth = getstartDayOfMonth(month, year);
  console.log(allDaysInMonth,startDayInMonth)
  const calender = calendarCreator(allDaysInMonth, startDayInMonth);
  createCalendar(calender);
};

const initiateCalendar = () => {

  const monthsOptions = months
    .map((month, index) => `<option value="${index + 1}"> ${month} </option>`)
    .join("");
  
  let yearsOptions = "";
  for (let year = 1900; year < 2050; year++) {
    yearsOptions += `<option value="${year}">${year}</option>`;
  }
  document.getElementById("years").innerHTML = yearsOptions;
  document.getElementById("months").innerHTML = monthsOptions;

  const today = new Date();
  const currentYear = today.getFullYear();

  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  document.getElementById("years").value = currentYear;
  document.getElementById("months").value = currentMonth;
  
  changeCalendarMonthYear(currentMonth, currentYear);
  toggleHighlightDate(currentDate);

  window.selectedMonth = currentMonth;
  window.selectedYear = currentYear;
};

initiateCalendar();

document.getElementById("dateChangeHandler").addEventListener("click", () => {
  const dateVal = document.getElementById("enter_date").value;
  if (dateVal && !isNaN(dateVal)) {
    toggleHighlightDate(dateVal);
  }
});

document.getElementById("months").addEventListener("change", (event) => {
  window.selectedMonth = event.target.value;
  changeCalendarMonthYear(window.selectedMonth, window.selectedYear);
});

document.getElementById("years").addEventListener("change", (event) => {
  window.selectedYear = event.target.value;
  changeCalendarMonthYear(window.selectedMonth, window.selectedYear);
});
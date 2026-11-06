const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function findDays() {
  const dobValue = document.getElementById("dob").value;
  const count = parseInt(document.getElementById("years").value);
  const result = document.getElementById("result");

  if (!dobValue) {
    result.innerHTML = '<p class="error">Please select your date of birth.</p>';
    return;
  }

  // Split the date to avoid timezone problems
  const [year, month, day] = dobValue.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);

  let html = `<div class="born">You were born on a <b>${days[birthDate.getDay()]}</b>.</div>`;
  html += "<table><tr><th>Year</th><th>Age</th><th>Birthday Day</th></tr>";

  const today = new Date();
  let startYear = today.getFullYear();

  // If this year's birthday has already passed, start from next year
  const thisYearBirthday = new Date(startYear, month - 1, day);
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (thisYearBirthday < todayOnly) {
    startYear++;
  }

  for (let i = 0; i < count; i++) {
    const y = startYear + i;
    const d = new Date(y, month - 1, day);

    // 29 Feb on non-leap years: JavaScript moves it to 1 Mar
    const label = (month === 2 && day === 29 && d.getMonth() !== 1)
      ? days[d.getDay()] + " (1 Mar)"
      : days[d.getDay()];

    html += `<tr><td>${y}</td><td>${y - year}</td><td>${label}</td></tr>`;
  }

  html += "</table>";
  result.innerHTML = html;
}

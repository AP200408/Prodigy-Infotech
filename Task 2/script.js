const display = document.querySelector(".display");
const startPauseBtn = document.getElementById("startpause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

let timerInterval;
let milliseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;
let lapCounter = 1;

startPauseBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function startStop() {
  if (startPauseBtn.textContent === "Start") {
    startPauseBtn.textContent = "Stop";
    timerInterval = setInterval(updateTimer, 10);
  } else {
    startPauseBtn.textContent = "Start";
    clearInterval(timerInterval);
  }
}

function updateTimer() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  display.textContent =
    padNumber(hours) +
    ":" +
    padNumber(minutes) +
    ":" +
    padNumber(seconds) +
    ":" +
    padNumber(milliseconds, 2);
}

function lap() {
  let lapTime =
    padNumber(hours) +
    ":" +
    padNumber(minutes) +
    ":" +
    padNumber(seconds) +
    ":" +
    padNumber(milliseconds, 2);
  let lapItem = document.createElement("li");
  lapItem.textContent = "Lap " + lapCounter + ": " + lapTime;

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener("click", function () {
    lapsList.removeChild(lapItem);
  });

  lapItem.appendChild(deleteBtn);
  lapsList.appendChild(lapItem);
  lapCounter++;
}

function reset() {
  clearInterval(timerInterval);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapCounter = 1;
  display.textContent = "00:00:00:00";
  lapsList.innerHTML = "";
  startPauseBtn.textContent = "Start";
}

function padNumber(number, length = 2) {
  return String(number).padStart(length, "0");
}

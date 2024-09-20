let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let milliseconds = document.getElementById('milliseconds');

let lapsList = document.getElementById('lapsList');

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

startStopBtn.addEventListener('click', function () {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    minutes.textContent = '00';
    seconds.textContent = '00';
    milliseconds.textContent = '00';
    startStopBtn.textContent = 'Start';
    lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', function () {
    if (isRunning) {
        let lapTime = `${minutes.textContent}:${seconds.textContent}:${milliseconds.textContent}`;
        let li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let totalMilliseconds = elapsedTime % 1000;
    let totalSeconds = Math.floor(elapsedTime / 1000) % 60;
    let totalMinutes = Math.floor(elapsedTime / (1000 * 60));

    milliseconds.textContent = pad(totalMilliseconds, 2).slice(0, 2);
    seconds.textContent = pad(totalSeconds, 2);
    minutes.textContent = pad(totalMinutes, 2);
}

function pad(number, digits) {
    return number.toString().padStart(digits, '0');
}
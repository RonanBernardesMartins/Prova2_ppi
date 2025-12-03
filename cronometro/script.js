let startTime = 0; 
let elapsedTime = 0; 
let intervalId; 
let isRunning = false; 
let lapCounter = 0;

const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('miliseconds');

const startStopButton = document.getElementById('startBtn'); 
const restartBtn = document.getElementById('restartBtn'); 
const lapsList = document.getElementById('lapsList');


function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function updateDisplay() {
    if (isRunning) {
        elapsedTime = new Date().getTime() - startTime;
    }

    let time = elapsedTime;
    const ms = time % 1000;
    time = Math.floor(time / 1000); 
    const s = time % 60;
    time = Math.floor(time / 60); 
    const m = time % 60;

    displayMinutes.textContent = pad(m);
    displaySeconds.textContent = pad(s);
    displayMilliseconds.textContent = pad(ms, 3); 
}

function recordLap() {
    if (elapsedTime === 0 || !lapsList) return; 

    lapCounter++;

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const m = pad(Math.floor(totalSeconds / 60));
    const s = pad(totalSeconds % 60);
    const ms = pad(elapsedTime % 1000, 3);
    
    const lapTimeFormatted = `${m}:${s}:${ms}`;

    const listItem = document.createElement('li');
    
    listItem.innerHTML = `
        <span>${lapCounter}.</span>
        <span>${lapTimeFormatted}</span>
    `;
    
    lapsList.prepend(listItem);
}


function startStop() {
    if (!startStopButton) return; 

    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startStopButton.textContent = 'retomar'; 
        startStopButton.classList.remove('active');
    } else {
        startTime = new Date().getTime() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10);
        isRunning = true;
        startStopButton.textContent = 'parar'; 
        startStopButton.classList.add('active');
    }
}

function reset() {
    if (elapsedTime > 0) {
        recordLap();
    }
    
    clearInterval(intervalId);

    elapsedTime = 0;
    isRunning = false;
    displayMinutes.textContent = '00';
    displaySeconds.textContent = '00';
    displayMilliseconds.textContent = '000';

    if (startStopButton) {
        startStopButton.textContent = 'iniciar';
        startStopButton.classList.remove('active');
    }
}

if (startStopButton) {
    startStopButton.addEventListener('click', startStop);
}

if (restartBtn) {
    restartBtn.addEventListener('click', reset);
}

updateDisplay();
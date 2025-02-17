let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle');
const modeText = document.getElementById('mode-text');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');

let WORK_TIME = 25 * 60; // 25 minutes in seconds
let BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleMode() {
    // Stop the timer if it's running
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    toggleButton.textContent = isWorkTime ? 'Rest Time' : 'Work Time';
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            toggleMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
}

// Add event listener for toggle button
toggleButton.addEventListener('click', toggleMode);

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer);

// Add these event listeners after the other event listeners
workTimeInput.addEventListener('change', () => {
    const newTime = parseInt(workTimeInput.value);
    if (newTime >= 1 && newTime <= 60) {
        WORK_TIME = newTime * 60;
        if (isWorkTime && !timerId) {
            timeLeft = WORK_TIME;
            updateDisplay(timeLeft);
        }
    } else {
        workTimeInput.value = Math.min(Math.max(newTime, 1), 60);
    }
});

breakTimeInput.addEventListener('change', () => {
    const newTime = parseInt(breakTimeInput.value);
    if (newTime >= 1 && newTime <= 60) {
        BREAK_TIME = newTime * 60;
        if (!isWorkTime && !timerId) {
            timeLeft = BREAK_TIME;
            updateDisplay(timeLeft);
        }
    } else {
        breakTimeInput.value = Math.min(Math.max(newTime, 1), 60);
    }
});

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(timeLeft);
modeText.textContent = 'Work Time'; 
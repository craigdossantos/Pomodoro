let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle');
const modeText = document.getElementById('mode-text');
const addTimeButton = document.getElementById('add-time');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateTitle(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const mode = isWorkTime ? 'Work' : 'Break';
    document.title = `${timeString} - ${mode} - Pomodoro`;
}

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    updateTitle(timeLeft);
}

function toggleMode() {
    // Stop the timer if it's running
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        addTimeButton.disabled = true;
    }
    
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    toggleButton.textContent = isWorkTime ? 'Break' : 'Work';
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
            addTimeButton.disabled = true;
            toggleMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);

    startButton.textContent = 'Pause';
    addTimeButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
    addTimeButton.disabled = true;
    document.title = "Pomodoro Timer"; // Reset title when timer is reset
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes in seconds
    updateDisplay(timeLeft);
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
        addTimeButton.disabled = true;
    }
});

resetButton.addEventListener('click', resetTimer);
addTimeButton.addEventListener('click', addFiveMinutes);

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(timeLeft);
modeText.textContent = 'Work Time'; 
// script.js
let timer;
let seconds = 0;

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const exportButton = document.getElementById('exportButton');
const timerDisplay = document.getElementById('timer');
const logList = document.getElementById('logList');
let logs = []; // Array to store log entries

function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getCurrentDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return now.toLocaleString('en-US', options);
}

function exportToCSV() {
    if (logs.length === 0) return;

    // Prepare CSV content
    let csvContent = "data:text/csv;charset=utf-8,Date/Time,Duration\n";
    logs.forEach(log => {
        csvContent += `${log.dateTime},${log.duration}\n`;
    });

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'breathing_exercise_logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

startButton.addEventListener('click', () => {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
        startButton.textContent = 'Pause';
        resetButton.disabled = false;
    } else {
        clearInterval(timer);
        timer = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    const dateTime = getCurrentDateTime();
    const duration = timerDisplay.textContent;

    // Add log entry to the array and display in the list
    logs.push({ dateTime, duration });
    const logEntry = document.createElement('li');
    logEntry.textContent = `Completed exercise at ${dateTime} - Duration: ${duration}`;
    logList.appendChild(logEntry);

    // Enable export button
    exportButton.disabled = false;

    // Reset the timer
    seconds = 0;
    timerDisplay.textContent = '00:00';
    startButton.textContent = 'Start';
    resetButton.disabled = true;
});

exportButton.addEventListener('click', exportToCSV);


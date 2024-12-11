const alarmList = document.getElementById('alarmList').getElementsByTagName('tbody')[0];
const alarmDateInput = document.getElementById('alarmDate');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarm');
const countdownMinutesInput = document.getElementById('countdownMinutes');
const startCountdownButton = document.getElementById('startCountdown');
const countdownDisplay = document.getElementById('countdownDisplay');
const alarmSound = document.getElementById('alarmSound');

let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

function renderAlarms() {
    alarmList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const row = alarmList.insertRow();
        row.insertCell(0).textContent = alarm.date;
        row.insertCell(1).textContent = alarm.time;
        row.insertCell(2).innerHTML = `<button onclick="editAlarm(${index})">Process</button>`;
        row.insertCell(3).innerHTML = `<button onclick="deleteAlarm(${index})">Delet</button>`;
    });
}

function saveAlarms() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

function setAlarm() {
    const date = alarmDateInput.value;
    const time = alarmTimeInput.value;
    if (date && time) {
        alarms.push({ date, time });
        saveAlarms();
        renderAlarms();
    }
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    saveAlarms();
    renderAlarms();
}

function editAlarm(index) {
    const alarm = alarms[index];
    alarmDateInput.value = alarm.date;
    alarmTimeInput.value = alarm.time;
    deleteAlarm(index);
}

function startCountdown() {
    const minutes = parseInt(countdownMinutesInput.value);
    if (!isNaN(minutes)) {
        let time = minutes * 60;
        const countdownInterval = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time--;

            if (time < 0) {
                clearInterval(countdownInterval);
                countdownDisplay.textContent = 'තමානම්!';
                alarmSound.play();
            }
        }, 1000);
    }
}

setAlarmButton.addEventListener('click', setAlarm);
startCountdownButton.addEventListener('click', startCountdown);
renderAlarms();

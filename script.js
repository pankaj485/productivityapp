/* ================================================================= */
/* =======================   SECTION 1  =============================*/
/* ================================================================= */

let presentTime = new Date();
let timeZone = presentTime.toString().split(' ')[5];
let geographicZone =
	presentTime.toString().split(' ')[6] + ' ' + presentTime.toString().split(' ')[7] + ' ' + presentTime.toString().split(' ')[8];

let toAppendTimeZone = `${timeZone} ${geographicZone}`;
document.getElementById('sectionOneTimeZOne').innerHTML = toAppendTimeZone;

// let soundEffect = new Audio();
// soundEffect.src = './clockTicle.mp3';

let digitalWatch = setInterval(myTimer, 1000);
function myTimer() {
	let currentTime = new Date();
	let sepratedTime = currentTime.toLocaleTimeString().split(':');
	let hours = sepratedTime[0];
	let minutes = sepratedTime[1];
	let seconds = sepratedTime[2].split(' ')[0];
	document.getElementById('hours').childNodes[1].innerHTML = hours;
	document.getElementById('minutes').childNodes[1].innerHTML = minutes;
	// soundEffect.play();
	document.getElementById('seconds').childNodes[1].innerHTML = seconds;
}

/* ================================================================= */
/* =======================   SECTION 2  =============================*/
/* ================================================================= */

let timerInputHour = document.getElementById('timerInputs').childNodes[1].childNodes[1];
let timerInputMins = document.getElementById('timerInputs').childNodes[3].childNodes[1];
let timerInputSecs = document.getElementById('timerInputs').childNodes[5].childNodes[1];
let timerToShow = document.getElementById('timerContentInfo');
document.getElementById('sectionTwoTimerStart').addEventListener('click', (event) => {
	event.preventDefault();
	let hours = timerInputHour.value ? parseInt(timerInputHour.value) : 0;
	let minutes = timerInputMins.value ? parseInt(timerInputMins.value) : 0;
	let seconds = timerInputSecs.value ? parseInt(timerInputSecs.value) : 0;
	let totalInputSeconds = hours * 3600 + minutes * 60 + seconds;
	console.log(totalInputSeconds);

	let showTimer = setInterval(() => {
		if (totalInputSeconds >= 0) {
			let timerHours = Math.floor(totalInputSeconds / 3600);
			let timerMinutes = Math.floor((totalInputSeconds % 3600) / 60);
			let timerSeconds = Math.floor((totalInputSeconds % 3600) % 60);

			timerSeconds = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds;
			timerMinutes = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes;

			timerToShow.innerHTML = `${timerHours}:${timerMinutes}:${timerSeconds}`;
			totalInputSeconds--;
		} else if (!totalInputSeconds) {
			clearInterval(showTimer);
			alert('give input');
		} else {
			clearFields();
			timerToShow.innerHTML = `TIME UP `;

			let flashTimerInfo = setTimeout(() => {
				timerToShow.classList.toggle('timeUp');
				clearTimeout(flashTimerInfo);
			}, 3000);
			timerToShow.classList.toggle('timeUp');
		}
	}, 1000);

	document.getElementById('sectionTwoTimerReset').addEventListener('click', () => {
		clearInterval(showTimer);
		clearFields();
	});

	function clearFields() {
		clearInterval(showTimer);
		document.getElementById('timerInputs').childNodes[1].childNodes[1].value = '';
		document.getElementById('timerInputs').childNodes[3].childNodes[1].value = '';
		document.getElementById('timerInputs').childNodes[5].childNodes[1].value = '';
		totalInputSeconds = parseInt(1);
		timerToShow.innerHTML = 'HH : MM : SS';
	}
});

/* ================================================================= */
/* =======================   SECTION 3  =============================*/
/* ================================================================= */

let pomodoroInputWorkTime = document.getElementById('pomodoroInputs').childNodes[1].childNodes[3];
let pomodoroInputRestTime = document.getElementById('pomodoroInputs').childNodes[3].childNodes[5];
let pomodoroToShow = document.getElementById('pomodoroTimer');
let worktype = document.getElementById('worktype');

document.getElementById('pomodoroStartButton').addEventListener('click', (event) => {
	event.preventDefault();
	let pomodoroTotalWorkTime = pomodoroInputWorkTime.value ? parseInt(pomodoroInputWorkTime.value * 60) : 0;
	let pomodoroTotalRestTime = pomodoroInputRestTime.value ? parseInt(pomodoroInputRestTime.value * 60) : 0;
	console.log(pomodoroTotalWorkTime);
	console.log(pomodoroTotalRestTime);
	let workTimeEnded = false;

	// console.log(pomodoroTotalWorkTime);
	// console.log(pomodoroTotalRestTime);

	function executeWorkTimer() {
		if (pomodoroTotalWorkTime >= 0) {
			let timerHours = Math.floor(pomodoroTotalWorkTime / 3600);
			let timerMinutes = Math.floor((pomodoroTotalWorkTime % 3600) / 60);
			let timerSeconds = Math.floor((pomodoroTotalWorkTime % 3600) % 60);

			timerSeconds = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds;
			timerMinutes = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes;

			pomodoroToShow.innerHTML = `${timerHours}:${timerMinutes}:${timerSeconds}`;
			worktype.innerHTML = `WORK TIME `;
			pomodoroTotalWorkTime--;
		} else if (!pomodoroTotalWorkTime) {
			clearPomodoroFields();
			alert('give input');
		} else {
			let flashTimerInfoPomodoro = setTimeout(() => {
				pomodoroToShow.innerHTML = `WORK TIME UP `;
				pomodoroToShow.classList.toggle('timeUp');
				clearTimeout(flashTimerInfoPomodoro);
			}, 3000);
			pomodoroToShow.classList.toggle('timeUp');
			executeRestTimer();
		}
	}

	function executeRestTimer() {
		if (pomodoroTotalRestTime >= 0) {
			let timerHours = Math.floor(pomodoroTotalRestTime / 3600);
			let timerMinutes = Math.floor((pomodoroTotalRestTime % 3600) / 60);
			let timerSeconds = Math.floor((pomodoroTotalRestTime % 3600) % 60);

			timerSeconds = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds;
			timerMinutes = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes;

			pomodoroToShow.innerHTML = `${timerHours}:${timerMinutes}:${timerSeconds}`;
			worktype.innerHTML = `REST TIME `;
			pomodoroTotalRestTime--;
		} else if (!pomodoroTotalRestTime) {
			clearPomodoroFields();
			alert('give input');
		} else {
			let flashTimerInfoPomodoro = setTimeout(() => {
				pomodoroToShow.innerHTML = `REST TIME UP `;
				pomodoroToShow.classList.toggle('timeUp');
				clearTimeout(flashTimerInfoPomodoro);
			}, 3000);
			pomodoroToShow.classList.toggle('timeUp');
			clearPomodoroFields();
		}
	}

	function clearPomodoroFields() {
		clearInterval(showPomodoroTimer);
		document.getElementById('pomodoroInputs').childNodes[1].childNodes[3].value = '';
		document.getElementById('pomodoroInputs').childNodes[3].childNodes[5].value = '';
		pomodoroTotalWorkTime = parseInt(1);
		pomodoroTotalRestTime = parseInt(1);
		pomodoroToShow.innerHTML = 'HH : MM : SS';
		worktype.innerHTML = '';
	}

	let showPomodoroTimer = setInterval(() => {
		executeWorkTimer();
		// executeRestTimer();
	}, 1000);

	document.getElementById('pomodoroResetButton').addEventListener('click', (event) => {
		event.preventDefault();
		clearInterval(showPomodoroTimer);
		clearPomodoroFields();
	});
});

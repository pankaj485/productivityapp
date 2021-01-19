/* ================================================================= */
/* =======================   SECTION 1  =============================*/
/* ================================================================= */

let presentTime = new Date();
let timeZone = presentTime.toString().split(' ')[5];
let toAppendTimeZone = `${timeZone} `;
document.getElementById('sectionOneTimeZOne').innerHTML = toAppendTimeZone;

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

document.getElementById('pomodoroStartButton').addEventListener('click', (event) => {
	event.preventDefault();
	let pomodoroInputWork = document.getElementById('pomodoroInputWorkMinutes').value;
	let pomodoroInputRest = document.getElementById('pomodoroInputRestMinutes').value;

	pomodoroInputWork = pomodoroInputWork ? parseInt(pomodoroInputWork) : 0;
	pomodoroInputRest = pomodoroInputRest ? parseInt(pomodoroInputRest) : 0;

	console.log(pomodoroInputRest);
	let workTimeInSecs = pomodoroInputWork * 60;
	let restTimeInSecs = pomodoroInputRest * 60;

	let workTime = setInterval(() => {
		if (workTimeInSecs >= 0) {
			let hours = Math.floor(workTimeInSecs / 3600);
			let mins = Math.floor((workTimeInSecs % 3600) / 60);
			let secs = Math.floor((workTimeInSecs % 3600) % 60);

			mins = mins < 10 ? '0' + mins : mins;
			secs = secs < 10 ? '0' + secs : secs;

			document.getElementById('worktype').innerHTML = 'WORK TIME';
			document.getElementById('pomodoroTimer').innerHTML = `${hours}:${mins}:${secs}`;
			workTimeInSecs--;
		} else if (!workTimeInSecs) {
			console.log('something wrong ');
		} else {
			document.getElementById('pomodoroTimer').innerHTML = `TIME UP !!`;
			clearInterval(workTime);
			setTimeout(() => {
				let restTime = setInterval(() => {
					if (restTimeInSecs >= 0) {
						let hours = Math.floor(restTimeInSecs / 3600);
						let mins = Math.floor((restTimeInSecs % 3600) / 60);
						let secs = Math.floor((restTimeInSecs % 3600) % 60);

						mins = mins < 10 ? '0' + mins : mins;
						secs = secs < 10 ? '0' + secs : secs;
						document.getElementById('worktype').innerHTML = 'REST TIME';
						document.getElementById('pomodoroTimer').innerHTML = `${hours}:${mins}:${secs}`;
						restTimeInSecs--;
					} else if (!restTimeInSecs) {
						console.log('something wrong ');
					} else {
						document.getElementById('pomodoroTimer').innerHTML = `TIME UP !!`;
						clearPomodoroFields();
						clearInterval(restTime);
					}
				}, 1000);
			}, 1000);
		}
	}, 1000);

	function clearPomodoroFields() {
		workTimeInSecs = 0;
		restTimeInSecs = 0;
		document.getElementById('worktype').innerHTML = 'SESSION ENDED';
		document.getElementById('pomodoroTimer').innerHTML = 'HH : MM : SS';
		document.getElementById('pomodoroInputWorkMinutes').value = '';
		document.getElementById('pomodoroInputRestMinutes').value = '';
	}

	document.getElementById('pomodoroResetButton').addEventListener('click', () => {
		clearInterval(workTime);
		clearPomodoroFields();
	});
});

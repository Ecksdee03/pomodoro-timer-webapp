
const timer = {
	pomodoro: 25,
	shortBreak: 5,
	longBreak: 20,
	//the below properties are used to check if 4 pomodoro sessions have passed
	longBreakInterval: 4,
	sessions: 0,
};

const music = new Audio('button-sound.mp3');
const modeButtons = document.querySelector(".mode-buttons");
modeButtons.addEventListener("click", handleMode);

const startButton = document.querySelector(".main-button");
startButton.addEventListener("click", async () => {
	music.play();
	if (startButton.dataset.action === "start") {
		startTimer();
	}

	else {
		stopTimer();
	}
});

const progressBar = document.getElementById("js-progress");

var interval;

function getRemainingTime(endTime) {
	const now = Date.parse(new Date());
	const distance = endTime - now;

	const total = Number.parseInt(distance / 1000, 10);
	const seconds =  Number.parseInt(total % 60, 10);
	const minutes = Number.parseInt((total - seconds) / 60, 10);


	return {
		total,
		minutes,
		seconds,
	};
};
function startTimer () {
	let { total } = timer.remainingTime;
	//gets exact time in future the session will end
	const endTime = Date.parse(new Date()) + total * 1000;

	if (timer.mode == "pomodoro") {
		timer.sessions++;
	}

	startButton.dataset.action = "stop";
	startButton.textContent = "Stop";
	startButton.classList.add("active");
	//executes the callback function every 1000ms/1s
	interval = setInterval(function () {
		timer.remainingTime = getRemainingTime(endTime);
		updateClock();

		let total = timer.remainingTime.total;
		if (total <= 0) {
			clearInterval(interval);
			//shorturl.at/mnG35
			 switch (timer.mode) {
			 	case 'pomodoro' :
			 	//this checks if 4 pomodoro sessions have passed & auto starts next session
			 		if (timer.sessions % timer.longBreakInterval == 0) {
			 			switchMode("longBreak");
			 		}

			 		else {
			 			switchMode("shortBreak");
			 		}
			 		break;
			 	default:
			 		switchMode("pomodoro");
			 }

  			if (Notification.permission === 'granted') {
  				const text = timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
  				new Notification(text);
  			}
			
			document.querySelector(`[data-sound="${timer.mode}"]`).play();
			startTimer();
		}
	}, 1000);
};

function stopTimer () {

	startButton.dataset.action = "start";
	startButton.textContent = "Start";
	startButton.classList.remove("active");
	let total = timer.remainingTime.total;
	clearInterval(interval);
};

function updateClock() {
	//this injects properties of the timer object into new var remainingTime
	const { remainingTime } = timer;
	//pads with zeroes where necessary and number always has width of 2
	// `` is used for so object properties won't display as plaintext on front-end
	//this extracts out value of minutes and seconds properties from remainingTime object
	const minutes = `${remainingTime.minutes}`.padStart(2,'0');
	const seconds = `${remainingTime.seconds}`.padStart(2,'0');
	min = document.getElementById('js-minutes');
	sec = document.getElementById('js-seconds');
	min.textContent = minutes;
	sec.textContent = seconds;
	progressBar.value = timer[timer.mode] * 60 - remainingTime.total;
	const text = timer.mode == 'pomodoro'? 'Get back to work' : 'Take a break';
	document.title = `${minutes}: ${seconds}- ${text}`;

};

function switchMode(mode){
	//adds mode and remainingTime properties to timer object
	timer.mode = mode;
	timer.remainingTime = {
		//[] is used for denoting object property as a variable		
		total: timer[mode] * 60,
		minutes: timer[mode],
		seconds: 0,
	};

	//removes active class on all mode buttons except the one clicked & changes background color
	document.querySelectorAll('.mode-button').forEach(e => e.classList.remove('active'));
	//https://www.codecademy.com/courses/introduction-to-javascript/lessons/variables/exercises/string-interpolation-ii
	document.querySelector("[data-mode=" + mode + "]").classList.add('active');
	document.body.style.backgroundColor = `var(--${mode})`;
	progressBar.setAttribute('max', timer.remainingTime.total);

	updateClock();
};

function handleMode(event) {
	//fetches value of data attribute from the target element
	//curly brackets around var allow it to be used as different modes 
	const {mode} = event.target.dataset;

	if (!mode) return;

	switchMode(mode);
	stopTimer();

};

//initialise default mode and remainingTime properties of timer object
document.addEventListener("DOMContentLoaded", () => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // we need to check and ask the user for permission first
  if (Notification.permission !== "denied" && Notification.permission !== "granted") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification('Awesome! You will be notified at the start of each session!');
      }
    });
  }	

	switchMode("pomodoro");
});


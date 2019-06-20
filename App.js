//Listening for the game to load
window.addEventListener("load", init);

//currentLevel holds time, def 5 sec
let currentLevel = 55;

//Global Variables
let time = currentLevel; //time per word

let score = 0; //current score
let highscore = localStorage.getItem("highscore") || 1; //high score

let isPlaying; //boolean for state

//Grabbing DOM elements
const wordInput = document.querySelector("#wordInput");

const currentWord = document.querySelector("#currentWord");

const scoreDisplay = document.querySelector("#scoreDisplay");

const highscoreDisplay = document.querySelector("#highscoreDisplay");
highscoreDisplay.innerHTML = highscore; //setting score display to score

const timeDisplay = document.querySelector("#timeDisplay");

const message = document.querySelector("#message");

const seconds = document.querySelector("#seconds");

const diff = document.querySelector("#diffdiv");

//Array of words, later will be replaced by some more words
let words = [
	"hat",
	"river",
	"lucky",
	"statue",
	"generate",
	"stubborn",
	"cocktail",
	"runaway",
	"joke",
	"developer",
	"establishment",
	"hero",
	"javascript",
	"nutrition",
	"revolver",
	"echo",
	"siblings",
	"investigate",
	"horrendous",
	"symptom",
	"laughter",
	"magic",
	"master",
	"space",
	"definition"
];

async function getWords() {
	fetch("assets/eng-words.txt")
		.then(response => response.text())
		.then(text => (words = text.split("\n")));
}

//Initialize the game
function init() {
	//fetch words from file
	getWords();

	//Load word from array
	showWord(words);

	//Start matching on input
	wordInput.addEventListener("input", startMatch);

	//Call countdown every sec
	setInterval(countdown, 100);

	//Check game state every 50 millisecs
	setInterval(checkState, 50);

	//logging initialization
	console.log("inintialized");

	// timeDisplay.innerHTML = currentLevel;
	// seconds.innerHTML = (currentLevel / 10).toFixed(1);
}

//displays a random word from the word array
function showWord(words) {
	currentWord.innerHTML = words[Math.floor(Math.random() * words.length)];
}

//Change level function
function changeLevel(lvl) {
	switch (lvl) {
		case 55:
			currentLevel = 55;
			var elems = document.querySelectorAll(".disabled");
			[].forEach.call(elems, function(el) {
				el.classList.remove("disabled");
				el.className = "btn cyan waves-effect waves-orange";
			});
			document.querySelector("#diff1").className =
				"btn cyan waves-effect waves-orange disabled";
			wordInput.type = "text";
			break;

		case 40:
			currentLevel = 40;
			var elems = document.querySelectorAll(".disabled");
			[].forEach.call(elems, function(el) {
				el.classList.remove("disabled");
				el.className = "btn cyan waves-effect waves-orange";
			});
			document.querySelector("#diff2").className =
				"btn cyan waves-effect waves-orange disabled";
			wordInput.type = "text";
			break;

		case 25:
			currentLevel = 25;
			var elems = document.querySelectorAll(".disabled");
			[].forEach.call(elems, function(el) {
				el.className = "btn cyan waves-effect waves-orange";

				el.classList.remove("disabled");
			});
			document.querySelector("#diff3").className =
				"btn cyan waves-effect waves-orange disabled";
			wordInput.type = "text";
			break;

		case 20:
			currentLevel = 20;
			var elems = document.querySelectorAll(".disabled");
			[].forEach.call(elems, function(el) {
				el.classList.remove("disabled");

				el.className = "btn cyan waves-effect waves-orange";
			});
			document.querySelector("#diff4").className =
				"btn cyan waves-effect waves-orange disabled";

			//ninja settings
			wordInput.type = "password";

			break;

		default:
			break;
	}
	console.log("time manipulation: " + lvl);
	time = currentLevel;
	seconds.innerHTML = (currentLevel / 10).toFixed(1);
	timeDisplay.innerHTML = currentLevel;
}

//function to manage countdown and timeDisplay and game over
function countdown() {
	//Check if time is remaining
	if (time) {
		//reduce time every second
		time--;
	} else if (time == 0) {
		//time 0 means game over
		isPlaying = false; //changing game state to over
	}

	//Show time
	timeDisplay.innerHTML = (time / 10).toFixed(1);
}

//Check game state every 50 msecs
function checkState() {
	if (!isPlaying && time === 0) {
		// alert("Game Over :( ");

		wordInput.placeholder = "Type to restart";

		//Resetting scores
		score = -1;
		scoreDisplay.innerHTML = 0;
	}
}

//Start matching every letter to given word
function startMatch() {
	if (matchWord()) {
		wordInput.placeholder = "Start typing..";

		//for next word
		isPlaying = true;
		timeDisplay.innerHTML = Math.floor(currentLevel / 10).toFixed(1);
		time = currentLevel;

		showWord(words);
		wordInput.value = "";
		score++;
		//updating highscore
		if (score > highscore) {
			highscore = score;
			localStorage.setItem("highscore", score);
			highscoreDisplay.innerHTML = highscore;
		}
	}
	if (score > highscore) {
		highscore = score;
		localStorage.setItem("highscore", score);
		highscoreDisplay.innerHTML = highscore;
	}
	if (score < 0) scoreDisplay.innerHTML = 0;
	else scoreDisplay.innerHTML = score;
}

//matchWord function checks if the user has finished typing the correct input
function matchWord() {
	if (wordInput.value === currentWord.innerHTML) {
		//logging a completed word with time
		console.log(
			"Typed " +
				currentWord.innerHTML.toUpperCase() +
				" in " +
				(currentLevel - time) / 10 +
				" seconds!"
		);
		message.innerHTML =
			"Typed " +
			currentWord.innerHTML.toUpperCase() +
			" in " +
			(currentLevel - time) / 10 +
			" seconds!";

		// console.log("Typed in " + (currentLevel - time) / 10 + " secs!");
		return true;
	} else {
		return false;
	}
}

//exp

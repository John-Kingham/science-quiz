/* jshint esversion: 11 */

// Global variables for DOM elements
const rootEl = document.documentElement;
const welcomeTxtEl = document.querySelector("#welcome-txt");
const instructionsTxtEl = document.querySelector("#instructions-txt");
const gameAreaEl = document.querySelector("#game-area");
const questionTxtEl = document.querySelector("#question-txt");
const feedbackTxtEl = document.querySelector("#feedback-txt");
const answerBtnsEl = document.querySelector("#answer-btns");
const playBtnEl = document.querySelector("#play-btn");
const instructionsBtnEl = document.querySelector("#instructions-btn");
const fiftyBtnEl = document.querySelector("#fifty-btn");
const askBtnEl = document.querySelector("#ask-btn");
const phoneBtnEl = document.querySelector("#phone-btn");
const playAgainBtnEl = document.querySelector("#play-again");
const secondaryColor = getComputedStyle(rootEl)
    .getPropertyValue("--secondary-color")
    .trim();
const greenColor = getComputedStyle(rootEl).getPropertyValue("--green").trim();
const scores = [
    1000000, 500000, 250000, 125000, 64000, 32000, 16000, 8000, 4000, 1000,
];
const answerBtnElsArr = Array.from(answerBtnsEl.children);
let questions;
let currentQuestion;
let score = 0;

loadQuestions();
addEventListeners();

/**
 * Add event listeners to buttons.
 */
function addEventListeners() {
    instructionsBtnEl.addEventListener("click", showInstructions);
    playAgainBtnEl.addEventListener("click", reloadPage);
    playBtnEl.addEventListener("click", startGame);
    fiftyBtnEl.addEventListener("click", fiftyFifty);
    askBtnEl.addEventListener("click", askTheInternet);
    phoneBtnEl.addEventListener("click", phoneAScientist);
    for (const answerBtnEl of answerBtnsEl.children) {
        answerBtnEl.addEventListener("click", respondToAnswer);
    }
}

/**
 * Use the Ask The Internet lifeline.
 */
function askTheInternet() {
    feedbackTxtEl.innerHTML =
        "The green bars represent votes from the Internet. But beware, the Internet is not always right!";
    askBtnEl.classList.add("disabled");
    answerBtnMode("ask");
}

/**
 * Use the 50/50 lifeline.
 */
function fiftyFifty() {
    feedbackTxtEl.innerHTML =
        "Two answers have been deactivated. Choose from the remaining two...";
    fiftyBtnEl.classList.add("disabled");
    answerBtnMode("50/50");
}

/**
 * Use the Phone a Scientist lifeline.
 */
function phoneAScientist() {
    feedbackTxtEl.innerHTML =
        "The scientist's answer is in blue, but remember, scientists are not always right!";
    phoneBtnEl.classList.add("disabled");
    answerBtnMode("phone");
}

/**
 * Load the multi-choice questions and answers.
 */
function loadQuestions() {
    fetch(
        "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error with status: ${response.status}`);
            }
        })
        .then((json) => {
            questions = json.results;
            showNextQuestion();
        })
        .catch((error) => {
            console.log(error);
            alert(
                "Error! Failed to load questions. Please refresh the page and try again."
            );
        });
}

/**
 * Respond to the user's answer.
 *
 * @param {Event} event
 */
function respondToAnswer(event) {
    const answerBtnEl = event.target;

    answerBtnMode("normal");
    if (isCorrect(answerBtnEl)) {
        score = scores.pop();
        feedbackTxtEl.innerHTML = `<em>Correct! You now have ${score.toLocaleString()} points!</em>`;
        answerBtnEl.classList.add("green");
        if (questions.length) {
            setTimeout(showNextQuestion, 2000);
        } else {
            feedbackTxtEl.innerHTML += `<em>&nbsp;That means you've answered every question correctly, so you are a true champion of science!</em>`;
            displayMode("end");
        }
    } else {
        answerBtnEl.classList.add("red");
        feedbackTxtEl.innerHTML = `<em>Wrong! The correct answer was: ${
            currentQuestion.correct_answer
        }.&nbsp;
            That means it's game over and your final score was ${score.toLocaleString()} points!</em>`;
        displayMode("end");
    }
}

/**
 * Reload the page to start a new game.
 */
function reloadPage() {
    window.location.reload();
}

/**
 * Set the game's display mode.
 *
 * @param {String} mode - 'instructions', 'game', 'end'
 */
function displayMode(mode) {
    switch (mode) {
        case "instructions":
            welcomeTxtEl.classList.add("hidden");
            instructionsBtnEl.classList.add("hidden");
            instructionsTxtEl.classList.remove("hidden");
            gameAreaEl.classList.add("hidden");
            break;
        case "game":
            // hide non-game content
            welcomeTxtEl.classList.add("hidden");
            instructionsTxtEl.classList.add("hidden");
            playBtnEl.classList.add("hidden");
            instructionsBtnEl.classList.add("hidden");
            // show the game panel and buttons
            gameAreaEl.classList.remove("hidden");
            fiftyBtnEl.classList.remove("hidden");
            askBtnEl.classList.remove("hidden");
            phoneBtnEl.classList.remove("hidden");
            break;
        case "end":
            // hide the game buttons
            fiftyBtnEl.classList.add("hidden");
            askBtnEl.classList.add("hidden");
            phoneBtnEl.classList.add("hidden");
            // show the Play Again button
            playAgainBtnEl.classList.remove("hidden");
    }
}

/**
 * Set the display mode of the answer buttons.
 *
 * @param {String} mode - 'normal', '50/50', 'ask'
 */
function answerBtnMode(mode) {
    switch (mode) {
        case "normal":
            for (const btn of answerBtnsEl.children) {
                btn.classList.remove("disabled", "blue-border");
                btn.style.background = "";
            }
            break;
        case "50/50":
            // disable all incorrect answer button
            for (const btn of answerBtnsEl.children) {
                if (!isCorrect(btn)) {
                    btn.classList.add("disabled");
                }
            }
            // re-enable one incorrect answer button
            randomIncorrectAnswer(false).classList.remove("disabled");
            break;
        case "ask":
            // calculate how many votes the correct answer got
            let remainingVotes = 100;
            let vote = Math.floor(Math.random() * remainingVotes);
            remainingVotes -= vote;
            for (const btn of answerBtnsEl.children) {
                if (isCorrect(btn)) {
                    btn.style.background = `linear-gradient(to right, ${greenColor} ${vote}%, ${secondaryColor} ${vote}%`;
                    break;
                }
            }
            // calculate how many votes the incorrect answers got
            for (const btn of answerBtnsEl.children) {
                if (!isCorrect(btn)) {
                    vote = Math.floor(Math.random() * remainingVotes);
                    remainingVotes -= vote;
                    btn.style.background = `linear-gradient(to right, ${greenColor} ${vote}%, ${secondaryColor} ${vote}%`;
                }
            }
            break;
        case "phone":
            // the scientist is right 75% of the time
            if (Math.random() > 0.25) {
                // highlight the correct answer
                for (const btn of answerBtnsEl.children) {
                    if (isCorrect(btn)) {
                        btn.classList.add("blue-border");
                        break;
                    }
                }
            } else {
                // highlight a random incorrect answer that is still active
                randomIncorrectAnswer(true).classList.add("blue-border");
            }
            break;
    }
}

/**
 * Only show the instructions panel.
 */
function showInstructions() {
    displayMode("instructions");
}

/**
 * Show the next question.
 */
function showNextQuestion() {
    const answers = [];

    // update screen with next question
    currentQuestion = questions.pop();
    questionTxtEl.innerHTML = currentQuestion.question;
    feedbackTxtEl.innerHTML = "&nbsp;";

    // update answer buttons with answers
    answers.push(currentQuestion.correct_answer);
    for (const incorrectAnswer of currentQuestion.incorrect_answers) {
        answers.push(incorrectAnswer);
    }
    answers.sort(); // sort to randomise
    for (let i = 0; i < answers.length; i++) {
        answerBtnsEl.children[i].innerHTML = answers[i];
        answerBtnsEl.children[i].classList.remove("green", "red");
    }
    answerBtnMode("normal");
}

/**
 * Start the game.
 */
function startGame() {
    displayMode("game");
}

/**
 * Check if the user's answer is correct.
 *
 * @param {HTMLButtonElement} button The answer button clicked by the user
 * @return {boolean} 'true' if the answer is correct, otherwise 'false'
 */
function isCorrect(button) {
    return button.innerHTML === currentQuestion.correct_answer;
}

/**
 * Get a random incorrect answer button.
 *
 * @param {boolean} mustBeActive Whether the button must be active (not disabled)
 * @return {HTMLButtonElement} A random incorrect answer button
 */
function randomIncorrectAnswer(mustBeActive) {
    const isIncorrect = (btn) => !isCorrect(btn);
    const isIncorrectAndActive = (btn) => {
        return !isCorrect(btn) && !btn.classList.contains("disabled");
    };
    let incorrectBtns;
    if (mustBeActive) {
        incorrectBtns = answerBtnElsArr.filter(isIncorrectAndActive);
    } else {
        incorrectBtns = answerBtnElsArr.filter(isIncorrect);
    }
    return incorrectBtns[Math.floor(Math.random() * incorrectBtns.length)];
}

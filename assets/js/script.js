// Global variables for DOM elements
const welcomeTxt = document.querySelector("#welcome-txt");
const instructionsTxt = document.querySelector("#instructions-txt");
const gameArea = document.querySelector("#game-area");
const questionTxt = document.querySelector("#question-txt");
const feedbackTxt = document.querySelector("#feedback-txt");
const answerBtns = document.querySelector("#answer-btns");
const playBtn = document.querySelector("#play-btn");
const instructionsBtn = document.querySelector("#instructions-btn");
const fiftyBtn = document.querySelector("#fifty-btn");
const askBtn = document.querySelector("#ask-btn");
const phoneBtn = document.querySelector("#phone-btn");
const playAgainBtn = document.querySelector("#play-again");

let questions;
let currentQuestion;
let score = 0;
let scores = [
    1000000, 500000, 250000, 125000, 64000, 32000, 16000, 8000, 4000, 1000,
];

loadQuestions();
addEventListeners();

/**
 * Add event listeners to buttons
 */
function addEventListeners() {
    instructionsBtn.addEventListener("click", showInstructions);
    playAgainBtn.addEventListener("click", reloadPage);
    playBtn.addEventListener("click", startGame);
    for (const answerBtn of answerBtns.children) {
        answerBtn.addEventListener("click", respondToAnswer);
    }
}

/**
 * Load questions (and answers)
 */
function loadQuestions() {
    fetch(
        "https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=multiple"
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
 * Respond to the user's answer
 *
 * @param {Event} event
 */
function respondToAnswer(event) {
    const button = event.target;

    if (button.innerText === currentQuestion.correct_answer) {
        score = scores.pop();
        feedbackTxt.innerHTML = `<em>Correct! You now have ${score} points!</em>`;
        button.classList.add("green");
        if (questions.length) {
            setTimeout(showNextQuestion, 2000);
        } else {
            feedbackTxt.innerHTML += `<em>&nbsp;That means you've answered every question correctly, so you are a true champion of science!</em>`;
            displayMode("end");
        }
    } else {
        button.classList.add("red");
        feedbackTxt.innerHTML = `<em>Wrong! The correct answer was: ${currentQuestion.correct_answer}.&nbsp;
            That means it's game over and your final score was ${score} points!</em>`;
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
 * Sets the game's display mode.
 *
 * @param {String} mode - 'instructions', 'game' or 'end'
 */
function displayMode(mode) {
    switch (mode) {
        case "instructions":
            welcomeTxt.classList.add("hidden");
            instructionsBtn.classList.add("hidden");
            instructionsTxt.classList.remove("hidden");
            gameArea.classList.add("hidden");
            break;
        case "game":
            // hide non-game content
            welcomeTxt.classList.add("hidden");
            instructionsTxt.classList.add("hidden");
            playBtn.classList.add("hidden");
            instructionsBtn.classList.add("hidden");
            // show the game panel and buttons
            gameArea.classList.remove("hidden");
            fiftyBtn.classList.remove("hidden");
            askBtn.classList.remove("hidden");
            phoneBtn.classList.remove("hidden");
            break;
        case "end":
            // hide the game buttons
            fiftyBtn.classList.add("hidden");
            askBtn.classList.add("hidden");
            phoneBtn.classList.add("hidden");
            // show the Play Again button
            playAgainBtn.classList.remove("hidden");
    }
}

/**
 * Only show the instructions panel
 */
function showInstructions() {
    displayMode("instructions");
}

/**
 * Show the next question
 */
function showNextQuestion() {
    let answers = [];

    // update screen with next question
    currentQuestion = questions.pop();
    questionTxt.innerHTML = currentQuestion.question;
    feedbackTxt.innerHTML = "&nbsp;";

    // update answer buttons with answers
    answers.push(currentQuestion.correct_answer);
    for (let incorrectAnswer of currentQuestion.incorrect_answers) {
        answers.push(incorrectAnswer);
    }
    answers.sort(); // sort to randomise
    for (i = 0; i < answers.length; i++) {
        answerBtns.children[i].innerHTML = answers[i];
        answerBtns.children[i].classList.remove("green", "red");
    }
}

/**
 * Start the game
 */
function startGame() {
    displayMode("game");
}

// Global variables for DOM elements
const welcomeTxt = document.querySelector('#welcome-txt');
const instructionsTxt = document.querySelector('#instructions-txt');
const gameArea = document.querySelector('#game-area');
const questionTxt = document.querySelector('#question-txt');
const feedbackTxt = document.querySelector('#feedback-txt');
const answerBtns = document.querySelector('#answer-btns');
const playBtn = document.querySelector('#play-btn');
const instructionsBtn = document.querySelector('#instructions-btn');
const fiftyBtn = document.querySelector('#fifty-btn');
const askBtn = document.querySelector('#ask-btn');
const phoneBtn = document.querySelector('#phone-btn');
const playAgainBtn = document.querySelector('#play-again');

let multiChoiceQuestions;
let multiChoiceQuestion;

loadQuestions();
addEventListeners();

/**
 * Add event listeners to buttons
 */
function addEventListeners() {
    instructionsBtn.addEventListener('click', showInstructions);
    playAgainBtn.addEventListener('click', reloadPage);
    playBtn.addEventListener('click', startGame);
    for (const answerBtn of answerBtns.children) {
        answerBtn.addEventListener('click', processAnswer);
    }
}


/**
 * Only show the instructions panel
 */
function showInstructions() {
    setMode('instructions');
}


/**
 * Sets the game's display mode.
 */
function setMode(mode) {
    switch (mode) {
        case 'instructions':
            welcomeTxt.classList.add('hidden');
            instructionsBtn.classList.add('hidden');
            instructionsTxt.classList.remove('hidden');
            gameArea.classList.add('hidden');
            break;
        case 'game':
            // hide non-game content
            welcomeTxt.classList.add('hidden');
            instructionsTxt.classList.add('hidden');
            playBtn.classList.add('hidden');
            instructionsBtn.classList.add('hidden');
            // show the game panel and buttons
            gameArea.classList.remove('hidden');
            fiftyBtn.classList.remove('hidden');
            askBtn.classList.remove('hidden');
            phoneBtn.classList.remove('hidden');
    }
}


/**
 * Start the game
 */
function startGame() {
    setMode('game');
}


/**
 * Load questions (and answers)
 */
function loadQuestions() {
    fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(json => {
        multiChoiceQuestions = json.results;
        showNextQuestion();
    });
}


/**
 * Show the next question
 */
function showNextQuestion() {
    let answers = [];
    
    // update screen with next question
    multiChoiceQuestion = multiChoiceQuestions.pop();
    questionTxt.innerHTML = multiChoiceQuestion.question;
    feedbackTxt.innerHTML = '&nbsp;';
    
    // update answer buttons with answers
    answers.push(multiChoiceQuestion.correct_answer);
    for (let incorrectAnswer of multiChoiceQuestion.incorrect_answers) {
        answers.push(incorrectAnswer);
    }
    answers.sort(); // sort to randomise
    for (i = 0; i < answers.length; i++) {
        answerBtns.children[i].innerText = answers[i];
        answerBtns.children[i].classList.remove('green', 'red');
    }
}


/**
 * Check and respond to the user's chosen answer
 * @param {Event} event 
 */
function processAnswer(event) {
    let button = event.target;

    if (button.innerText === multiChoiceQuestion.correct_answer) {
        button.classList.add('green');
        feedbackTxt.innerHTML = 'Correct! You now have XXX points!';
        setTimeout(showNextQuestion, 2000);
    } else {
        button.classList.add('red');
        feedbackTxt.innerHTML = 
            `Wrong! That means it's game over for you! 
            Your final score was XXX points! 
            Click Play Game to try to beat your score!`;
        // hide the game buttons
        fiftyBtn.classList.add('hidden');
        askBtn.classList.add('hidden');
        phoneBtn.classList.add('hidden');
        // show the Play Again button
        playAgainBtn.classList.remove('hidden');
    }
}


/**
 * Reload the page to start a new game.
 */
function reloadPage() {
    window.location.reload();
}
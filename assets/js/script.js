// Global variables for DOM elements
let welcomeTxt;
let instructionsTxt;
let gameArea;
let playBtn;
let instructionsBtn;
let fiftyBtn;
let askBtn;
let phoneBtn;
let playAgainBtn;
let questionTxt;
let feedbackTxt;
let answerBtns;
let multiChoiceQuestions;
let multiChoiceQuestion;
loadQuestions(); // get questions from API now to give them time to load


// Wait for the DOM to finish loading before running this script
document.addEventListener('DOMContentLoaded', () => {

    // set up DOM variables
    welcomeTxt = document.querySelector('#welcome-txt');
    instructionsTxt = document.querySelector('#instructions-txt');
    gameArea = document.querySelector('#game-area');
    questionTxt = document.querySelector('#question-txt');
    feedbackTxt = document.querySelector('#feedback-txt');
    answerBtns = document.querySelector('#answer-btns');
    playBtn = document.querySelector('#play-btn');
    instructionsBtn = document.querySelector('#instructions-btn');
    fiftyBtn = document.querySelector('#fifty-btn');
    askBtn = document.querySelector('#ask-btn');
    phoneBtn = document.querySelector('#phone-btn');
    playAgainBtn = document.querySelector('#play-again');

    // add event listeners to buttons
    instructionsBtn.addEventListener('click', showInstructions);
    playAgainBtn.addEventListener('click', reloadPage);
    playBtn.addEventListener('click', startGame);
    for (const answerBtn of answerBtns.children) {
        answerBtn.addEventListener('click', processAnswer);
    }
});


/**
 * Only show the instructions panel
 */
function showInstructions() {
    welcomeTxt.classList.add('hidden');
    instructionsBtn.classList.add('hidden');
    instructionsTxt.classList.remove('hidden');
    gameArea.classList.add('hidden');
}


/**
 * Show the game panel and start the game
 */
function startGame() {

    // show the first question
    showNextQuestion();

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


/**
 * Load questions (and answers)
 */
function loadQuestions() {
    fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(json => {
        multiChoiceQuestions = json.results;
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
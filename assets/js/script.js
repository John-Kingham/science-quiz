// Global variables for DOM elements
let welcome;
let instructions;
let game;
let playBtn;
let instructionsBtn;
let fiftyBtn;
let askBtn;
let phoneBtn;
let question;
let answers;
let questionsAndAnswers;
let currentQuestion;


// Wait for the DOM to finish loading before running this script
document.addEventListener('DOMContentLoaded', () => {
    // set up DOM variables
    welcome = document.querySelector('#welcome');
    instructions = document.querySelector('#instructions');
    game = document.querySelector('#game');
    question = document.querySelector('#question');
    answers = document.querySelector('#answers');
    playBtn = document.querySelector('#play-btn');
    instructionsBtn = document.querySelector('#instructions-btn');
    fiftyBtn = document.querySelector('#fifty-btn');
    askBtn = document.querySelector('#ask-btn');
    phoneBtn = document.querySelector('#phone-btn');
    loadQuestions();

    // add event listeners to buttons
    instructionsBtn.addEventListener('click', showInstructions);
    playBtn.addEventListener('click', startGame);
});


/**
 * Only show the instructions panel
 */
function showInstructions() {
    welcome.classList.add('hidden');
    instructionsBtn.classList.add('hidden');
    instructions.classList.remove('hidden');
}


/**
 * Show the game panel and start the game
 */
function startGame() {

    // show the first question
    showNextQuestion();

    // hide non-game content
    welcome.classList.add('hidden');
    instructions.classList.add('hidden');
    playBtn.classList.add('hidden');
    instructionsBtn.classList.add('hidden');

    // show the game panel and game buttons
    game.classList.remove('hidden');
    fiftyBtn.classList.remove('hidden');
    askBtn.classList.remove('hidden');
    phoneBtn.classList.remove('hidden');

}


/**
 * Load questions (and answers)
 */
function loadQuestions() {
    fetch('https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(json => {
        questionsAndAnswers = json.results;
    });
}


/**
 * Show the next question
 */
function showNextQuestion() {
    currentQuestion = questionsAndAnswers.pop();
    question.innerText = currentQuestion.question;
    for (i = 0; i < 3; i++) {
        answers.children[i].innerText = currentQuestion.incorrect_answers[i]; 
    }
    answers.children[3].innerText = currentQuestion.correct_answer;
    console.log(currentQuestion.correct_answer);
    shuffleQuestions(answers.children);
}

/**
 * Shuffle an array-like object
 * @param {*} arr 
 * @returns undefined (mutates the passed-in array)
 */
function shuffleQuestions(arr) {
    // Use the Fisher–Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
         // pick random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // swap the questions
        [arr[i].innerText, arr[j].innerText] = [arr[j].innerText, arr[i].innerText]; 
    }
}
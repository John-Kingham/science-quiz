// Global variables for DOM elements
let welcome;
let instructions;
let game;
let playBtn;
let instructionsBtn;
let fiftyBtn;
let askBtn;
let phoneBtn;


// Wait for the DOM to finish loading before running this script
document.addEventListener('DOMContentLoaded', () => {
    // set up DOM variables
    welcome = document.querySelector('#welcome');
    instructions = document.querySelector('#instructions');
    game = document.querySelector('#game');
    playBtn = document.querySelector('#play-btn');
    instructionsBtn = document.querySelector('#instructions-btn');
    fiftyBtn = document.querySelector('#fifty-btn');
    askBtn = document.querySelector('#ask-btn');
    phoneBtn = document.querySelector('#phone-btn');

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
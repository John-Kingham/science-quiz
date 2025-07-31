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
 * Show the instructions panel
 */
function showInstructions() {
    instructions.classList.toggle('hidden');
    welcome.classList.toggle('hidden');
    instructionsButton.classList.toggle('hidden');
}


/**
 * Show the game panel and start the game
 */
function startGame() {
    // hide non-in-game content
    welcome.classList.toggle('hidden');
    playBtn.classList.toggle('hidden');
    instructionsBtn.classList.toggle('hidden');
    fiftyBtn.classList.toggle('hidden');
    askBtn.classList.toggle('hidden');
    phoneBtn.classList.toggle('hidden');

    // show the game panel
    game.classList.toggle('hidden');
}
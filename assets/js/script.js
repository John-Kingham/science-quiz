// Wait for the DOM to finish loading before running this script
document.addEventListener('DOMContentLoaded', () => {

    // add event listeners to each button
    const instructionsButton = document.querySelector('#instructions-btn')
    instructionsButton.addEventListener('click', showInstructions);
});


/**
 * Show the instructions panel
 */
function showInstructions() {
    const instructions = document.querySelector('#instructions-txt');
    const welcome = document.querySelector('#welcome-txt');
    const instructionsButton = document.querySelector('#instructions-btn');

    instructions.classList.toggle('hidden');
    welcome.classList.toggle('hidden');
    instructionsButton.classList.toggle('hidden');
}
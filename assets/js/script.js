document.getElementById('instructions-button').addEventListener('click', (e) => {
    const instructions = document.getElementById('instructions-text');
    const welcome = document.getElementById('welcome-text');
    const instructionsButton = document.getElementById('instructions-button');

    instructions.classList.toggle('hidden');
    welcome.classList.toggle('hidden');
    instructionsButton.classList.toggle('hidden');
});
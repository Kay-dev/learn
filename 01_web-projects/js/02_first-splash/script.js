let randomNumber = Math.floor(Math.random() * 100) + 1;

const guess = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHigh');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const availableTime = document.querySelector('.availableTimes')

let guessCount = 1;
let resetButton;

function checkGuess() {

    let userGuess = Number(guessField.value);
    guess.textContent = 'latest guess number: '+ userGuess ;

    if (userGuess === randomNumber) {
        lastResult.textContent = 'congratulation!';
        lowOrHigh.textContent = '';
        gameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = 'you\'re failed';
        gameOver();
    } else {
        lastResult.textContent = 'wrong';
        if (userGuess < randomNumber) {
            lowOrHigh.textContent = 'low';
        }else if (userGuess > randomNumber) {
            lowOrHigh.textContent = 'high';
        }
    }
    availableTime.textContent = 10 - guessCount;
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

function resetGame() {
    guessCount = 0;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

function gameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement(`button`)
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

guessSubmit.addEventListener('click', checkGuess);
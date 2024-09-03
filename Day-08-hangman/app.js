const userLetterElement = document.getElementById('userLetter');
const wordContainer = document.getElementById('wordContainer');
const starBtn = document.getElementById('starBtn');
const messageContainer = document.getElementById('messageContainer');
const messageElement = document.getElementById('message');
const msg = document.getElementById('msg') 
const timerElement = document.getElementById('timer');
const countdownElement = document.getElementById('countdown');



let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.height = 0;
ctx.canvas.width = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectorWord;
let usedLetters;
let mistakes;
let hits;
let currentPistaIndex = 0;
let countdownValue = 60; 
let countdownInterval;

function startTimer() {
    countdownInterval = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = countdownValue;

        if (countdownValue === 0) {
            clearInterval(countdownInterval);
            endGame(false); 
        }
    }, 1000); 
}


function stopTimer() {
    clearInterval(countdownInterval);
}

function resetTimer() {
    clearInterval(countdownInterval);
    countdownValue = 60; 
    countdownElement.textContent = countdownValue;
}

const addLetter = (letter) => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    userLetterElement.appendChild(letterElement);
};

const addBodyPart = (bodyPart) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

function wrongLetter() {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) endGame(false);
}

function endGame(won) {
    document.removeEventListener('keydown', letterEvent);
    starBtn.style.display = 'block';
    starBtn.innerHTML = 'Jugar de nuevo';
    messageContainer.style.display = 'flex';
    messageElement.innerHTML = won ? "¡Ganaste, felicidades!" : "Perdiste. La palabra era " + selectorWord.join('');
    stopTimer();
}

function correctLetter(letter) {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectorWord.length) {
        endGame(true);
    }
}

function letterInput(letter) {
    if (selectorWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
}

function letterEvent(event) {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
}

function drawWord() {
    selectorWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
    
}

function randomWord() {
    let word = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    selectorWord = word.split('');
}

function drawHangman() {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 7, 4, 1, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
}

function startGame() {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    userLetterElement.innerHTML = '';
    starBtn.style.display = 'none';
    messageContainer.style.display = 'none';
    msg.style.display = 'none'; 
    drawHangman();
    randomWord();
    drawWord();
    startTimer();
    document.addEventListener('keydown', letterEvent);
}

starBtn.addEventListener('click', () => {
    resetTimer();
    startGame();
});


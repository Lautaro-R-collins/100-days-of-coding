const playBoard = document.getElementById('play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i'); // Corregido para seleccionar todos los íconos

// inicializar variables
let gameOver = false;
let appleX, appleY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// obtener y almacenar la puntuacion mas alta
let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

// pasar un numero aleatorio entre 1 y 30 para la posicion manzana
const applePosition = () => {
    appleX = Math.floor(Math.random() * 30) + 1;
    appleY = Math.floor(Math.random() * 30) + 1;
}

const handleOverGame = () => {
    clearInterval(setIntervalId);
    alert('Game over :(');
    location.reload();
}

// Cambiar el valor de la velocidad en función de la pulsación de la tecla
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Cambiar dirección
controls.forEach(button => button.addEventListener("click", () => changeDirection({ 
    key: button.dataset.key 
})));

const initGame = () => {
    if(gameOver) return handleOverGame();
    let html = `<div class="apple" style="grid-area: ${appleY} / ${appleX}"></div>`;

    // cuando la serpiente come la manzana
    if(snakeX === appleX && snakeY === appleY) {
        applePosition();
        snakeBody.push([appleY, appleX]);
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Actualizar snakeHead
    snakeX += velocityX;
    snakeY += velocityY;

    // Desplazamiento hacia delante de los valores de los elementos en el cuerpo de la serpiente
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    // Checkea que la serpiente no salga de la pared
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    // agregar div para cada parte del cuerpo de la serpiente
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Compruebe que la cabeza de la serpiente no colisione con el cuerpo 
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

applePosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);

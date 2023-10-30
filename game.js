// board
// noinspection JSUnusedLocalSymbols,JSUndeclaredVariable

let blockSize = 25;
let rows = 25;
let cols = 25;
let board;
let context;
let counter = 0;
let speed = 10;

// snake
let x = 0;
let y = 0;
// let snake
let snakebody = [];
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// food
let foodX;
let foodY;

let gameover = false;


window.onload = function () {
    counterValue = document.getElementById('counterValue');
    board = document.getElementById('board');
    // snake = document.getElementById('snake');
    // food = document.getElementById('food');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    let game = document.getElementById('game')

    // Ẩn màn hình bắt đầu game khi nhấp vào nút "Bắt đầu"
    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        startGame();
    });

    function startGame() {
        game.style.display = 'block'
    }

    startCounter()
    placefood();
    // snakeSize();
    document.addEventListener("keydown", direction);
    setInterval(update, 1000 / speed);
    // console.log(setInterval(update, 1000 / speed));
}

function update() {
    // board
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);


    //food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        increaseCounter();
        placefood();
        snakebody.push([foodX, foodY]);
        speed += 2;
    }

    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }

    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY];
    }

    // snake
    context.fillStyle = "orange";
    snakeX += x * blockSize;
    snakeY += y * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakebody.length; i++) {
        context.fillStyle = "chocolate";
        context.fillRect(snakebody[i][0], snakebody[i][1], blockSize, blockSize);
        // increaseCounter();
    }

    // Kiểm tra va chạm với tường
    if (snakeX < 0) {
        snakeX = board.width - blockSize;
    } else if (snakeX >= board.width) {
        snakeX = 0;
    }

    if (snakeY < 0) {
        snakeY = board.height - blockSize;
    } else if (snakeY >= board.height) {
        snakeY = 0;
    }

    for (i = 0; i < snakebody.length; i++) {
        if (snakeX === snakebody[i][0] && snakeY === snakebody[i][1]) {
            gameover = true;
            alert('YOU LOSE');
            reset();
            resetCounter();
            break
        }
    }
}

function placefood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;


}


function direction(e) {
    if (e.key === 's' && y !== -1) {
        x = 0;
        y = 1;
    } else if (e.key === 'w' && y !== 1) {
        x = 0;
        y = -1;
    } else if (e.key === 'a' && x !== 1) {
        x = -1;
        y = 0;
    } else if (e.key === 'd' && x !== -1) {
        x = 1;
        y = 0;
    }
}

function reset() {
    x = 0;
    y = 0;
    snakebody = [];
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    gameover = false;
}

function startCounter() {
    counter = 0;
    document.getElementById("counterValue").innerHTML = counter;
}

function increaseCounter() {
    counter += 10;
    document.getElementById("counterValue").innerHTML = counter;
}


function resetCounter() {
    counter = 0;
    document.getElementById("counterValue").innerText = counter;
}


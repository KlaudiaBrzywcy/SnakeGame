const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const againBtn = document.querySelector('.try-again');




canvas.width = '400';
canvas.height = '400';

let tileCount = 20;
let tileSize = tileCount - 2;

class SnakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

// Declaration of speed, level and score
let speed = 4;
let score = 0;
let level = 1;

// object sound
const eatSound = new Audio('assets/mp3/gulp.mp3');
const overSound = new Audio('assets/mp3/game-over.mp3')



// Placement of snake head at the beginning of the game
let headX = 10;
let headY = 10;
// Array with other parts of snake
let snakePartsArr = [];
// Deafult lenght of snake's tail 
let snakeTailLength = 1;

// Movement direction 
let xVelocity = 0;
let yVelocity = 0;

// Apples position
let appleX = 5;
let appleY = 5;


// MAIN GAME FUNCTION
const drawGame = () => {
    changeSnakePosition();

    let result = isGameOver()

    if (result === true) {
        return
    }

    clearScreen();
    drawSnake();
    checkAppleCollision();
    drawApple();

    drawScore();


    setTimeout(drawGame, 1000 / speed);
}


const clearScreen = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

const drawSnake = () => {

    ctx.fillStyle = 'green'

    for (let i = 0; i < snakePartsArr.length; i++) {
        let part = snakePartsArr[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakePartsArr.push(new SnakePart(headX, headY));
    if (snakePartsArr.length > snakeTailLength) {
        snakePartsArr.shift()
    }

    ctx.fillStyle = 'lime';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

}


const changeSnakePosition = () => {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}


// drawApple

const drawApple = () => {
    ctx.fillStyle = 'purple';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

// check if apple is eaten and draw apple in new, random position
const checkAppleCollision = () => {
    if (appleX === headX && appleY === headY) {
        console.log('EAT APPLE!')
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        snakeTailLength++;
        score++;
        eatSound.play();


    }
}

const drawScore = () => {
    ctx.fillStyle = 'pink';
    ctx.font = '12px Courier New';
    ctx.fillText('Score:' + score, canvas.width - 60, 20);
    if (score === 1) {
        goTonNextLevel();
    }
    if (score >= 1) {
        speed = 6
    } else if (score >= 2) {
        speed = 8
    } else if (score >= 3) {
        speed = 10
    } else if (score >= 4) {
        speed = 12
    }

}



const isGameOver = () => {

    let gameOver = false;


    if (xVelocity === 0 && yVelocity === 0) {
        return false;
    }

    // walls
    if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
        gameOver = true;
    }
    // snake itself
    for (i = 0; i < snakePartsArr.length; i++) {
        console.log(headX, headY)
        let part = snakePartsArr[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver === true) {
        ctx.fillStyle = 'pink';
        ctx.font = '50px Courier New'
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2)
        overSound.play();
        againBtn.classList.remove('invisible')
    }

    return gameOver;

}



const keyDown = (e) => {
    // up
    if (e.keyCode === 38) {
        if (yVelocity === 1) {
            return
        }
        yVelocity = -1;
        xVelocity = 0;
        // down
    } else if (e.keyCode === 40) {
        if (yVelocity === -1) {
            return
        }
        yVelocity = 1;
        xVelocity = 0;
        // right
    } else if (e.keyCode === 39) {
        if (xVelocity === -1) {
            return
        }
        yVelocity = 0;
        xVelocity = 1;
        // left
    } else if (e.keyCode === 37) {
        if (xVelocity === 1) {
            return
        }
        yVelocity = 0;
        xVelocity = -1;
    }
}

document.body.addEventListener('keydown', keyDown);

drawGame();


const tryAgain = () => {
    console.log('Play again');
    clearStateOfGame();
    drawGame();

}

// Function to clear state of game in case of try again btn press

const clearStateOfGame = () => {
    clearScreen();
    headX = 10;
    headY = 10;
    snakeTailLength = 1
    snakePartsArr = []
    drawSnake();
    drawApple();
    score = 0
    drawScore();
    againBtn.classList.add('invisible')
}

// Function to prepare new state of game in case of moving to next level

// const nextLevelStateOfGame = () => {
//     canvas.width = '800';
//     canvas.height = '800';
//     // tileCount = 30;
//     // tileSize = tileCount - 2;


//     clearScreen();
//     headX = headX;
//     headY = headY;
//     snakeTailLength = 1
//     snakePartsArr = []
//     drawSnake();
//     drawApple();
//     score = 0;
//     drawScore();
// }

const goTonNextLevel = () => {
    // nextLevel = true;
    // canvas.width = '800';
    // canvas.height = '800';
    // tileCount = ????;
    console.log(tileCount)
    console.log('Next level Yayy!')
    // nextLevelStateOfGame();

}

againBtn.addEventListener('click', tryAgain)

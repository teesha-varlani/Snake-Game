
// Game Constants and variables

let inputDir = { x: 0, y: 0 };
let speed = 7;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [                    // Snake Head (Array)
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };              // food is not an array


// Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);                 //Most important for games (Game Loop)

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;          // Updating the last paint time
    gameEngine();
}

function isCollide(snake) {          // If snake collides
    // When the snake touches itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // When snake touches the borders
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

function gameEngine() {

    // part 1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;                 //incrementing the score
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HighScoreBox.innerHTML = "High Score : " + hiscoreval;          //To update new High Score
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        //Randomly displaying the food
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };  // Creating a new object
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: Display the snake and food

    // 1. Display the snake
    board.innerHTML = " ";
    snakeArr.forEach((e, index) => {                    // => Arrow function needed in for each loop
        snakeElement = document.createElement('div');   // To make a new element
        snakeElement.style.gridRowStart = e.y;          // Adding css to created element
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')          //Adding class to created element
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })

    // 2. Display the food
    foodElement = document.createElement('div');        //Same as displaying snake for food element
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


// Main Logic of the program

let hiscore = localStorage.getItem("hiscore")              //Saving High Score in local server
if (hiscore === null) {       //If no High score yet
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);           //If there's a high score then display
    HighScoreBox.innerHTML = "High Score : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // start the game
    // console.log("started");
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("arrow down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("arrow left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("arrow right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});



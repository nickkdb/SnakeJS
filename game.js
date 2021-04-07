let lastRender= 0;
import { resetInput } from "./input.js";
import { updateSnake, renderSnake, resetSnake, snakeIntersects, headPosition, getSnakeScore } from "./snake.js";
import { renderTarget, updateTarget, resetTarget } from "./target.js";

const board= document.getElementById('game-grid');
const startButton= document.getElementById('btn');
const slider= document.getElementById('myRange');

let gameOver;
let timedScore;
export let SPEED;

startButton.addEventListener('click', function() {
    console.log(slider.value);
    SPEED= slider.value;
    startGame();
})

const runGame= (timeStamp) => {

    if (gameOver) {
        let finalScore= timedScore + getSnakeScore();
        return alert(`Game over, final score: ${finalScore}`);
    }
    window.requestAnimationFrame(runGame);
    let timeToRender = (timeStamp - lastRender) / 1000;
    if (timeToRender < 1 / SPEED) return;
    lastRender= timeStamp;
    timedScore += 3;
    updateGame();
    renderGame();
}

function startGame() {
    timedScore= 0;
    gameOver= false;
    reset();
    window.requestAnimationFrame(runGame);
}

const updateGame= () => {
    updateSnake();
    updateTarget();
    checkForFailure();
}

const renderGame= () => {
    board.innerHTML= '';
    renderSnake(board);
    renderTarget(board);
}

function checkForFailure() {
    gameOver = snakeIntersects() || outsideGrid(headPosition());
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21
    )
}

function reset() {
    resetSnake();
    resetTarget();
    resetInput();
}
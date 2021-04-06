let lastRender= 0;
import { SPEED, updateSnake, renderSnake, snakeIntersects, headPosition, getSnakeScore } from "./snake.js";
import { renderTarget, updateTarget } from "./target.js";

const board= document.getElementById('game-grid');
let gameOver= false;
let timedScore= 0;


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

window.requestAnimationFrame(runGame);

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
let lastRender= 0;
import { SPEED, updateSnake, renderSnake, snakeIntersects, headPosition } from "./snake.js";
import { renderTarget, updateTarget } from "./target.js";

const board= document.getElementById('game-grid');
let gameOver= false;


const runGame= (timeStamp) => {

    if (gameOver) {
        return alert('Game over!!');
    }
    window.requestAnimationFrame(runGame);
    let timeToRender = (timeStamp - lastRender) / 1000;
    if (timeToRender < 1 / SPEED) return;
    lastRender= timeStamp;

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
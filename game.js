let lastRender= 0;
import { SPEED, updateSnake, renderSnake } from "./snake.js";
import { renderTarget, updateTarget } from "./target.js";

const board= document.getElementById('game-grid');


const runGame= (timeStamp) => {

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
}

const renderGame= () => {
    board.innerHTML= '';
    renderSnake(board);
    renderTarget(board);
}
let lastRender= 0;
import { SPEED } from "./snake.js";

const board= document.getElementById('game-grid');


const runGame= (timeStamp) => {

    window.requestAnimationFrame(runGame);
    let timeToRender = (timeStamp - lastRender) / 1000;
    if (timeToRender < 1 / SPEED) return;
    lastRender= timeStamp;
    console.log(timeStamp);

    updateGame();
    renderGame();
}

window.requestAnimationFrame(runGame);

const updateGame= () => {

}

const renderGame= () => {
    // board.innerHTML = '';
}
import { expandSnake, touchingSnake } from "./snake.js";

let target= setTarget();

export const updateTarget= () => {
    if (touchingSnake(target)) {
        expandSnake();
        target= setTarget();
    }
}

export const renderTarget= (board) => {
    const targetSprite= document.createElement('div');
    targetSprite.style.gridRowStart= target.y;
    targetSprite.style.gridColumnStart= target.x;
    targetSprite.classList.add('target');
    board.appendChild(targetSprite);
}

function setTarget() {
     let newPosition;
    while (newPosition == null || touchingSnake(newPosition)) {
        newPosition= randomPosition();
    }
    return newPosition;
}

function randomPosition() {
    return {
        x: Math.floor(Math.random() * 21) + 1,
        y: Math.floor(Math.random() * 21) + 1
    }
}

export function resetTarget() {
    target= setTarget();
}
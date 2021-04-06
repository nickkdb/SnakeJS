export const SPEED = 3;
import { readInput } from './input.js';

let snake= [{x: 11, y: 11}];


export const updateSnake= () => {

    const moveSnake = readInput();

    snake[0].x += moveSnake.x;
    snake[0].y += moveSnake.y;
}

export const renderSnake= (board) => {
    snake.forEach(square => {
        let snakeBody= document.createElement('div');
        snakeBody.style.gridRowStart= square.y;
        snakeBody.style.gridColumnStart= square.x;
        snakeBody.classList.add('snake');
        board.appendChild(snakeBody);
    })
}

export const touchingSnake= (position) => {
    return snake.some((square, index) => {
        return isTouching(square, position);
    })
}

const isTouching= (pos1, pos2) => {
    return (pos1.x === pos2.x && pos1.y === pos2.y);
}
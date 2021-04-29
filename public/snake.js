// export const SPEED = 11;
import { readInput } from './input.js';
import { SPEED } from './game.js';

let snake= [{x: 11, y: 11}];
let newSquare= false;
let snakeScore= 0;


export const updateSnake= () => {
    addSquares();
    const moveSnake = readInput();
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = {...snake[i]};
    }

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

export const touchingSnake= (position, {ignoreHead = false} = {}) => {
    return snake.some((square, index) => {
        if (ignoreHead && index === 0) return false;
        return isTouching(square, position);
    })
}

const isTouching= (pos1, pos2) => {
    return (pos1.x === pos2.x && pos1.y === pos2.y);
}

export const expandSnake= () => {
    newSquare= true;
}

const addSquares= () => {
    if (newSquare) {
        snake.push({...snake[snake.length - 1]});
        newSquare= false;
        snakeScore += Math.floor((SPEED * snake.length) / 2);
    }
}

export const headPosition= () => {
    return snake[0];
}

export const snakeIntersects= () => {
return touchingSnake(snake[0], {ignoreHead: true});
}

export const getSnakeScore = () => {
    return snakeScore;
}

export const resetSnake= () => {
    snake= [{x: 11, y: 11}];
    snakeScore= 0;
    newSquare= false;
}
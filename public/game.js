let lastRender= 0;
import { resetInput } from "./input.js";
import { updateSnake, renderSnake, resetSnake, snakeIntersects, headPosition, getSnakeScore } from "./snake.js";
import { renderTarget, updateTarget, resetTarget } from "./target.js";

const socket= io('https://playsnakejs.herokuapp.com/');
const board= document.getElementById('game-grid');
const startButton= document.getElementById('btn');
const slider= document.getElementById('myRange');
const leaderboard= document.getElementById('leaderboards');

let gameOver;
let timedScore;
export let SPEED;

socket.on('highscores', data => {
    console.log(data);
    for (let item of data) {
        const score= document.createElement('h2');
        score.classList.add('scores');
        score.innerHTML= `<strong>${item.name}: </strong> ${item.score}`;
        leaderboard.appendChild(score);
    }
})

startButton.addEventListener('click', function() {
    console.log(slider.value);
    SPEED= slider.value;
    startGame();
})

const runGame= (timeStamp) => {

    if (gameOver) {
        let finalScore= timedScore + getSnakeScore();
        timedScore= 0;
        let name= prompt(`Game over! Final score: ${finalScore}\n Enter name:`);
        let data= {
            name: name,
            score: finalScore
        }
        socket.emit('score', data);
        return console.log(data);
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

// yooyooyyoyyo
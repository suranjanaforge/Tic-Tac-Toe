// Select Elements
const cells = document.querySelectorAll(".cell");
const chooseX = document.getElementById("chooseX");
const chooseO = document.getElementById("chooseO");
const playerDisplay = document.getElementById("playerSymbol");
const computerDisplay = document.getElementById("computerSymbol");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// Variables
let board = ["", "", "", "", "", "", "", "", ""];

let player = "";
let computer = "";

let gameStarted = false;
let gameOver = false;

// Winning combinations
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

// Player chooses X
chooseX.addEventListener("click", () => {

    player = "X";
    computer = "O";

    startGame();

});

// Player chooses O
chooseO.addEventListener("click", () => {

    player = "O";
    computer = "X";

    startGame();

});

// Start Game
function startGame(){

    playerDisplay.textContent = player;
    computerDisplay.textContent = computer;

    gameStarted = true;

    statusText.textContent = "Your Turn";

}

// Player Click
cells.forEach(cell => {

    cell.addEventListener("click", playerMove);

});

function playerMove(){

    if(!gameStarted) return;

    if(gameOver) return;

    const index = this.dataset.index;

    if(board[index] !== "") return;

    board[index] = player;

    this.textContent = player;

    if(checkWinner(player)){

        statusText.textContent = "🎉 You Won!";

        gameOver = true;

        return;

    }

    if(boardFull()){

        statusText.textContent = "It's a Draw!";

        gameOver = true;

        return;

    }

    statusText.textContent = "Computer's Turn";

    setTimeout(computerMove,500);

}

// Computer Move
function computerMove(){

    if(gameOver) return;

    let emptyCells = [];

    board.forEach((value,index)=>{

        if(value===""){

            emptyCells.push(index);

        }

    });

    if(emptyCells.length===0) return;

    const randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    board[randomIndex] = computer;

    cells[randomIndex].textContent = computer;

    if(checkWinner(computer)){

        statusText.textContent = "Computer Wins!";

        gameOver = true;

        return;

    }

    if(boardFull()){

        statusText.textContent = "It's a Draw!";

        gameOver = true;

        return;

    }

    statusText.textContent = "Your Turn";

}

// Check Winner
function checkWinner(symbol){

    return winningCombinations.some(combination=>{

        return combination.every(index=>board[index]===symbol);

    });

}

// Check Draw
function boardFull(){

    return board.every(cell=>cell!=="");

}

// Restart
restartBtn.addEventListener("click",restartGame);

function restartGame(){

    board = ["","","","","","","","",""];

    cells.forEach(cell=>{

        cell.textContent="";

    });

    gameOver=false;

    gameStarted=false;

    player="";
    computer="";

    playerDisplay.textContent="-";
    computerDisplay.textContent="-";

    statusText.textContent="Choose your symbol to start the game!";

}
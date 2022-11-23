function setPlayerMove(gameGrid) {
    gameGrid.innerText = "X";
    gameBoard.board[gameGrid.getAttribute("index")] = "X";
}

function setComputerMove(computersMarker, markerLocation) {
    document.querySelector(`button[index="${markerLocation}"]`).innerText = computersMarker;
    document.querySelector(`button[index="${markerLocation}"]`).classList.add('disabled');

    gameBoard.board[markerLocation] = computersMarker;
}

const gameBoard = (() => {
    let board = Array(9)    
    const gameBoardUI = document.querySelector('.game-board');
    for (let i = 0; i < 9; i++) {
        let gameGrid = document.createElement('button');
        gameGrid.setAttribute("index", i)
        gameGrid.classList = "game-grid-object";
        
        gameGrid.addEventListener('click', () => {
            setPlayerMove(gameGrid);
            computersMove();
            isWinner();
            checkIfDraw();
            gameGrid.classList.add('disabled');
        })
        gameBoardUI.appendChild(gameGrid);
    }
    return {board};
})();

function gameRestart() {
    const restart = document.getElementById("restartBtn");
    const gameBoardItems = document.querySelector(".game-board").children;
    const gameBoardItemsArray = [...gameBoardItems]; 
    gameBoardItemsArray.forEach((item) => item.textContent = '');
    gameBoardItemsArray.forEach((item) => item.classList.remove('disabled'));
    gameBoard.board = Array(9);
    restart.addEventListener('click', () => {
        gameBoardItemsArray.forEach((item) => item.textContent = '');
        gameBoardItemsArray.forEach((item) => item.classList.remove('disabled'));
        gameBoard.board = Array(9);
    })
};

function computersMove() {
    let computersMarker = "O";
    markerLocation = randomMove();
    setComputerMove(computersMarker, markerLocation)
}

//shuffle the board array, choose first empty space
function randomMove() {
    notFoundSpace = false;
    thisBoard = gameBoard.board;
    while (!notFoundSpace) {
        let randomNumber = getRandomInt(9);
        if (gameBoard.board[randomNumber] == null) {
            return randomNumber;
        }
        if (checkIfDraw()) {
            gameRestart();
            return;
        }
    }
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function isWinner() {
    board = gameBoard.board;

    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    currentNoughtPlacements = [];
    currentCrossPlacements = [];
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] == "X") {
            currentCrossPlacements.push(i)
        } if (board[i] == "O") {
            currentNoughtPlacements.push(i)
        }
    }

    //console.log(currentNoughtPlacements, currentCrossPlacements);
    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(val => currentCrossPlacements.includes(val))) {
            alert("You win!");
            gameRestart();
            return
        }
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(val => currentNoughtPlacements.includes(val))){
            alert("You lose!");
            gameRestart();
            return
        }
    }
    checkIfDraw();
    return;
}

function checkIfDraw() {
    if (!(Object.values(gameBoard.board).length !== gameBoard.board.length)) {
        alert("Draw!")
        gameRestart();
        return true;
        
    }
    return false;
}

function minimax(board, depth, isMax) {

};
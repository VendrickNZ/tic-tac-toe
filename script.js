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
    const restart = document.getElementById("restartBtn");

    restart.addEventListener('click', () => {
        const gameBoardItems = document.querySelector(".game-board").children;
        const gameBoardItemsArray = [...gameBoardItems]; 
        gameBoardItemsArray.forEach((item) => item.textContent = '');
        gameBoardItemsArray.forEach((item) => item.classList.remove('disabled'));
        gameBoard.board = Array(9);
    })
    for (let i = 0; i < 9; i++) {
        let gameGrid = document.createElement('button');
        gameGrid.setAttribute("index", i)
        gameGrid.classList = "game-grid-object";
        gameGrid.addEventListener('click', () => {
            gameGrid.classList.add('disabled');
            setPlayerMove(gameGrid);
            computersMove();
            if (checkIfWinner() || checkIfDraw()) {
                gameRestart();
            }
        })
        gameBoardUI.appendChild(gameGrid);
    }
    return {board};
})();

function gameRestart() {
    const gameBoardItems = document.querySelector(".game-board").children;
    const gameBoardItemsArray = [...gameBoardItems]; 
    gameBoard.board = Array(9);
    for (let i = 0; i < gameBoardItemsArray.length; i++) {
        gameBoardItemsArray[i].classList.remove('disabled');
        gameBoardItemsArray[i].textContent = ''
    }
};

function computersMove() {
    const difficulty = document.getElementById("select");
    const index = difficulty.selectedIndex;
    difficulty.addEventListener('change', () => {
        const index = difficulty.selectedIndex;
    })
    let computersMarker = "O";
    markerLocation = randomMove();
    setComputerMove(computersMarker, markerLocation)
}

//shuffle the board array, choose first empty space
function randomMove() {
    if (checkIfWinner()) {
        gameRestart();
        return;
    }
    else if (checkIfDraw()) {
        gameRestart();
        return;
    }
    notFoundSpace = false;
    thisBoard = gameBoard.board;
    while (!notFoundSpace) {
        let randomNumber = getRandomInt(9);
        if (gameBoard.board[randomNumber] == null) {
            return randomNumber;
        }
    }
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function checkIfWinner() {
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
            // gameRestart();
            return true;
        }
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(val => currentNoughtPlacements.includes(val))){
            alert("You lose!");
            // gameRestart();
            return true;
        }
    }
    return checkIfDraw();
}

function checkIfDraw() {
    if (!(Object.values(gameBoard.board).length !== gameBoard.board.length)) {
        alert("Draw!")
        // gameRestart();
        return true;
        
    }
    return false;
}

function minimax(board, depth, isMax) {

};
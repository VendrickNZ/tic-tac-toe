function setPlayerMove(gameGrid) {
    gameGrid.innerText = "X";
    gameBoard.board[gameGrid.getAttribute("index")] = "X";
}

function setComputerMove(markerLocation) {
    document.querySelector(`button[index="${markerLocation}"]`).innerText = gameBoard.computersMarker;
    document.querySelector(`button[index="${markerLocation}"]`).classList.add('disabled');

    gameBoard.board[markerLocation] = gameBoard.computersMarker;
}

const gameBoard = (() => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push(" ");
    }
    const gameBoardUI = document.querySelector('.game-board');
    const restart = document.getElementById("restartBtn");

    let computersMarker = "O";
    let playersMarker = "X";
    

    
    restart.addEventListener('click', () => {
        const gameBoardItems = document.querySelector(".game-board").children;
        const gameBoardItemsArray = [...gameBoardItems]; 
        gameBoardItemsArray.forEach((item) => item.textContent = '');
        gameBoardItemsArray.forEach((item) => item.classList.remove('disabled'));
        gameBoard.board = createNewBoard();
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
    return {board, playersMarker, computersMarker};
})();


function gameRestart() {
    const gameBoardItems = document.querySelector(".game-board").children;
    const gameBoardItemsArray = [...gameBoardItems]; 
    gameBoard.board = createNewBoard();
    for (let i = 0; i < gameBoardItemsArray.length; i++) {
        gameBoardItemsArray[i].classList.remove('disabled');
        gameBoardItemsArray[i].textContent = ''
    }
};

function createNewBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push(" ");
    }
    return board;
}

function gameDifficulty() {
    const difficulty = document.getElementById("select");
    const index = difficulty.selectedIndex;
    return index;
}

function computersMove() {
    difficulty = gameDifficulty();
    if (difficulty === 0) { 
        markerLocation = randomMove() 
        setComputerMove(markerLocation)
    } else {
        if (checkIfWinner()) {
            gameRestart();
            return;
        }
        else if (checkIfDraw()) {
            gameRestart();
            return;
        }
        [_, choice] = minimax(gameBoard.board, gameBoard.computersMarker)
        console.log(_, choice);
        if (choice != null) {
            setComputerMove(choice)
        }
    } 
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
        if (!isNaN(gameBoard.board[randomNumber])) {
            return randomNumber;
        }
    }
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}


const winningPositions = (() => {
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

    return {winningCombinations}
})();

function checkIfWinner(board=gameBoard.board) {
    winningCombinations = winningPositions.winningCombinations;
    currentNoughtPlacements = [];
    currentCrossPlacements = [];
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] == "X") {
            currentCrossPlacements.push(i)
        } if (board[i] == "O") {
            currentNoughtPlacements.push(i)
        }
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(val => currentCrossPlacements.includes(val))) {
            alert("You win!");
            return true;
        }
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(val => currentNoughtPlacements.includes(val))){
            alert("You lose!");
            return true;
        }
    }
    return checkIfDraw();
}

function checkIfDraw() {
    if (emptyIndices().length === 0) {
        alert("Draw!")
        return true;
    }
    return false;
}

function emptyIndices(){
    return gameBoard.board.filter(s => s != "O" && s != "X");
}

//ai

// function evaluateBoard(boardPosition) {
//     newBoardPosition = []
//     while (boardPosition.length) {
//         newBoardPosition.push(boardPosition.splice(0, 3))
//     }

//     const winningStates = [[[0, 0], [0, 1], [0, 2]],
//     [[1, 0], [1, 1], [1, 2]],
//     [[2, 0], [2, 1], [2, 2]],
//     [[0, 0], [1, 0], [2, 0]],
//     [[0, 1], [1, 1], [2, 1]],
//     [[0, 2], [1, 2], [2, 2]],

//     // Diagonals
//     [[0, 0], [1, 1], [2, 2]],
//     [[2, 0], [1, 1], [0, 2]],
//     ];

//     for (const possibleState of winningStates) {
//         let currentPlayer = null;
//         let isWinner = true;

//         for (const [x, y] of possibleState) {
//             const occupant = newBoardPosition[x][y];
//             if (currentPlayer == null && occupant != " ") {
//                 currentPlayer = occupant;
//             } else if (currentPlayer != occupant) {
//                 isWinner = false;
//             }
//         }
//         if (isWinner) {
//             return currentPlayer;
//         }
//     }
//     let hasMoves = false;
    
//     if (emptyIndices().length > 0) {
//         hasMoves = true;
//     }

//     if (!hasMoves) {
//         return checkIfDraw();
//     }

//     return null;

// }
// function minimax(boardPosition, maximizingPlayer) {
//     const winner = evaluateBoard(boardPosition);
//     if (winner == gameBoard.computersMarker) {
//         return [1, null]
//     } else if (winner == gameBoard.playersMarker) {
//         return [-1, null]
//     }
    
//     let move, moveScore;
//     if (maximizingPlayer == gameBoard.computersMarker) {
//         [moveScore, move] = maximize(boardPosition);
//     } else {
//         [movescore, move] = minimize(boardPosition);
//     }

//     if (move == null) {
//         moveScore = 0;
//     }

//     return [moveScore, move];
// }

// function maximize(boardPosition) {
//     let moveScore = Number.NEGATIVE_INFINITY;
//     let move = null;

//     for (let x = 0; x < 9; x++) {
//         if (boardPosition[x] == " ") {
//             const newBoardPosition = boardPosition.slice(0);
//             newBoardPosition[x] = gameBoard.computersMarker;
//             const [newMoveScore, _] = minimax(newBoardPosition, gameBoard.playersMarker);

//             if (newMoveScore > moveScore) {
//                 move = x;
//                 moveScore = newMoveScore;
//             }
//         }
//     }
//     return [moveScore, move];
// }

// function minimize(boardPosition) {
//     let moveScore = Number.POSITIVE_INFINITY;
//     let move = null;
    
//     for (let x = 0; x < 9; x++){
//         if (boardPosition[x] == " ") {
//             const newBoardPosition = boardPosition.slice(0);
//             newBoardPosition[x] = gameBoard.playersMarker;
//             const [newMoveScore, _] = minimax(newBoardPosition, gameBoard.computersMarker);

//             if (newMoveScore < moveScore) {
//                 move = x;
//                 moveScore = newMoveScore;
//             }
//         }
//     }

//     return [moveScore, move];
// }
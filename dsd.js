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
    let board = Array(9)    
    const gameBoardUI = document.querySelector('.game-board');
    const restart = document.getElementById("restartBtn");

    let computersMarker = "O";
    let playersMarker = "X";
    

    
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
    return {board, playersMarker, computersMarker};
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

function gameDifficulty() {
    const difficulty = document.getElementById("select");
    const index = difficulty.selectedIndex;
    return index;
}

function computersMove() {
    difficulty = gameDifficulty();
    if (difficulty === 0) { 
        markerLocation = randomMove() 
    } else {
        markerLocation = minimax(gameBoard.board, gameBoard.playersMarker)
    }
    setComputerMove(markerLocation)
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
    if (!(Object.values(gameBoard.board).length !== gameBoard.board.length)) {
        alert("Draw!")
        return true;
        
    }
    return false;
}


// ai
function minimax(newBoard, playersMarker) {
    let availablePositions = emptyIndices(newBoard);

    if (checkIfPlayerWinning()){
        return {score:-10};
    } else if (checkIfComputerWinning()) {
        return {score:10};
    } else if (availablePositions.length === 0) {
        return {score:0};
    }
    console.log('hi');
    let moves = [];

    for (let i = 0; i < availablePositions.length; i++) {
        let move = {};
        move.index = newBoard[availablePositions[i]]
        newBoard[availablePositions[i]] = playersMarker;

        if (playersMarker == gameBoard.computersMarker) {
            let result = minimax(newBoard, gameBoard.playersMarker);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, gameBoard.computersMarker);
            move.score = result.score;
        }

        newBoard[availablePositions[i]] = move.index;

        moves.push(move);
    }

    let bestMove;
    if (playersMarker === gameBoard.computersMarker) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            } 
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
    
        }
    }
    return moves[bestMove];
};


//dont look at me resuing code ahhh, tic tac toe is too painful
function checkIfPlayerWinning() {
    board = gameBoard.board;
    winningCombinations = winningPositions.winningCombinations;
    
    currentCrossPlacements = [];
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] == "X") {
            currentCrossPlacements.push(i)
        }
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(val => currentCrossPlacements.includes(val))) {
            return true;
        }
    }
    return false;
}

//dont look at me resuing code ahhh, tic tac toe is too painful
function checkIfComputerWinning() {
    board = gameBoard.board;
    winningCombinations = winningPositions.winningCombinations;
    
    currentNoughtPlacements = [];
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] == "O") {
            currentNoughtPlacements.push(i)
        }
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(val => currentNoughtPlacements.includes(val))) {
            return true;
        }
    }
    return false;
}

function emptyIndices(){
    var origBoard = ["X","" ,"","","" ,"", "" ,"",""];
    board = gameBoard.board;
    for (let i = 0; i < board.length; i++) {
        if (board[i] == null) {
            console.log("fuck js");
            board[i] == " ";
        }
    }
    console.log(board);
    console.log(origBoard.filter(s => s != "O" && s != "X"), 'hi again');
    console.log(board.filter(s => s != "O" && s != "X"), 'hi again');

    return gameBoard.board.filter(s => s != "O" && s != "X");
}

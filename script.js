function setPlayerMove(playersMarker, noughts, crosses, gameGrid) {
    if (playersMarker == "X") {
        noughts.style.visibility = 'hidden';
    } else {
        crosses.style.visibility = 'hidden';
    }
    gameGrid.innerText = playersMarker;
    gameBoard.board[gameGrid.getAttribute("index")] = playersMarker;
    // console.log(gameBoard.board);
}

function setComputerMove(computersMarker, markerLocation) {
    document.querySelector(`button[index="${markerLocation}"]`).innerText = computersMarker;
    gameBoard.board[markerLocation] = computersMarker;
}

const gameBoard = (() => {
    let board = Array(9)
    let playersMarker = "X";
    
    const crosses = document.getElementById('X');
    crosses.addEventListener('click', () => {
        playersMarker = "X";
        crosses.style.backgroundColor = "blue";
    })
    const noughts = document.getElementById('O');
    noughts.addEventListener('click', () => {
        playersMarker = "O";
        noughts.style.backgroundColor = "yellow";
    })
    const gameBoardUI = document.querySelector('.game-board');
    
    for (let i = 0; i < 9; i++) {
        let gameGrid = document.createElement('button');
        gameGrid.setAttribute("index", i)
        gameGrid.classList = "game-grid-object";
        
        gameGrid.addEventListener('click', () => {
            setPlayerMove(playersMarker, noughts, crosses, gameGrid);
            computersMove(gameGrid);
        })
        gameBoardUI.appendChild(gameGrid);
    }
    gameRestart();
    return {board, playersMarker, noughts, crosses};
})();

function gameRestart() {
    const restart = document.getElementById("restartBtn");
    const gameBoardItems = document.querySelector(".game-board").children;
    const gameBoardItemsArray = [...gameBoardItems]; 
    restart.addEventListener('click', () => {
        gameBoardItemsArray.forEach((item) => item.textContent = '');
        gameBoard.board = Array(9);
    })
};

function computersMove(gameGrid) {
    let computersMarker;
    gameBoard.playersMarker == "X" ? computersMarker = "O" : computersMarker = "X";
    markerLocation = randomMove(computersMarker);
    console.log(markerLocation);
    setComputerMove(computersMarker, markerLocation)
}

//shuffle the board array, choose first empty space
function randomMove(computersMarker) {
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

const Player = (() => {
    //functions
    


    //return all of them
    return {

    }
});
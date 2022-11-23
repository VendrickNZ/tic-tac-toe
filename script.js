function changeBoard(board) {

}

function setMove(playersMarker, board, noughts, crosses, gameGrid) {
    if (playersMarker == "X") {
        noughts.style.visibility = 'hidden';
    } else {
        crosses.style.visibility = 'hidden';
    }
    gameGrid.innerText = playersMarker;
    gameBoard.board[gameGrid.getAttribute("index")] = playersMarker;
    console.log(gameBoard.board);
}

const gameBoard = (() => {
    let board = Array(9)

    playersMarker = "X";
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
            setMove(playersMarker, board, noughts, crosses, gameGrid);
        })
        gameBoardUI.appendChild(gameGrid);
    }
    gameRestart();
    return {board};
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


const Player = (() => {
    //functions
    


    //return all of them
    return {

    }
});
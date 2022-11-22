const gameBoard = (() => {
    let index = 0;
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
            if (playersMarker == "X") {
                noughts.style.visibility = 'hidden';
            } else {
                crosses.style.visibility = 'hidden';
            }
            gameGrid.innerText = playersMarker;
            board[gameGrid.getAttribute("index")] = playersMarker;
        })
        gameBoardUI.appendChild(gameGrid);
    }
})();
const Player = (() => {
    //functions
    


    //return all of them
    return {

    }
});
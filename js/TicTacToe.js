//Variables globales
let currentPlayer = 'X';
let player1Score = 0;
let player2Score = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const ticTacToeBoard = document.getElementById('ticTacToeBoard');
const player1ScoreElement = document.getElementById('player1Score');
const player2ScoreElement = document.getElementById('player2Score');
const replayButton = document.getElementById('replay');
const resetButton = document.getElementById('reset');
const winnerMessageElement = document.getElementById('winnerMessage');

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();

        if (checkWinner()) {
            if (currentPlayer === 'X') {
                player1Score++;
                winnerMessageElement.textContent = 'Player 1 gana la partida!';
            } else {
                player2Score++;
                 winnerMessageElement.textContent = 'Player 2 gana la partida!';
            }
            updateScore();
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            // It's a tie
            winnerMessageElement.textContent = 'Empate!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function renderBoard() {
    ticTacToeBoard.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell === 'X') {
            cellElement.classList.add('X');
        } else if (cell === 'O') {
            cellElement.classList.add('O');
        }
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        ticTacToeBoard.appendChild(cellElement);
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function updateScore() {
    player1ScoreElement.textContent = player1Score;
    player2ScoreElement.textContent = player2Score;
    
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    gameActive = true;
    currentPlayer = 'X';
}

function replayGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    gameActive = true;
    currentPlayer = 'X';
    winnerMessageElement.textContent = '';
}
function resetScores() {
    player1Score = 0;
    player2Score = 0;
    updateScore();
    winnerMessageElement.textContent = `Ganador del juego: ${overallWinner}`;
}

replayButton.addEventListener('click', replayGame);
resetButton.addEventListener('click', () => {
    resetGame();
    if (player1Score + player2Score > 0) {
        const overallWinner = player1Score > player2Score ? 'Player 1 (X)' : 'Player 2 (O)';
        winnerMessageElement.textContent = `Ganador del juego: ${overallWinner}`;
    }
    resetScores();
});

// Initial render
renderBoard();
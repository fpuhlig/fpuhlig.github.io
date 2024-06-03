let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let playerA = '';
let playerB = '';

function startGame() {
    playerA = document.getElementById('playerA').value;
    playerB = document.getElementById('playerB').value;
    if (playerA && playerB) {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        updatePlayerInfo();
    } else {
        alert('Bitte geben Sie beide Spielernamen ein.');
    }
}

function resetGame() {
    currentPlayer = 'X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    document.querySelectorAll('#board button').forEach(button => {
        button.disabled = false;
        button.textContent = '';
    });
    updatePlayerInfo();
}

function updatePlayerInfo() {
    document.getElementById('playerSymbols').innerHTML = `<div>${currentPlayer === 'X' ? "&#8594;" : ""}${playerA}: X</div><div>${currentPlayer === 'X' ? "" : "&#8594;"}${playerB}: O</div>`;
}

function makeMove(button, row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        button.textContent = currentPlayer;
        button.disabled = true;
        if (checkWin()) {
            setTimeout(() => {
                alert(`${currentPlayer === 'X' ? playerA : playerB} hat gewonnen!`);
                resetGame();
            }, 100);
        } else if (isDraw()) {
            setTimeout(() => {
                alert('Unentschieden!');
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerInfo();
        }
    }
}

function checkWin() {
    const lines = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[2][0], board[1][1], board[0][2]]
    ];
    return lines.some(line => line.every(cell => cell === currentPlayer));
}

function isDraw() {
    return board.flat().every(cell => cell !== '');
}

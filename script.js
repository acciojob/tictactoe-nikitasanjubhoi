let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'x';
let board = Array(9).fill('');
let isGameOver = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

// Handle submit button
document.getElementById('submit').addEventListener('click', () => {
  player1 = document.getElementById('player1').value.trim();
  player2 = document.getElementById('player2').value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.getElementById('player-input').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  currentPlayer = player1;
  currentSymbol = 'x';
  updateMessage(`${currentPlayer}, you're up`);
});

function updateMessage(msg) {
  document.querySelector('.message').textContent = msg;
}

// Add click handlers to cells
document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (isGameOver || cell.textContent !== '') return;

    cell.textContent = currentSymbol;
    board[index] = currentSymbol;

    if (checkWinner()) {
      updateMessage(`${currentPlayer}, congratulations you won!`);
      isGameOver = true;
      return;
    }

    if (board.every(cell => cell !== '')) {
      updateMessage("It's a draw!");
      isGameOver = true;
      return;
    }

    // Switch turn
    if (currentSymbol === 'x') {
      currentSymbol = 'o';
      currentPlayer = player2;
    } else {
      currentSymbol = 'x';
      currentPlayer = player1;
    }

    updateMessage(`${currentPlayer}, you're up`);
  });
});

function checkWinner() {
  return winningCombinations.some(([a, b, c]) => {
    return (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[b] === board[c]
    );
  });
}

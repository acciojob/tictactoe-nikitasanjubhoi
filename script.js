//your JS code here. If required.
let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'X';
let board = Array(9).fill('');
let isGameOver = false;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

document.getElementById('submit').addEventListener('click', () => {
  player1 = document.getElementById('player-1').value.trim();
  player2 = document.getElementById('player-2').value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.getElementById('player-input').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  currentPlayer = player1;
  currentSymbol = 'X';
  updateMessage(`${currentPlayer}, you're up`);
});

function updateMessage(msg) {
  document.querySelector('.message').textContent = msg;
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;

    if (isGameOver || board[index] !== '') return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      updateMessage(`${currentPlayer}, congratulations you won!`);
      isGameOver = true;
    } else if (board.every(cell => cell !== '')) {
      updateMessage("It's a draw!");
      isGameOver = true;
    } else {
      // Switch player
      if (currentSymbol === 'X') {
        currentSymbol = 'O';
        currentPlayer = player2;
      } else {
        currentSymbol = 'X';
        currentPlayer = player1;
      }
      updateMessage(`${currentPlayer}, you're up`);
    }
  });
});

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      board[a] === currentSymbol &&
      board[b] === currentSymbol &&
      board[c] === currentSymbol
    );
  });
}


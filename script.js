const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const player1ChoiceInput = document.getElementById('player1-choice');
const startGameButton = document.getElementById('start-game');
const gameContainer = document.querySelector('.game-container');
const gameStatus = document.getElementById('game-status');
const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const winnerText = document.getElementById('winner-text');
const restartGameButton = document.getElementById('restart-game');
const resetGameButton = document.getElementById('reset-game');
const player1ScoreDisplay = document.getElementById('player1-score').querySelector('span');
const player2ScoreDisplay = document.getElementById('player2-score').querySelector('span');

let player1 = '';
let player2 = '';
let player1Choice = '';
let player2Choice = '';
let currentPlayer = '';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let player1Score = 0;
let player2Score = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

player1ChoiceInput.addEventListener('change', () => {
  player2NameInput.disabled = false;
});

startGameButton.addEventListener('click', () => {
  player1 = player1NameInput.value;
  player1Choice = player1ChoiceInput.value;
  player2 = player2NameInput.value;

  if (!player1 || !player2) {
    alert('Both player names must be filled!');
    return;
  }

  player2Choice = player1Choice === 'X' ? 'O' : 'X';
  currentPlayer = player1Choice === 'X' ? player1 : player2;

  document.querySelector('.player-setup').classList.add('hidden');
  gameContainer.classList.remove('hidden');
  document.querySelector('.scoreboard').classList.remove('hidden');
  document.querySelector('.theme-selector').classList.remove('hidden');
  updateGameStatus();
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer === player1 ? player1Choice : player2Choice;
    cell.textContent = board[cellIndex];
    cell.setAttribute('data-cell', board[cellIndex]);

    if (checkWinner()) {
      gameActive = false;
      displayWinner(currentPlayer);
    } else if (checkDraw()) {
      gameActive = false;
      displayDraw();
    } else {
      switchPlayer();
      updateGameStatus();
    }
  });
});

restartGameButton.addEventListener('click', () => {
  resetGame();
});

resetGameButton.addEventListener('click', () => {
  newGame();
});

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function updateGameStatus() {
  gameStatus.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === (currentPlayer === player1 ? player1Choice : player2Choice));
  });
}

function checkDraw() {
  return board.every(cell => cell !== '');
}

function displayWinner(winner) {
  winnerText.textContent = `${winner} Wins!`;
  winnerMessage.classList.remove('hidden');
  gameContainer.classList.add('hidden');
  winnerText.classList.add('congrats-animation');

  if (winner === player1) {
    player1Score++;
    player1ScoreDisplay.textContent = player1Score;
  } else {
    player2Score++;
    player2ScoreDisplay.textContent = player2Score;
  }
}

function displayDraw() {
  winnerText.textContent = "It's a Draw!";
  winnerMessage.classList.remove('hidden');
  gameContainer.classList.add('hidden');
  winnerText.classList.add('congrats-animation');
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = player1Choice === 'X' ? player1 : player2;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.removeAttribute('data-cell');
  });

  winnerMessage.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  updateGameStatus();
}


function newGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = player1Choice === 'X' ? player1 : player2;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.removeAttribute('data-cell');
  });

  winnerMessage.classList.add('hidden');
  gameContainer.classList.add('hidden');
  document.querySelector('.player-setup').classList.remove('hidden');
  
  document.getElementById('player1-score').querySelector('span').textContent = '0';
  document.getElementById('player2-score').querySelector('span').textContent = '0';

  document.getElementById('player1-name').value = '';
  document.getElementById('player2-name').value = '';

  document.querySelector('.scoreboard').classList.add('hidden');
  document.querySelector('.theme-selector').classList.add('hidden');
  player1Score=0;
  player2Score=0;

  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.value = 'default';
  }
}



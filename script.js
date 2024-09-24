// Player Setup
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const player1ChoiceInput = document.getElementById('player1-choice');
const startGameButton = document.getElementById('start-game');
const gameContainer = document.querySelector('.game-container');
const gameStatus = document.getElementById('game-status');
const winnerMessage = document.getElementById('winner-message');
const winnerText = document.getElementById('winner-text');
const restartGameButton = document.getElementById('restart-game');
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

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Player choice event listener
player1ChoiceInput.addEventListener('change', () => {
  player2NameInput.disabled = false;
});

// Start game button click event
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
  updateGameStatus();
});

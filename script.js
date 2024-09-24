// Get references to all input fields and buttons by their IDs
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

// Initialize variables for the game
let player1 = '';
let player2 = '';
let player1Choice = '';
let player2Choice = '';
let currentPlayer = '';
let gameActive = true; // This tracks if the game is still ongoing
let board = ['', '', '', '', '', '', '', '', '']; // Empty game board
let player1Score = 0;
let player2Score = 0;

// Define the winning combinations for the game
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Enable Player 2 input field once Player 1 choice (X/O) is made
player1ChoiceInput.addEventListener('change', () => {
  player2NameInput.disabled = false;
});

// Handle the Start Game button click event
startGameButton.addEventListener('click', () => {
  // Assign player names and choices from input fields
  player1 = player1NameInput.value;
  player1Choice = player1ChoiceInput.value;
  player2 = player2NameInput.value;

  // Check if both player names are filled
  if (!player1 || !player2) {
    alert('Both player names must be filled!');
    return;
  }

  // Check if player names are different
  if(player1 === player2){
    alert('Both player names must be different!');
    return;
  }

  // Assign player 2's choice (opposite of player 1)
  player2Choice = player1Choice === 'X' ? 'O' : 'X';

  // Set the current player to start based on choice
  currentPlayer = player1Choice === 'X' ? player1 : player2;

  // Hide the player setup and show the game and scoreboard
  document.querySelector('.player-setup').classList.add('hidden');
  gameContainer.classList.remove('hidden');
  document.querySelector('.scoreboard').classList.remove('hidden');
  document.querySelector('.theme-selector').classList.remove('hidden');
  document.getElementById('reset-game').classList.remove('hidden');

  // Update game status with the current player's turn
  updateGameStatus();
});

// Handle cell clicks during the game
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const cellIndex = Array.from(cells).indexOf(cell); // Get the index of the clicked cell

    // If cell is already filled or game is over, do nothing
    if (board[cellIndex] !== '' || !gameActive) return;

    // Mark the cell with the current player's choice (X or O)
    board[cellIndex] = currentPlayer === player1 ? player1Choice : player2Choice;
    cell.textContent = board[cellIndex];
    cell.setAttribute('data-cell', board[cellIndex]);

    // Check if there is a winner, a draw, or continue the game
    if (checkWinner()) {
      gameActive = false; // End the game if there is a winner
      displayWinner(currentPlayer);
    } else if (checkDraw()) {
      gameActive = false; // End the game if it's a draw
      displayDraw();
    } else {
      switchPlayer(); // Switch turn to the other player
      updateGameStatus();
    }
  });
});

// Restart the game (same players, same score)
restartGameButton.addEventListener('click', () => {
  resetGame();
});

// Reset everything (new game, new players)
resetGameButton.addEventListener('click', () => {
  newGame();
});

// Switch to the next player
function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

// Update the game status with the current player's turn
function updateGameStatus() {
  gameStatus.textContent = `${currentPlayer}'s Turn`;
}

// Check if there is a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === (currentPlayer === player1 ? player1Choice : player2Choice));
  });
}

// Check if the game is a draw (no empty cells left)
function checkDraw() {
  return board.every(cell => cell !== '');
}

// Display the winner message and update score
function displayWinner(winner) {
  winnerText.textContent = `${winner} Wins!`;
  winnerMessage.classList.remove('hidden');
  gameContainer.classList.add('hidden');
  document.getElementById('reset-game').classList.add('hidden');
  winnerText.classList.add('congrats-animation'); // Add a victory animation

  // Update score for the winning player
  if (winner === player1) {
    player1Score++;
    player1ScoreDisplay.textContent = player1Score;
  } else {
    player2Score++;
    player2ScoreDisplay.textContent = player2Score;
  }
}

// Display draw message
function displayDraw() {
  winnerText.textContent = "It's a Draw!";
  winnerMessage.classList.remove('hidden');
  gameContainer.classList.add('hidden');
  document.getElementById('reset-game').classList.add('hidden');
  winnerText.classList.add('congrats-animation');
}

// Reset the game board but keep scores and players
function resetGame() {
  board = ['', '', '', '', '', '', '', '', '']; // Clear board
  gameActive = true; // Reactivate the game
  currentPlayer = player1Choice === 'X' ? player1 : player2; // Set the current player

  cells.forEach(cell => {
    cell.textContent = ''; // Clear cell display
    cell.removeAttribute('data-cell'); // Remove data attribute
  });

  winnerMessage.classList.add('hidden'); // Hide winner message
  gameContainer.classList.remove('hidden'); // Show game board again
  document.getElementById('reset-game').classList.remove('hidden'); // Show reset button
  updateGameStatus(); // Update turn display
}

// Reset everything for a new game, including scores and player names
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
  document.querySelector('.player-setup').classList.remove('hidden'); // Show player setup again
  
  // Reset scores and player inputs
  document.getElementById('player1-score').querySelector('span').textContent = '0';
  document.getElementById('player2-score').querySelector('span').textContent = '0';
  document.getElementById('player1-name').value = '';
  document.getElementById('player2-name').value = '';

  document.querySelector('.scoreboard').classList.add('hidden');
  document.querySelector('.theme-selector').classList.add('hidden');
  document.getElementById('reset-game').classList.add('hidden');
  player1Score = 0;
  player2Score = 0;

  // Reset theme to default
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.value = 'default';
    container.classList.remove('default-theme', 'space-theme', 'nature-theme', 'retro-theme');
  }
}

// Theme selection functionality
const themeSelect = document.getElementById('theme-select');
const container = document.querySelector('.container');

// Change theme based on selection
themeSelect.addEventListener('change', () => {
  const selectedTheme = themeSelect.value;
  
  // Remove any previously applied theme class
  container.classList.remove('default-theme', 'space-theme', 'nature-theme', 'retro-theme');
  
  // Apply the selected theme class
  if (selectedTheme === 'space') {
    container.classList.add('space-theme');
  } else if (selectedTheme === 'nature') {
    container.classList.add('nature-theme');
  } else if (selectedTheme === 'retro') {
    container.classList.add('retro-theme');
  } else {
    container.classList.add('default-theme');
  }
});

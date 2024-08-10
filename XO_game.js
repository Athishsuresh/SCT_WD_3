const boxes = document.querySelectorAll('.content div'); // Select all the game boxes
const turnDisplay = document.querySelector('.turn .t2'); // Display the current player
const resetButton = document.querySelector('.reset-btn'); // Reset button
const backButton = document.querySelector('.Back-btn'); // Back button (if needed for navigation)
let currentPlayer = 'X'; // Start with Player X
let gameActive = true; // Game state (active/inactive)
let gameState = ['', '', '', '', '', '', '', '', '']; // Array to store the current state of the game

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a player's move
function handleBoxClick(index) {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;
        boxes[index].style.pointerEvents = 'none'; // Disable further clicks on this box

        if (checkWin()) {
            turnDisplay.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
        } else if (gameState.every(cell => cell !== '')) {
            turnDisplay.textContent = `It's a Draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.textContent = currentPlayer; // Update the turn display
        }
    }
}

// Function to check for a win
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.textContent = '';
        box.style.pointerEvents = 'auto'; // Re-enable clicking
    });
    turnDisplay.textContent = currentPlayer; // Reset the turn display
}

// Add event listeners to the boxes
boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(index));
});

// Add event listener to the reset button
resetButton.addEventListener('click', resetGame);

// Optional: Add functionality to the back button if needed
backButton.addEventListener('click', () => {
    // Implement back button functionality here, e.g., navigate to the previous page
    window.history.back();
});

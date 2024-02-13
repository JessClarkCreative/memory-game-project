const gameContainer = document.getElementById("game");
const restartButton = document.querySelector(".restartButton");

// Array of colors for the game cards
const COLORS = [
  "paleturquoise", 
  "lightsalmon", 
  "plum", 
  "paleturquoise", 
  "lightsalmon", 
  "plum"];

// Initialize variables using destructuring assignment for a more compact syntax
let [shuffledColors, clickCount, firstCard, secondCard, canClick, matchesFound] = [shuffle(COLORS), 0, null, null, true, 0];

// Function to create div elements for each color in the array
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    // Add color and "hidden" class to the div
    newDiv.classList.add(color, "hidden");
    // Add click event listener to handle card clicks
    newDiv.addEventListener("click", handleCardClick);
    // Append the new div to the game container
    gameContainer.append(newDiv);
  }
}

// Function to handle the click event on a card
function handleCardClick(event) {
  // If clicking is not allowed or clicking the same card twice, exit the function
  if (!canClick || event.target === firstCard) return;
  // Get the clicked card element
  const clickedCard = event.target;
  // Set the background color to the card's color and reveal it
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  clickedCard.classList.remove("hidden");
  // Check if it's the first or second card clicked
  clickCount === 0 ? (firstCard = clickedCard, clickCount = 1) : (secondCard = clickedCard, clickCount = 0, canClick = false, checkForMatch());
}

// Function to check if the two clicked cards match
function checkForMatch() {
  if (firstCard.classList[0] === secondCard.classList[0]) {
    // If matched, remove click event listeners and mark as matched
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    // Increment matchesFound and check if all matches are found
    if (++matchesFound === COLORS.length / 2) {
      // All matches found, delay the alert
      setTimeout(() => alert("Congratulations! You won the game!"), 300);
    }

    // Reset the cards for the next pair
    resetCards();
  } else {
    // Not a match, delay hiding the cards
    setTimeout(() => {
      firstCard.style.backgroundColor = secondCard.style.backgroundColor = "";
      firstCard.classList.add("hidden");
      secondCard.classList.add("hidden");
      // Reset the cards for the next pair
      resetCards();
    }, 500);
  }
}

// Function to reset the state of the clicked cards
function resetCards() {
  [firstCard, secondCard, canClick] = [null, null, true];
}

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index and swap elements
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to restart the game
function restartGame() {
  location.reload();
}

// Add an event listener for the restart button
restartButton.addEventListener("click", restartGame);
// Create divs for the shuffled colors to initialize the game
createDivsForColors(shuffledColors);

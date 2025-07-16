const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
initGame();

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""]; // surwaat me khaali h sab

  // Setting current player to X.

  // Making all grid positions empty ("").
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
// ${iske andar varible likh sakte h aur back string ke andar}

function checkGameOver() {
  let answer = "";

  // answer will hold the winner’s symbol.
  //each position har index se check karega 0 1 2 hi nahi saare indexes its a loop
  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] != "" ||
        gameGrid[position[1]] != "" ||
        gameGrid[position[2]] != "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") answer = "X";
      else {
        answer = "O";
      }
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // now we know X/O is Winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");

      //  Adds a win class to winning boxes (for special styling).

      //  To highlight the winner visually.
    }
  });

  // Check if winner was found
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;

    //     If there's a winner:

    // Show winner text.

    // Show the "New Game" button.

    // Stop further checking.
  }

  // Check for a tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");

    // newGameBtn.addEventListener("click", initGame);
    //  When "New Game" button is clicked, restart the game using initGame().
  }
} //  Final closing brace for checkGameOver()
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);

//  When "New Game" button is clicked, restart the game using initGame().

let currentPlayer = "";
let player1Name = "";
let player2Name = "";
let board = ["", "", "", "", "", "", "", "", ""];
let moveHistory = []; // Maintain a history of previous moves
let PLAYERS = {};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  player1Name = document.getElementById("player1").value || "Player 1";
  player2Name = document.getElementById("player2").value || "Player 2";
  currentPlayer = player1Name;
  PLAYERS = {
    [player1Name]: "X",
    [player2Name]: "O",
  };
  let nameDisplayer = document.querySelector(".name-displayer");
  nameDisplayer.innerHTML = `${player1Name} (${PLAYERS[player1Name]}) vs ${player2Name} (${PLAYERS[player2Name]})`;
  nameDisplayer.style.display = "block";
  document.getElementById("player-names").style.display = "none";
  document.getElementById("actual-game").style.display = "block";
}

function handleMove(cellIndex) {
  if (currentPlayer && board[cellIndex] === "" && !checkWinner()) {
    // Save previous move to history
    moveHistory.push({ player: currentPlayer, board: [...board] });

    board[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].innerText =
      PLAYERS[currentPlayer];
    if (checkWinner()) {
      document.getElementById("message").innerText = `${currentPlayer} wins!`;
    } else if (board.every((cell) => cell !== "")) {
      document.getElementById("message").innerText = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
    }
  }
}

function checkWinner() {
  return winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  currentPlayer = "";
  board = ["", "", "", "", "", "", "", "", ""];
  document.getElementById("message").innerText = "";
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));
  document.getElementById("player-names").style.display = "flex";
  document.querySelector(".name-displayer").style.display = "none";
  moveHistory = [];
}

function undoMove() {
  if (moveHistory.length > 0) {
    const lastMove = moveHistory.pop();
    currentPlayer = lastMove.player;
    board = [...lastMove.board];
    document.querySelectorAll(".cell").forEach((cell, index) => {
      cell.innerText = board[index] ? PLAYERS[board[index]] : "";
    });
    document.getElementById("message").innerText = "";
  }
}

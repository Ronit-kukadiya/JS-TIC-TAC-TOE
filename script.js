let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let win = document.querySelector(".msg");
let score = document.querySelectorAll(".score");

scorecountX = 0;
scorecountO = 0;

score.forEach((btn) => {
  score[0].innerText = "X:";
  score[0].style.color = "#780a0d";
  score[1].innerText = "O:";
  score[1].style.color = "#022c46";
  btn.disabled = true;
});

let turnx = true;
let winnerFound = false;
count = 0;

const wincondi = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnx) {
      box.innerText = "X";
      box.style.color = "#FF595E";
      document.body.style.backgroundColor = "#1982C4";
      turnx = false;
    } else {
      box.innerText = "O";
      box.style.color = "#1982C4";
      document.body.style.backgroundColor = "#FF595E";
      turnx = true;
    }
    box.disabled = true;
    count = count + 1;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of wincondi) {
    let pos0 = boxes[pattern[0]].innerText;
    let pos1 = boxes[pattern[1]].innerText;
    let pos2 = boxes[pattern[2]].innerText;

    if (pos0 !== "" && pos0 === pos1 && pos1 === pos2) {
      console.log(pos0 + " is winner");
      disablebox();
      showWinner(pos0);
      updateScore(pos0);
      winnerFound = true;
      if (pos0 == "X") {
        turnx = false;
      } else {
        turnx = true;
      }
      break;
    }
  }
  if (!winnerFound && count === 9) {
    win.innerText = "DRAW";
    win.classList.remove("hide");
  }
};

const showWinner = (winner) => {
  win.style.color = turnx ? "#1982C4" : "#FF595E";
  win.innerText = `${winner} WON!!`;
  win.classList.remove("hide");
};

const updateScore = (winner) => {
  if (winner == "X") {
    scorecountX++;
    score[0].style.color = "#780a0d";
    score[0].innerText = `X: ${scorecountX}`;
  } else {
    scorecountO++;
    score[1].style.color = "#022c46";
    score[1].innerText = `O: ${scorecountO}`;
  }
};

const enablebox = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disablebox = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const resetGame = () => {
  count = 0;
  enablebox();
  win.classList.add("hide");
  // if(pos0 == "X"){
  //   document.body.style.backgroundColor = "#FF595E";
  // }
  // else{
  //   document.body.style.backgroundColor = "#1982C4";
  // }
};
reset.addEventListener("click", resetGame);

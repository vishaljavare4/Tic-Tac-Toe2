let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;  // For tracking the Draw.

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBOxes(); // The new game button clicked all the boxes enabled with the help of this function.
    msgContainer.classList.add("hide");// Hide message container againe as soon as the game will be reset.
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {  // Adding event listener for clicking operation on boxes.
        if(turnO){            // If it is player O's turn, then...
            box.innerText = "O";
            turnO = false; // I will set it to false, because it should not be true for the next time
        } else {             // If player X's turn, then...
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // For the stick that value for that box.
        count++;
        let isWinner = checkWinner();    // For checking the winner.
        if(count === 9 && !isWinner) {
            Draw();
        }
    });
});

const Draw = () => {
    msg.innerText = `Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {// For disabling the boxes after showing the winner.
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBOxes = () => {// When the new game starts again then all the boxes will be enabled here.
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";// With help of this all the boxes will be reseted, which means all the values will be removed.
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // After showing the winner the boxes will be disabled with the help of this function.
};



const checkWinner = () => {
    for(let pattern of winPatterns) {
        // console.log(
        //     boxes[pattern[0]].innerText, 
        //     boxes[pattern[1]].innerText, 
        //     boxes[pattern[2]].innerText
        // );  // For checking the first position element 
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if(position1 != "" && position2 != "" && position3 != "") {
            if(position1 === position2 && position2 === position3) {
                // console.log("Winner is", position1);
                showWinner(position1);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);


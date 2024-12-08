const buttons = document.querySelectorAll(".choice");
const [playerDisplay, computerDisplay] = [document.querySelector(".d1"), document.querySelector(".d2")];
const [playerScore, computerScore, statusDisplay] = [
    document.querySelector(".main1"),
    document.querySelector(".main2"),
    document.querySelector(".main3"),
];
const playerHistoryDisplay = document.querySelector(".playerHistory");
const resetBtn = document.querySelector("#reset");

let playerPoints = 0, computerPoints = 0, playerHistory = [];
// payer choices 
const choices = {
    rock: "https://media.istockphoto.com/id/950975218/photo/male-hand-body-parts.jpg?s=612x612&w=0&k=20&c=H1Vy-t6N7kPnSRMqsMPNxV0azncN2bKylwnOQ28S-Wo=",
    paper: "https://thumbs.dreamstime.com/b/human-raised-hand-open-palm-isolated-white-background-human-hand-open-palm-isolated-white-194516844.jpg",
    scissor: "https://media.istockphoto.com/id/891746330/photo/childrens-hand-showing-two.jpg?s=612x612&w=0&k=20&c=ZJGGrWp1qP6PUzAMdBz9XvOjG-9MIcjoDMc7NMd4qEU=",
};

// audio files might not work in your computers add additional files for sounds 
const buttonClickSound = new Audio('sounds/pick-92276.mp3');
const resetClickSound = new Audio('sounds/reset-click.mp3');

// update palyer history
function updatePlayerHistory() {
    playerHistoryDisplay.innerText = playerHistory
        .map(({ round, choice, result }) => `Round ${round}: ${choice} - ${result}`)
        .join("\n");
}

// Random computer choice
const randomChoice = () => Object.keys(choices)[Math.floor(Math.random() * 3)];

// Handle button click
buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttonClickSound.play(); // Play sound effect
        const playerChoice = button.dataset.choice;
        const computerChoice = randomChoice();

        displayImage(playerDisplay, choices[playerChoice]);
        displayImage(computerDisplay, choices[computerChoice]);

        const result = determineResult(playerChoice, computerChoice);
        playerHistory.push({ round: playerHistory.length + 1, choice: playerChoice, result });

        updatePlayerHistory();

        if (playerPoints + computerPoints === 5) {
            declareRank();
            disableButtons(true);
        }
    });
});

// Display the image
function displayImage(container, url) {
    container.innerHTML = `<img class="choice-image" src="${url}" width="200" height="200">`;
}

// Determine the result of the round
function determineResult(player, computer) {
    if (player === computer) {
        statusDisplay.innerText = "It's a draw!";
        return "Draw";
    }

    const outcomes = { rock: "scissor", scissor: "paper", paper: "rock" };
    if (outcomes[player] === computer) {
        playerPoints++;
        playerScore.innerText = playerPoints;
        return "Win";
    } else {
        computerPoints++;
        computerScore.innerText = computerPoints;
        return "Loss";
    }
}


// Declare rank
function declareRank() {
    const winRate = (playerPoints / 5) * 100;
    let rank = "Beginner";
    let feedback = "Keep practicing!";

    if (winRate >= 80) [rank, feedback] = ["Master", "Exceptional!"];
    else if (winRate >= 60) [rank, feedback] = ["Expert", "Great work!"];
    else if (winRate >= 40) [rank, feedback] = ["Intermediate", "You're improving!"];

    statusDisplay.innerText = `Rank: ${rank} - ${feedback}`;
}

// Reset the game
function resetGame() {
    resetClickSound.play(); // Play reset sound effect
    playerPoints = computerPoints = 0;
    playerScore.innerText = computerScore.innerText = "0";
    statusDisplay.innerText = "Make your choice";
    playerHistory = [];
    updatePlayerHistory();
    disableButtons(false);
}

// Disable/enable buttons
function disableButtons(disabled) {
    buttons.forEach(button => button.disabled = disabled);
}

// Event listener for reset
resetBtn.addEventListener("click", resetGame);

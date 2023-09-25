// let realName = prompt("what is your name?");
let activate = document.querySelector(".startButton");
let totalScoreElement = document.querySelector(".resultScore");
let scoreHistory;
try {
    scoreHistory = localStorage.getItem('scoreHistory');
} catch (error) {
    console.log("scoreHistory is not available");
    totalScoreElement.textContent = "Total Score is unavailable from local storage.";
}

if (scoreHistory) {
    scoreHistory = JSON.parse(scoreHistory);
} else {
    scoreHistory = [];
};
let prevScore = scoreHistory[scoreHistory.length -1] || 0;
let totalScore = prevScore;
if (totalScoreElement) {
    totalScoreElement.textContent = `Total Score: ${totalScore}`;
}
let questionAnswered = false;
let nextQuestion = document.querySelector(".activate");
let prevQuestion = document.querySelector(".previous");

// event listener to start the quiz
if (activate) {
    activate.addEventListener("click", function() {
        let realUser = document.getElementById("userName");
        let agentUser = prompt('Enter Quiz takers Name');
        realUser.textContent = agentUser;
        console.log(realUser);
        resetScore();
    })
}

function resetScore() {
    localStorage.setItem('scoreHistory', JSON.stringify([]));
}

// logic for checking answer and updating score
function updateScore(isCorrect, correctAnswer) {
    let score = 0
    let displayMsg = document.querySelector(".answer");
    
    if(isCorrect) {
        displayMsg.textContent = "You are correct"
        displayMsg.style.color = "green"
        score = 2;
        alert(`You got ${score} points`)
        // console.log(score + "TQscore");
        totalScore = prevScore + score
    } else {
        displayMsg.textContent = "You are wrong the correct answer is '" + correctAnswer + "'"
        displayMsg.style.color = "red"
        score = 0;
        alert(`You got ${score} points`)
        // console.log(score + "TQscore");
        totalScore = prevScore + score    
    }
    totalScoreElement.textContent = `Total Score: ${totalScore}`;
    // console.log(totalScore + "totalScore")
    questionAnswered = true; 
}

// function to save score progress
function saveProgress() {
        if (questionAnswered) {
            scoreHistory.push(totalScore);
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
            // console.log(totalScore + "saving");
        }
       questionAnswered = false; 
}

// score-progress
// function to revert score progress
function revertProgress() {
        scoreHistory.pop();
        totalScore = scoreHistory[scoreHistory.length-1] || 0;
        localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
        questionAnswered = true;
        window.history.back();
}
=======
let activate = document.querySelector(".startButton").addEventListener("click", function() {
    let realUser = document.getElementById("userName");
    let agentUser = prompt('Enter Your Name To Start');
    realUser.textContent = agentUser;
    console.log(realUser);
})

// next question button event listener to trigger saving the total score
if (nextQuestion) {
    nextQuestion.addEventListener("click", saveProgress);
};
// previous question button event listener to trigger reverting the total score 
if (prevQuestion) {
    prevQuestion.addEventListener("click", revertProgress);
};
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
// console.log(scoreHistory);

let prevScore = scoreHistory[scoreHistory.length -1] || 0;
let totalScore = prevScore;
if (totalScoreElement) {
    totalScoreElement.textContent = `Total Score: ${totalScore}`;
}
let questionAnswered = false;
let nextQuestion = document.querySelector(".activate");
let prevQuestion = document.querySelector(".previous");
let currentQuestion = localStorage.getItem('currentQuestion');
// console.log(currentQuestion);

function checkCurrentQuestion() {
    if (currentQuestion) {
        currentQuestion = JSON.parse(currentQuestion);
    } else {
        currentQuestion = 1;
    }
};

// event listener to start the quiz
if (activate) {
    activate.addEventListener("click", function() {
        let realUser = document.getElementById("userName");
        let agentUser = prompt('Enter Quiz takers Name');
        realUser.textContent = agentUser;
        console.log(realUser);
        resetQuestions();
        resetScore();
    })
}

function resetScore() {
    localStorage.setItem('scoreHistory', JSON.stringify([]));
}

function resetQuestions() {
    currentQuestion = 1;
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
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
function saveProgress(event) {
        if (questionAnswered) {
            if (currentQuestion === 7) {  // Replace 7 with the total number of questions currently available to answer
                return; 
            } 
            scoreHistory.push(totalScore);
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
            // console.log(totalScore + "saving");
            currentQuestion++;
            localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
        } 
       questionAnswered = false;
}

// score-progress
// function to revert score progress
function revertProgress() {
    if (currentQuestion === 1) {   // Stop the function if the first question is reached
        return;
    }    
        scoreHistory.pop();
        totalScore = scoreHistory[scoreHistory.length-1] || 0;
        localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
        questionAnswered = true;
        currentQuestion--;
        localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
}

// next question button event listener to trigger saving the total score
if (nextQuestion) {
    nextQuestion.addEventListener("click", function(event) {
        if (questionAnswered) {
            checkCurrentQuestion();
            saveProgress(event);
            let nextQuestionNumber = currentQuestion;
            window.location.href = `question${nextQuestionNumber}.html`;
        } else {
            alert(`Please answer Question ${currentQuestion}, then click check Answer before continuing.`);
            event.preventDefault();
        }
        
});
}
// previous question button event listener to trigger reverting the total score 
if (prevQuestion) {
    prevQuestion.addEventListener("click", function(event) {
        checkCurrentQuestion();
        revertProgress();
        let prevQuestionNumber = currentQuestion;
        window.location.href = `question${prevQuestionNumber}.html`;
});
}
// list of all questions, choices, and answers
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

// Quiz Intro elements
const scoresTimer = document.querySelector("#score-timer-container");
const quizIntro = document.querySelector("#quiz-intro-container");
const startButton = document.querySelector("#start-btn");
const timer = document.querySelector(".timer");

// Quiz questions elements
const questionContainer = document.querySelector("#question-container");
const quizQuestion = document.querySelector("#question");
const buttonsContainer = document.querySelector("#answers");
const answerButtons = document.querySelectorAll(".answer-btn");

// End of quiz elements
const quizEndContainer = document.querySelector("#end-of-quiz-container");
const endQuizHeader = document.querySelector("#end-of-quiz");
const playerScore = document.querySelector("#player-score");
const quizFeedback = document.querySelector("#quiz-feedback");
const initialsInput = document.querySelector("#initials");
const quizEndButton = document.querySelector("#end-btn");
// ----------------------------------------------------------------------------------------------------

let countdown = 60;
let currentQuestionIndex = 0;
let totalScore = 0;

// ----------------------------------------------------------------------------------------------------
// When "start quiz" button is clicked:
// 1. start timer
// 2. show first question

startButton.addEventListener("click", (event) => {
  const reduceTimer = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      timer.textContent = `Time remaining ⏳: ${countdown} s`;
    } else {
      clearInterval(reduceTimer);
      endOfQuiz();
    }
  }, 1000);

  quizIntro.textContent = "";
  showQuestion();
});

// ----------------------------------------------------------------------------------------------------
// Functionality to show next question when one of the answer buttons is clicked

function showQuestion() {
  quizQuestion.textContent = `${questions[currentQuestionIndex].title}`;
  quizQuestion.setAttribute("style", "text-align: left");

  answerButtons.forEach((button, i) => {
    button.textContent = `${questions[currentQuestionIndex].choices[i]}`;

    buttonsContainer.setAttribute(
      "style",
      "text-align: left; margin-top: 20px; list-style:none"
    );
    button.setAttribute(
      "style",
      "text-align: left; padding: 7px; font-size: 1.5rem; margin: 3px 0; border-radius: 5px; border: none; background-color: #007bff; color: white"
    );

    button.onclick = handleAnswerClick;
  });

  questionContainer.setAttribute(
    "style",
    "text-align: center; margin: 0 auto; width: 50%"
  );
}

// handle the selected answer

function handleAnswerClick(event) {
  const currentQuestion = questions[currentQuestionIndex];
  selectedAnswer = event.target.textContent;
  console.log(selectedAnswer, "<------ Selected Answer");
  console.log(currentQuestion.answer, "***** The correct answer");

  if (selectedAnswer === currentQuestion.answer) {
    totalScore += 10;
  } else {
    countdown -= 10;
  }

  // When a button is clicked, move on to the next question
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    countdown = 0;
    // If quiz or timer has ended invoke endOfQuiz funtion
    endOfQuiz();
  }
}

// ----------------------------------------------------------------------------------------------------
let currentPlayerId = 0;

// Once quiz ends, display users score, quiz feedback and get their initials

function endOfQuiz() {
  quizIntro.textContent = "";
  questionContainer.textContent = "";

  playerScore.textContent = `You scored ${totalScore}/50`;

  // Provide feedback based on score
  if (totalScore === 50) {
    quizFeedback.textContent = "You smashed it! 💯 Outstanding performance! 🌟";
  } else if (totalScore === 40) {
    quizFeedback.textContent =
      "Great job! 👍 You have a strong understanding of the material. 💪";
  } else if (totalScore === 30) {
    quizFeedback.textContent =
      "Good effort! 😊 You have a good grasp of the material, but there's room for improvement. 📘";
  } else if (totalScore === 20) {
    quizFeedback.textContent =
      "Not bad! 😌 You have a basic understanding, but you might want to review some concepts. 📚";
  } else if (totalScore === 10) {
    quizFeedback.textContent =
      "Keep trying! 💡 There's some understanding, but more study is needed. 📖";
  } else {
    quizFeedback.textContent =
      "Don't give up! 💪 Review the material and try again. 🌱";
  }

  quizEndContainer.setAttribute(
    "style",
    "display: contents; text-align: center; margin: 0 auto; width: 50%"
  );

  endQuizHeader.setAttribute("style", "margin: 0 0 40px 0");
  quizFeedback.setAttribute("style", "margin: 20px 0");
  initialsInput.setAttribute(
    "style",
    "margin: 20px 0; padding: 7px; border-radius: 5px; font-size: 1.2rem"
  );
  quizEndButton.setAttribute(
    "style",
    "font-size: 1.2rem; font-weight: bold; margin-left: 15px; padding: 7px; color: white; background-color: #007bff; border: none; border-radius: 5px"
  );

  // localStorage.clear();

  // Store users score into the local storage object

  // currentPlayerId++;
  // localStorage.setItem(`player${currentPlayerId}Score`, totalScore);
  // console.log(localStorage, "*** All the saved scores");
}
// ----------------------------------------------------------------------------------------------------
const highScoresContainer = document.querySelector(
  "#high-scores-list-container"
);
const highscoresHeader = document.querySelector("#high-scores");
const highscoresList = document.querySelector("#high-scores-list");
const goBackBtn = document.querySelector("#go-back-btn");
const clearScoreBtn = document.querySelector("#clear-scores-btn");

// When the user selects the submit button, they are presented with the highscores list

quizEndButton.addEventListener("click", (event) => {
  event.preventDefault();
  showHighScores();

  function showHighScores() {
    // Retreive the players initials
    const playerInitials = document.querySelector("#initials").value;

    // Store the players score to the local storage object
    localStorage.setItem(playerInitials, totalScore);

    console.log(totalScore, "***** Player quiz score");
    console.log(playerInitials, "<---- Player initials");
    // console.log(localStorage, "<<<<< Local storage object");

    scoresTimer.textContent = "";
    quizIntro.textContent = "";
    questionContainer.textContent = "";
    quizEndContainer.textContent = "";

    highScoresContainer.setAttribute(
      "style",
      "display: block; text-align: center; margin: 0 auto; width: 50%"
    );
    highscoresHeader.setAttribute("style", "margin-bottom: 30px");

    highscoresList.setAttribute(
      "style",
      "list-style: none; margin-bottom: 30px"
    );

    goBackBtn.setAttribute(
      "style",
      "text-align: center; font-size: 1.3rem; font-weight: bold; padding: 7px; margin-right: 10px; background-color:#007bff; color: white; border: none; border-radius: 5px"
    );
    clearScoreBtn.setAttribute(
      "style",
      "text-align: center; font-size: 1.3rem; font-weight: bold; padding: 7px; margin-right: 10px; background-color:#007bff; color: white; border: none; border-radius: 5px"
    );

    // Loop through the properties of the local storage object, for each property, create a new li

    let allPlayers = localStorage;

    for (const key in allPlayers) {
      if (key.length === 2) {
        console.log(key, "<=== All property keys");
        let currentPlayerScore = parseInt(localStorage.getItem(key));

        const scoresList = document.createElement("li");
        highscoresList.append(scoresList);
        scoresList.textContent = `${key} - ${currentPlayerScore}`;
        scoresList.setAttribute(
          "style",
          "padding: 5px 0; margin: 10px 10px; background-color: #c8e3ff; border: none; border-radius: 5px"
        );
      }
    }
  }
});

// If the clear button is pressed, simply remove all key value pairs from the local storage object
// localStorage.clear();

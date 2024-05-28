// Quiz elements
const homePage = document.querySelector("#home-page-container");
const scoresTimer = document.querySelector("#score-timer-container");
const quizIntro = document.querySelector("#quiz-intro-container");
const startButton = document.querySelector("#start-btn");
const timer = document.querySelector(".timer");
const questionContainer = document.querySelector("#question-container");
const quizQuestion = document.querySelector("#question");
const buttonsContainer = document.querySelector("#answers");
const answerButtons = document.querySelectorAll(".answer-btn");
const quizEndContainer = document.querySelector("#end-of-quiz-container");
const endQuizHeader = document.querySelector("#end-of-quiz");
const playerScore = document.querySelector("#player-score");
const quizFeedback = document.querySelector("#quiz-feedback");
const initialsInput = document.querySelector("#initials");
const quizEndButton = document.querySelector("#end-btn");
const highScoresContainer = document.querySelector(
  "#high-scores-list-container"
);
const highscoresHeader = document.querySelector("#high-scores");
const highscoresList = document.querySelector("#high-scores-list");
const goBackBtn = document.querySelector("#go-back-btn");
const clearScoreBtn = document.querySelector("#clear-scores-btn");

// List of all questions, choices, and answers
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

// Global variables
let countdown = 60;
let currentQuestionIndex = 0;
let totalScore = 0;
let currentPlayerId = 0;

// Start the quiz and timer when the start button is clicked
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

// Display the current question and its choices
function showQuestion() {
  quizQuestion.textContent = questions[currentQuestionIndex].title;
  quizQuestion.setAttribute("style", "text-align: left");

  answerButtons.forEach((button, i) => {
    button.textContent = questions[currentQuestionIndex].choices[i];
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

// Handle the selected answer
function handleAnswerClick(event) {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = event.target.textContent;

  if (selectedAnswer === currentQuestion.answer) {
    totalScore += 10;
    const audio = new Audio("../Assets/sfx/correct.wav");
    audio.play();
  } else {
    countdown -= 10;
    const audio = new Audio("../Assets/sfx/incorrect.wav");
    audio.play();
  }

  // Move to the next question or end the quiz if it's the last question
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    countdown = 0;
    endOfQuiz();
  }
}

// Display the end of quiz screen with the user's score and feedback
function endOfQuiz() {
  quizIntro.textContent = "";
  questionContainer.textContent = "";

  playerScore.textContent = `You scored ${totalScore}/50`;

  // Provide feedback based on the score
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
}

// Show the high scores list when the submit button is clicked
quizEndButton.addEventListener("click", (event) => {
  event.preventDefault();
  showHighScores();
});

function showHighScores() {
  const playerInitials = document.querySelector("#initials").value;

  // Store the player's score in local storage
  localStorage.setItem(playerInitials, totalScore);

  // Clear the quiz content and display the high scores
  scoresTimer.textContent = "";
  quizIntro.textContent = "";
  questionContainer.textContent = "";
  quizEndContainer.textContent = "";

  highScoresContainer.setAttribute(
    "style",
    "display: block; text-align: center; margin: 0 auto; width: 50%"
  );
  highscoresHeader.setAttribute("style", "margin-bottom: 30px");
  highscoresList.setAttribute("style", "list-style: none; margin-bottom: 30px");

  goBackBtn.setAttribute(
    "style",
    "text-align: center; font-size: 1.3rem; font-weight: bold; padding: 10px; margin-right: 10px; background-color:#007bff; color: white; border: none; border-radius: 10px"
  );
  clearScoreBtn.setAttribute(
    "style",
    "text-align: center; font-size: 1.3rem; font-weight: bold; padding: 10px; margin-right: 10px; background-color:#007bff; color: white; border: none; border-radius: 10px"
  );

  // Display the high scores from local storage
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      let currentPlayerScore = parseInt(localStorage.getItem(key));
      const scoresList = document.createElement("li");
      highscoresList.append(scoresList);
      scoresList.textContent = `${key} - ${currentPlayerScore}`;
      scoresList.setAttribute(
        "style",
        "padding: 5px 0; margin: 10px 10px; background-color: #c8e3ff; border: none; border-radius: 5px; font-weight: bold"
      );
    }
  }
}

// Navigate back to the home page when "Go Back" button is clicked
goBackBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Clear all high scores when "Clear High Scores" button is clicked
clearScoreBtn.addEventListener("click", () => {
  localStorage.clear();
  highscoresList.textContent = "";
});

// LAST THING TO DO:
//Add the highscores to it's own HTML and JS files so that when the user clicks on the view highscores button, they are redirected to the highscores.html file.

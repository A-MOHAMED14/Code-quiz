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

// When "start quiz" button is clicked:
// 1. start timer
// 2. show first question

const quizIntro = document.querySelector("#quiz-intro-container");
const startButton = document.querySelector("#start-btn");
const timer = document.querySelector(".timer");

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

let countdown = 60;
let currentQuestionIndex = 0;
let totalScore = 0;

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
    // If quiz or time has invoke endOfQuiz funtion
    endOfQuiz();
  }
}

// ----------------------------------------------------------------------------------------------------

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
}
// ----------------------------------------------------------------------------------------------------


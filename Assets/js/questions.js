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
const answerButtons = document.querySelectorAll(".answer-btn");
const buttonsContainer = document.querySelector("#answers");

startButton.addEventListener("click", (event) => {
  let countdown = 60;

  const reduceTimer = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      timer.textContent = `Time remaining ⏳: ${countdown} s`;
    } else {
      clearInterval(reduceTimer);
    }
  }, 1000);

  quizIntro.textContent = "";

  quizQuestion.textContent = `${questions[0].title}`;
  quizQuestion.setAttribute("style", "text-align: center");

  answerButtons.forEach((button, i) => {
    button.textContent = `(${i + 1}). ${questions[0].choices[i]}`;
  });
});

// correctAnswer = questions[0].answer;

// if (event.target === correctAnswer) {
//   alert("CORRECT!");
// }

// element = event.target;

// if (element.matches("#start-btn")) {
//   state = quizQuestion.getAttribute("data-state");
//   console.log(state, "<-------");
// }

// quizQuestion.textContent = `Q1: ${questions[0].title}`;
// questions[0].choices.forEach((choice) => {
//   answers.textContent = choice;
// });

// ------------------ FEEDBACK -------------------
// button.addEventListener("click", (event) => {
//   if (button.textContent === questions[0].answer) {
//     const horizontalLine = document.createElement("hr");
//     const correctResponse = document.createElement("p");
//     correctResponse.textContent = "Correct ✅";

//     questionContainer.appendChild(horizontalLine);
//     questionContainer.appendChild(correctResponse);
//   } else {
//     const horizontalLine = document.createElement("hr");
//     const wrongResponse = document.createElement("p");
//     wrongResponse.textContent = "Incorrect ❌";

//     questionContainer.appendChild(horizontalLine);
//     questionContainer.appendChild(wrongResponse);
//   }
// });

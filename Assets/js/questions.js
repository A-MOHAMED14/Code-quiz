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

let countdown = 60;
let currentQuestionIndex = 0;
let totalScore = 0;
let highscores = [];

startButton.addEventListener("click", (event) => {
  const reduceTimer = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      timer.textContent = `Time remaining ⏳: ${countdown} s`;
    } else {
      clearInterval(reduceTimer);
      // alert("You have ran out of time");
    }
  }, 1000);

  quizIntro.textContent = "";
  showQuestion();
});

// /////////////////////////////////////////////////////////////////////////////////////////////////

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
  console.log(currentQuestion.answer, "***** The answer on the object");

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
    alert(`End Of Quiz, you scored: ${totalScore}/50`);
    countdown = 0;
  }
}

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

// --------------------- QUIZ INTRO --------------------
// quizIntro.textContent = "";

// quizQuestion.textContent = `${questions[0].title}`;
// quizQuestion.setAttribute("style", "text-align: left");

// answerButtons.forEach((button, j) => {
//   button.textContent = `${j + 1}). ${questions[0].choices[j]}`;

//   let questionNumber = 0;

//   buttonsContainer.setAttribute(
//     "style",
//     "text-align: left; margin-top: 20px; list-style:none"
//   );
//   button.setAttribute(
//     "style",
//     "text-align: left; padding: 7px; font-size: 1.5rem; margin: 3px 0; border-radius: 5px; border: none; background-color: #007bff; color: white"
//   );
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////
// questionContainer.setAttribute(
//   "style",
//   "text-align: center; margin: 0 auto; width: 50%"
// );

// singleAnswerBtn.addEventListener("click", () => {
//   alert("Next Question");
//   // When one of the answer buttons is pressed, go to the next question
//   button.addEventListener("click", (event) => {
//     // alert("Next question");
//     // function nextQuestion() {
//     let questionNum = 2;
//     let questionNumIndex = 1;

//     while (questionNum <= questions.length) {
//       quizQuestion.textContent = `${questions[questionNumIndex].title}`;
//     }
//     // }
//     // nextQuestion();
//   });
// });

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

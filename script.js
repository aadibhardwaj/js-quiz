import { questions } from "./questions.js";

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector("#start button");
  const quizContainer = document.getElementById("quiz");
  const startContainer = document.getElementById("start");
  const questionElement = document.getElementById("question");
  const choicesCont = document.getElementById("choices");
  const submitBtn = document.querySelector("#submit button");
  const scoreContainer = document.getElementById("score");
  const timerElement = document.getElementById("timer"); 

  let currentIndex = 0;
  let score = 0;
  let selectedAnswer = "";
  let timerInterval;
  let timeRemaining = 5; 

  function startQuiz() {
    startContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion();
  }

  function startTimer() {
  
    timeRemaining = 5;
    timerElement.textContent = `Timers ${timeRemaining}s`; 

   
    timerInterval = setInterval(() => {
      timeRemaining--;
      timerElement.textContent = `Time ${timeRemaining}s`;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval); 
        checkAnswer(); 
      }
    }, 1000);
  }

  function showQuestion() {
    const current = questions[currentIndex];
    questionElement.textContent = current.question;
    choicesCont.innerHTML = "";
    selectedAnswer = ""; 

    current.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("choices");
      button.addEventListener("click", () => {
        selectedAnswer = option;
        document.querySelectorAll(".choices").forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        submitBtn.disabled = false;
      });
      choicesCont.appendChild(button);
    });

    startTimer(); 
  }

  

  function checkAnswer() {
    if (selectedAnswer === questions[currentIndex].correct_ans) {
      score++;
    }
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
      submitBtn.disabled = true; 
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    quizContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreContainer.textContent = `Your Score: ${score} / ${questions.length}`;
  }

  startBtn.addEventListener("click", startQuiz);
  submitBtn.addEventListener("click", checkAnswer);

  submitBtn.disabled = true;
});

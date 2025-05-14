

const questions = [
  {
    question: "What is OOP ?",
    answers: [
      { text: "Out Of Place", correct: false },
      { text: "Old Object Processing", correct: false },
      { text: "Object Oriented Programming ", correct: true },
      { text: "Overly Obese Penguins", correct: false },
    ],
  },
  {
    question: "What is the primary purpose of a loop in programming?",
    answers: [
      { text: "To store data", correct: false },
      { text: "To execute a block of code repeatedly", correct: true },
      { text: "To define a function ", correct: false },
      { text: "To exit from a function", correct: false },
    ],
  },
  {
    question: "What is SQL ?",
    answers: [
      { text: "Super Quick Language", correct: false },
      { text: "Structured Query Language", correct: true },
      { text: "Silly Query Language", correct: false },
      { text: "Squirrel Query Language", correct: false },
    ],
  },
  {
    question: "What does the term algorithm refer to in programming?",
    answers: [
      { text: " A data structure used to store data", correct: false },
      { text: "A programming language", correct: false },
      { text: "A type of software application", correct: false },
      { text: " A sequence of instructions to solve a problem", correct: true },
    ],
  },
  {
    question: "What is HTML ?",
    answers: [
      { text: "Huge Text Markup", correct: false },
      { text: "Hotdog Tamale Maker", correct: false },
      { text: "Hilarious Turtle Man", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
    ],
  },
  {
    question: "Which of the following best describes a recursive function?",
    answers: [
      { text: "A function that calls another function", correct: false },
      { text: "A function that runs in a loop", correct: false },
      { text: "A function that is always executed first", correct: false },
      { text: "A function that calls itself", correct: true },
    ],
  },
  {
    question: "What does 'O(n)' represent in terms of time complexity?",
    answers: [
      { text: "The algorithm runs in constant time", correct: false },
      { text: "The algorithm runs in logarithmic time", correct: false },
      {
        text: "The algorithm's running time increases linearly with input size",
        correct: true,
      },
      {
        text: "The algorithm's running time increases exponentially with input size",
        correct: false,
      },
    ],
  },
  {
    question: "What is API ?",
    answers: [
      { text: "Amazing Pizza Ingredients", correct: false },
      { text: "Application Programming Interface", correct: true },
      { text: "Angry Purple Iguana", correct: false },
      { text: "Apple Pie Icecream", correct: false },
    ],
  },
  {
    question: "What is a data structure in programming?",
    answers: [
      { text: "A way of organizing and storing data", correct: true },
      { text: "A programming language", correct: false },
      { text: "A type of hardware", correct: false },
      { text: "A function that manipulates data", correct: false },
    ],
  },
  {
    question: "What is IDE ?",
    answers: [
      { text: "Integrated Development Environment", correct: true },
      { text: "Incredible Donut Emporium", correct: false },
      { text: "Itty Bitty Editor", correct: false },
      { text: "Ice Cream Delight", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQueInd = 0;
let score = 0;


function startQuiz() {
  currentQueInd = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQue();
}
function showQue() {
  resetState();
  let currentQue = questions[currentQueInd];
  let questionNo = currentQueInd + 1;
  questionElement.innerHTML = questionNo + ". " + currentQue.question;

  currentQue.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  let emoji;
  if (score == questions.length) {
    emoji = "😎";
    const audio = new Audio("Sound/firewoek.mp3")
    audio.play();
    setTimeout(()=>{
      for (i = 0; i < 20; i++) {
        confetti();
      }
    },100)
    
  } else if (score == 9) {
    emoji = "😎";
  } else if (score == 8) {
    emoji = "😎";
  } else if (score == 7) {
    emoji = "😲";
  } else if (score == 6) {
    emoji = "😲";
  } else if (score == 5) {
    emoji = "😁";
  } else if (score == 4) {
    emoji = "😃";
  } else if (score == 3) {
    emoji = "😅";
  } else if (score == 2) {
    emoji = "👽";
  } else {
    emoji = "🤡";
  }
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}! ${emoji}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQueInd++;
  if (currentQueInd < questions.length) {
    showQue();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQueInd < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();

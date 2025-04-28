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
    question: "What is SQL ?",
    answers: [
      { text: "Super Quick Language", correct: false },
      { text: "Structured Query Language", correct: true },
      { text: "Silly Query Language", correct: false },
      { text: "Squirrel Query Language", correct: false },
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
    question: "What is API ?",
    answers: [
      { text: "Amazing Pizza Ingredients", correct: false },
      { text: "Application Programming Interface", correct: true },
      { text: "Angry Purple Iguana", correct: false },
      { text: "Apple Pie Icecream", correct: false },
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
  Array.from(answerButtons.children).forEach(button => {
if(button.dataset.correct === "true"){
    button.classList.add("correct");
}
button.disabled = true;
  });
  nextButton.style.display="block"
}

function showScore (){
    resetState();
    let emoji  ;
if(score == questions.length){
    emoji = "😎";
    for (i=0;i<20;i++) {
      confetti();
  }
}else if(score == 4){
    emoji = "😃"
    for (i=0;i<20;i++) {
      confetti();
  }
}else if(score == 3){
    emoji = "😅"
}else if(score == 2){
    emoji = "👽"
}else{
    emoji = "🤡"
}
    questionElement.innerHTML =`You Scored ${score} out of ${questions.length}! ${emoji}`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}
function handleNextButton (){
    currentQueInd++;
    if(currentQueInd < questions.length){
        showQue();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () =>{
    if(currentQueInd < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();

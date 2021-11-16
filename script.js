var questionBank = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      'strings',
      'booleans',
      'alerts',
      'numbers'
    ],
    correctAnswer: 'alerts'
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    answers: [
      'quotes',
      'curly brackets',
      'parentheses',
      'square brackets'
    ],
    correctAnswer: 'parentheses'
  },
  {
    question: " Arrays in JavaScript can be used to store ____.",
    answers: [
      'numbers and strings',
      'other arrays ',
      'booleans',
      'all of the above'
    ],
    correctAnswer: 'all of the above'

  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables. ",
    answers: [
      'commas',
      'curly brackets',
      'quotes',
      'parenthesis'
    ],
    correctAnswer: 'quotes'
  },

  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      'JavaScript',
      'terminal/bash',
      'for loops',
      'console.log',
    ],
    correctAnswer: 'console.log'
  }
];
// variables to keep track of quiz state
var timeLeft = 75;
var savedScore = 1; //putting in starting numbers to define these vars as integers
var currentQuestionIndexNum = -1//so it starts out empty at first

// variables to reference DOM elements

var questionEl = document.getElementById("question");
var ansStatusEl = document.getElementById("ansStatus");
var ansList = document.getElementById("ans-list");
var lineEl = document.getElementById("line");
var startButtonEl = document.getElementById("startButton");
//function to get the quiz going 

startButtonEl.addEventListener("click", getQuestionsAndAnswers);

function getQuestionsAndAnswers(event) {
  event.preventDefault();
  currentQuestionIndexNum++;
  questionEl.textContent = questionBank[currentQuestionIndexNum].question;
  //removes all child elements from the answer list placeholder
  while (ansList.firstChild) {
    ansList.removeChild(ansList.firstChild);
  }
  var ulEl = document.createElement("ul");
  ansList.appendChild(ulEl);//from class
  questionBank[currentQuestionIndexNum].answers.forEach(answer => {
    var listEl = document.createElement("li");
    ulEl.appendChild(listEl);
    var buttonEl = document.createElement("button");
    listEl.appendChild(buttonEl);
    buttonEl.textContent = answer;
    buttonEl.addEventListener("click", verifyAnswer);
    if (answer === questionBank[currentQuestionIndexNum].correctAnswer) {
      buttonEl.isCorrect = true;//created a variable called isCorrect
    }

  });

  function verifyAnswer(event) {
    //add line
    var containerEl = document.getElementById("container");
    // create a line element
    var lineEl = document.createElement("div");
    containerEl.appendChild(lineEl);
    var feedback = document.createElement("div");
    containerEl.appendChild(feedback);
    if (event.currentTarget.isCorrect) {
      feedback.textContent = "Correct!";
    }
    else {
      feedback.textContent = "Wrong!";
    }
  }


  // clear list placeholder using removeChild()
  // create a list
  // for each answer in questionbank[current], create a button list-item and write answer as text.
 
}







//function to pull each question
//current question from questions
//updated DOM elements to reflect the new question
//clear old question choices
//loop over answer choices (TIP: ForEach ;) ) 
//create new button for each choice
//event listener for each choice
//display on the page

//function for the questionclick 
//did the user guess right or wrong
//wrong guess decreases time
//display new time on the page
//move to the next question
//check if there are any questions left/you've run out

// if ans === incorrect 
//   timeLeft--5


//function to end the quiz
//stops timer
//shows end screen
//shows final score
//hides questions section

//function for the clock 
//updates time
//checks if user ran out of time 

var timeLeft = 75;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time Left: " + secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}

//function to save the high score
//get value of input box
//make sure value isnt empty
//get saved scores from localstorage, or if not any, set to empty array
//format new score object for current user 
//save to localstorage
//redirect to next page

// function renderSavedScores() {
//   var savedScore = localStorage.getItem("saved-score");

//   if (!savedScore) {
//     return;
//   }
//   var savedScore = document.querySelector("saved-score").value;

//   localStorage.setItem("saved-score", savedScore);
//   renderLastRegistered();


// user clicks button to submit initials


// user clicks button to start 

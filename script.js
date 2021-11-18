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
var timerInterval;
var savedScore = 1; //putting in starting numbers to define these vars as integers
var questionBankIndex = -1//so it starts out empty at first

// variables to reference start button
var startButtonEl = document.getElementById("startButton");
startButtonEl.addEventListener("click", timer);
var containerEl = document.getElementById("container");

//function that starts the quiz
function getQuestionsAndAnswers() {
  //preventing the question from showing up without being clicked
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);//cycles through twice to clear out the container element of the Welcome message and start button once the start button is clicked
  }
  //iterating through the array of questions
  questionBankIndex++;
  //two step process for creating and populating a question element
  var questionEl = document.createElement("div");
  questionEl.textContent = questionBank[questionBankIndex].question;//index iterating through question bank
  //appending the question to the container
  containerEl.appendChild(questionEl);
  //two step process for creating and populating the ordered list 
  var ulEl = document.createElement("ul");
  containerEl.appendChild(ulEl);
  ulEl.setAttribute("style", "list-style-type: none");
  //using index of array for questions and then dot notation to call up that question's answer choices
  //each time the question loads it will programmatically create a list of buttons with textContent set to the answers from the array/object
  questionBank[questionBankIndex].answers.forEach((answer, index) => {//answer is not to be confused with answers from the array/object  array.prototype.forEach
    var listEl = document.createElement("li");
    ulEl.appendChild(listEl);
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("style", "background-color: #9370db");
    listEl.appendChild(buttonEl);
    buttonEl.textContent = (index + 1) + ". " + answer;
    //setting up event listener for each button//I feel like this could go with the varifyAnswer function
    if ((questionBankIndex + 1) === questionBank.length) {
      buttonEl.addEventListener("click", endQuiz);
    } else {
      buttonEl.addEventListener("click", getQuestionsAndAnswers);
    }

    if (answer === questionBank[questionBankIndex].correctAnswer) {
      buttonEl.isCorrect = true;//creates a variable called isCorrect set to the .correctAnswer part of the arrray.  
    }
    else {
      buttonEl.notCorrect = true;//creates a variable called notCorrect.. These variables can then be called in the feedback function
    }

  });
  verifyAnswer(event);
}

function verifyAnswer(event) {
  // creating and appending a line div element to the container element on the html
  var lineEl = document.createElement("div");
  containerEl.appendChild(lineEl);
  var feedback = document.createElement("div");
  containerEl.appendChild(feedback);
  //logic to verify answer
  if (event.currentTarget.isCorrect) {//currentTarget used because target would not work for this
    feedback.textContent = "Correct!";
  }
  else if (event.currentTarget.notCorrect) {
    feedback.textContent = "Wrong!";
    timeLeft-=5;
  }
  else {
    containerEl.removeChild(feedback);
  }
}

function timer (event) {
  event.preventDefault();
var timeEl = document.getElementById("time-left");

timerInterval = setInterval(function () {
  timeLeft--;
  timeEl.textContent = "Time Left: " + timeLeft;

  if (timeLeft === 0) {
    // Stops execution of action at set interval
    clearInterval(timerInterval);
    endQuiz(); 

  }

}, 1000);
getQuestionsAndAnswers(); 
}



function userScore() {

  return userScore

}




function endQuiz() {
  clearInterval(timerInterval);
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  var allDone = document.createElement("div");
  containerEl.appendChild(allDone)
  allDone.textContent = "All Done!  Your score is " + userScore + " seconds left."
}







function highScores () {
  var scoreDisplay = document.getElementById("high-score")

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
//I already have a div for the time left
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time Left: " + timeLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      timeWhenQuizStopped();
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

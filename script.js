//question bank set up as an array of objects with 3 key value pairs(for questions, answers and correct answer).  The answer value is an array of answers. 
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


// global variables and storage to keep track of quiz state
var timeEl = document.getElementById("time-left");
timeEl.setAttribute("style", "float: right; margin: auto; font-size: large");
var timeLeft = 75;
var timerInterval;
var questionBankIndex = -1//so it starts out empty at first
var highScores = [];
localStorage.setItem("highscores", highScores);
var initialsEntered;

// start up
var startButtonEl = document.getElementById("startButton");
startButtonEl.addEventListener("click", timer);
//container 
var containerEl = document.getElementById("container");
containerEl.setAttribute("style", "margin: auto; width: 50%");


//This function calls the question bank
function getQuestionsAndAnswers() {
  //prevents the question from showing up without being clicked
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
  questionEl.setAttribute("style", "font-size: large; font-weight: bold;");
  //two step process for creating and populating the ordered list 
  var ulEl = document.createElement("ul");
  containerEl.appendChild(ulEl);
  ulEl.setAttribute("style", "list-style-type: none");//gets rid of bullets
  //using index of array for questions and then dot notation to call up that question's answer choices
  //each time the question loads it will programmatically create a list of buttons with textContent set to the answers from the array/object
  questionBank[questionBankIndex].answers.forEach((answer, index) => {//answer is not to be confused with answers from the array/object  array.prototype.forEach
    var listEl = document.createElement("li");
    ulEl.appendChild(listEl);
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("style", "font-size: 16px; background-color: #9370db; border-radius: 5px; color: white");
    listEl.appendChild(buttonEl);
    buttonEl.textContent = (index + 1) + ". " + answer;
    //setting up event listener for each button
    if ((questionBankIndex + 1) === questionBank.length) {
      buttonEl.addEventListener("click", endQuiz);

    } else {
      buttonEl.addEventListener("click", getQuestionsAndAnswers);
    }

    if (answer === questionBank[questionBankIndex].correctAnswer) {
      buttonEl.isCorrect = true;//creates a variable called isCorrect referencing the .correctAnswer part of the arrray of objects.  
    }
    else {
      buttonEl.notCorrect = true;//creates a variable called notCorrect.These variables can then be called in the feedback function
    }

  });
  verifyAnswer(event);
}


//This function uses the isCorrect or notCorrect varaibles assigned in getQuestionsAndAnswers and provides feedback of Correct or Wrong
function verifyAnswer(event) {
  // creating and appending a line div element to the container element on the html
  var lineEl = document.createElement("div");
  containerEl.appendChild(lineEl);
  // containerEl.setAttribute("style", "margin: auto; width: 50%");
  var feedback = document.createElement("div");
  containerEl.appendChild(feedback);
  feedback.setAttribute("style", "font-style: oblique");
  //logic to verify answer
  if (event.currentTarget.isCorrect) {//currentTarget used because target would not work for this
    lineEl.textContent = "__________________________"
    feedback.textContent = "Correct!";
  }
  else if (event.currentTarget.notCorrect) {
    lineEl.textContent = "__________________________"
    feedback.textContent = "Wrong!";
    timeLeft -= 5;
  }
  else {
    containerEl.removeChild(feedback);
  }
}


//This function uses setInterval to count down the time which was globally set to 75 seconds. 
function timer(event) {
  event.preventDefault();
  timerInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time Left: " + timeLeft;
    if (timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);//counts down every second
  getQuestionsAndAnswers();//restarts quiz if time runs out
}


//This function stops the timer, clears the container for the page, and then presents the user with an input and submit button for initials
function endQuiz() {
  clearInterval(timerInterval);

  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  //assigning and storing user score
  var userScore = timeLeft;
  localStorage.setItem("userScore", userScore);
  var allDone = document.createElement("h1");
  var labelEl = document.createElement("label");
  var inputEl = document.createElement("input");
  var buttonEl = document.createElement("input");
  containerEl.appendChild(allDone);
  containerEl.appendChild(labelEl);
  containerEl.appendChild(inputEl);
  containerEl.appendChild(buttonEl);
  //created ID on input element so it could be referenced in the getHighscores function
  inputEl.setAttribute("id", "initials")
  labelEl.textContent = "Enter your initials here     ";
  labelEl.setAttribute("style", "font-size: large");
  buttonEl.setAttribute("value", "Submit");
  buttonEl.setAttribute("type", "button");
  buttonEl.setAttribute("onclick", "getHighScores()");
  buttonEl.setAttribute("style", "font-size: 16px; background-color: #9370db; border-radius: 5px; color: white");
  allDone.textContent = "All Done!  Your score is " + userScore + " seconds left.";
  allDone.setAttribute("style", "padding-bottom: 20px");
  verifyAnswer();

}


//This function stores initials and combines then with user score
function getHighScores() {
  if (document.querySelector("#initials")) {
    var initials = document.querySelector("#initials").value;
    var score = { score: localStorage.getItem("userScore"), initials: initials };
    highScores.push(score);
    highScores.sort((a, b) => (a.score < b.score ? 1 : -1));//from stack overflow array sort function
  }
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }

  var listHeadingEl = document.createElement("h1");
  containerEl.appendChild(listHeadingEl);
  listHeadingEl.textContent = "High Scores:";

  var listEl = document.createElement("ol");//changed to ol, but no order showing
  listHeadingEl.appendChild(listEl);
  highScores.forEach(element => {
    var liEl = document.createElement("li");
    listEl.appendChild(liEl);
    liEl.textContent = element.initials + " - " + element.score;  //highScores[+1]//???
    liEl.setAttribute("style", "list-style-type: none; padding: 5px; font-size: 20px; border-bottom: 1px solid; background-color: #ccccff")
  });

  var goBackButton = document.createElement("button");
  goBackButton.textContent = "Go Back";
  goBackButton.setAttribute("style", "font-size: 16px; background-color: #9370db; border-radius: 5px; color: white");
  goBackButton.addEventListener("click", function (event) {
    questionBankIndex = -1;
    getStartPage();

  });
  containerEl.appendChild(goBackButton);

  var clearButton = document.createElement("button");
  containerEl.appendChild(clearButton);
  clearButton.textContent = "Clear High Scores";
  clearButton.setAttribute("style", "font-size: 16px; background-color: #9370db; border-radius: 5px; color: white");
  clearButton.addEventListener("click", function (event) {
    highScores = [];
    getHighScores();
  });
};


//This function redraws the start up page if the quiz cycle is restarted
function getStartPage() {
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  var timeEl = document.getElementById("time-left");
  timeEl.textContent = "Time Left: ";
  timeLeft = 75;
  startButtonEl = document.createElement("button");
  startButtonEl.addEventListener("click", timer);
  var welcomeEl = document.createElement("h1");
  welcomeEl.textContent = "Welcome to the Quiz!";
  containerEl.appendChild(welcomeEl);
  var instructionsEl = document.createElement("p");
  instructionsEl.textContent = "You have 75 seconds to complete five questions.  Incorrect answers will result in five seconds being taken from your time.  The time left will be your score.  Good luck!";
  containerEl.appendChild(instructionsEl);
  containerEl.appendChild(startButtonEl);
  startButtonEl.textContent = "Start!";
  startButtonEl.setAttribute("style", "font-size: 20px; background-color: #9370db; border-radius: 5px; color: white");
}
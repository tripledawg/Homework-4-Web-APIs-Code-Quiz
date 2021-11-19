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
///////////////////////////////////////////////////////////////////////////////


// variables to keep track of quiz state
var timeLeft = 75;
var timerInterval;
// var savedScore = 1; //putting in starting numbers to define these vars as integers, not used yet
var questionBankIndex = -1//so it starts out empty at first
var highScores = [];
localStorage.setItem("highscores", highScores);
// variables to reference start button
var startButtonEl = document.getElementById("startButton");
startButtonEl.addEventListener("click", timer);
// startButtonEl.setAttribute = ("style", "background-color: #9370db; border-radius: 5px; color: white");
var containerEl = document.getElementById("container");
var initialsEntered;


/////////////////////////////////////////////////////////////////////////////////
function getStartPage() {
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);//cycles through twice to clear out the container element of the Welcome message and start button once the start button is clicked
  }
  var timeEl = document.getElementById("time-left"); 
  timeEl.textContent= "Time Left: ";
  timeLeft = 75;
  startButtonEl = document.createElement("button"); 
  startButtonEl.addEventListener("click", timer);
  var welcomeDiv = document.createElement("div"); 
  welcomeDiv.textContent = "Welcome to the Quiz!";
  containerEl.appendChild(welcomeDiv);
  containerEl.appendChild(startButtonEl); 
  startButtonEl.textContent = "Start!";
  startButtonEl.setAttribute("style", "background-color: #9370db; border-radius: 5px; color: white"); 
}
//////////////////////////

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
    buttonEl.setAttribute("style", "background-color: #9370db; border-radius: 5px; color: white");
    listEl.appendChild(buttonEl);
    buttonEl.textContent = (index + 1) + ". " + answer;
    //setting up event listener for each button
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

/////////////////////////////////////////////////////////////////

function verifyAnswer(event) {
  // creating and appending a line div element to the container element on the html
  var lineEl = document.createElement("div");
  containerEl.appendChild(lineEl);
  containerEl.setAttribute("style", "margin: auto; width: 50%");
  var feedback = document.createElement("div");
  containerEl.appendChild(feedback);
  //logic to verify answer
  if (event.currentTarget.isCorrect) {//currentTarget used because target would not work for this
    feedback.textContent = "Correct!";
  }
  else if (event.currentTarget.notCorrect) {
    feedback.textContent = "Wrong!";
    timeLeft -= 5;
  }
  else {
    containerEl.removeChild(feedback);
  }
}

//////////////////////////////////////////////////////////////////

function timer(event) {
  event.preventDefault();
  var timeEl = document.getElementById("time-left");
  timeEl.setAttribute("style", "float: right");
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

//////////////////////////////////////////////////////////////////


function endQuiz() {
  clearInterval(timerInterval);

  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }

  var userScore = timeLeft;
  localStorage.setItem("userScore", userScore);
  var allDone = document.createElement("div");
  var labelEl = document.createElement("label");
  var inputEl = document.createElement("input");
  var buttonEl = document.createElement("input");
  containerEl.appendChild(allDone);
  containerEl.appendChild(labelEl);
  containerEl.appendChild(inputEl);
  containerEl.appendChild(buttonEl);
  inputEl.setAttribute("id", "initials")
  labelEl.textContent = "Enter your initials here";
  buttonEl.setAttribute("value", "Submit");
  buttonEl.setAttribute("type", "button");
  buttonEl.setAttribute("onclick", "getHighScores()");
  buttonEl.setAttribute("style", "background-color: #9370db; border-radius: 5px; color: white");
  allDone.textContent = "All Done!  Your score is " + userScore + " seconds left.";
verifyAnswer(event); //This makes it look like the example, but it seems confusing to have the previous question feedback showing after you've moved on. 

}

/////////////////////////////////////////////////////////////////
//make a container to link View High Scores to getHighScores???
//check if user ran out of time //
function getHighScores() {
  // Checks that initials element exists and isn't empty
  if (document.querySelector("#initials")) {
    var initials = document.querySelector("#initials").value;
    var score = { score: localStorage.getItem("userScore"), initials: initials };
    highScores.push(score);
    highScores.sort((a, b) => (a.score < b.score ? 1 : -1));//from stack overflow array sort function
  }
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  // var tableEl = document.createElement("table");
  // containerEl.appendChild(tableEl);
  // var tableHeaderRowEl = document.createElement("tr");
  // var tableHeaderInitialsEl = document.createElement("th");
  // var tableHeaderScoreEl = document.createElement("th");
  // tableEl.appendChild(tableHeaderRowEl);
  // tableHeaderRowEl.appendChild(tableHeaderInitialsEl);
  // tableHeaderRowEl.appendChild(tableHeaderScoreEl);
  // tableHeaderInitialsEl.textContent = "Initials";
  // tableHeaderScoreEl.textContent = "Score";
  // highScores.forEach(element => {
  //   var tableRowEl = document.createElement("tr");
  //   var tableDataInitials = document.createElement("td");
  //   var tableDataScore = document.createElement("td");
  //   tableEl.appendChild(tableRowEl);
  //   tableRowEl.appendChild(tableDataInitials)
  //   tableRowEl.appendChild(tableDataScore);
  //   tableDataInitials.textContent = element.initials;
  //   tableDataScore.textContent = element.score;
  // });
  var listEl = document.createElement("ul");
  containerEl.appendChild(listEl); 
  highScores.forEach (element => {
    var liEl = document.createElement("li"); 
    listEl.appendChild(liEl); 
    liEl.textContent = element.initials + " - " + element.score;
    liEl.setAttribute("style", "list-style-type: none; background-color: #d8bfd8")
  });

  
  var goBackButton = document.createElement("button");
  goBackButton.textContent = "Go Back";
  goBackButton.setAttribute("style", "background-color: #9370db; border-radius: 5px; color: white");
  goBackButton.addEventListener("click", function (event) {
    questionBankIndex = -1;
    getStartPage();

  });
  containerEl.appendChild(goBackButton);

  var clearButton = document.createElement("button");
  containerEl.appendChild(clearButton);
  clearButton.textContent = "Clear High Scores";
  clearButton.setAttribute("style", "background-color: #9370db; border-radius: 5px; color: white");
  clearButton.addEventListener("click", function (event) {
    highScores = [];
    getHighScores();
  });
};


//display first five values of hgihscores array in table

//function to save the high score
//get value of input box
//make sure value isnt empty
//get saved scores from localstorage, or if not any, set to empty array
//format new score object for current user 
//save to localstorage
//redirect to next page

// user clicks button to submit initials


// user clicks button to start 




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






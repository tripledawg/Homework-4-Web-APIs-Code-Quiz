# Homework-4-Web-APIs-Code-Quiz

## HTML
I created an html with the start button element, a p tag with directions, a View High Scores anchor tag, and a Time Left div element.  

## JS
I created a question bank which was an array of objects with key value pairs for questions, answers and correct answer with the answers values stored as an array.  
I created a bank of global variables to keep track of the quiz state and to store the high scores. 
I created an event listener for the startup button which called the timer which calls the questions and answers. 
I created a container for the Welcome info and future quiz questions and an event listeniner to the start button. 

I then created a function called getQuestionsAndAnswers that cleared out the welcome message and called the question bank. It also assigned a variable isCorrect or notCorrect based on the correct answer. Finally, this function called another function, the verifyAnswer function.  

The verifyAnswer function created a feedback variable and created an element declaring if the question was right or wrong based on the isCorrect or notCorrect variable from the getQuestionsAndAnswers function.  It also calls the timer function to decrement the time by 5 seconds if the answer is wrong. 

The timer function uses the setInterval to decrement the starting time every second. 

The endQuiz function clears the container and presents the user with a labeled input box and a submit button for initials. 

The getHighScores function pushes the scores onto the globally defined variable/array highScores. The scores are then sorted.  For each score a list item is created with concatenated text that incorporates the index number, the initials and the score. This function also creates Go Back and a Clear High Scores buttons. 

Lastly, the getStartPage function redraws the page if the user clicks Go Back or if time runs out.  

Throughout the JS, I used setAttribute to set individual styles as needed.  More importantly, setAttribute helped me refer between functions by setting id, type, value and onclick attributes.  

## CSS 
I created a separate css to make all the fonts and all the true button elements the same.  (The Submit button for the inititals I discovered is technically an input element, so there is individual setAttribute styling for it.)  





## Your Task

At some point in your journey to become a full-stack web developer, you’ll likely be asked to complete a coding assessment&mdash;perhaps as part of an interview process. A typical coding assessment includes both multiple-choice questions and interactive coding challenges. 

To help familiarize you with these tests and allow you to use the skills covered in this unit, this week’s homework invites you to build a timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface. 

This week’s coursework will equip you with all the skills you need to succeed in this assignment.

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Mock-Up

The following animation demonstrates the application functionality:

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.](./Assets/04-web-apis-homework-demo.gif)

## Grading Requirements

This homework is graded based on the following criteria: 

### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository contains application code.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application resembles the mock-up functionality provided in the homework instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality readme file with description, screenshot, and link to deployed application.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository, with a unique name and a readme describing the project.

---

© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.

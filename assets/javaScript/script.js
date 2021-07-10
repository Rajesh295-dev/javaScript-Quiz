
// Here are the list of questions
var myQuestions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            "a: <js> ",
            "b: <javascript> ",
            "c: <script> ",
            "d: <scripting>"
        ],
        correctAnswer: "b: <script> "
    },

    {
        question: "Where is the correct place to insert a JavaScript??",
        answers: [
            "a: The <head> section",
            "b: The <body> section",
            "c: both the <head> section and the <body> section"
        ],
        correctAnswer: "b: The <body> section"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            "a:function:myFunction()  ",
            "b: function myFunction() ",
            "c: myFunction() "
        ],
        correctAnswer: "b: function myFunction() "
    },

    {
        question: "How to write an IF statement in JavaScript??",
        answers: [
            "a: if i = 5 then",
            "b: if i = 5",
            "c: if (i==5)",
            "d: if (i==5) then"
        ],
        correctAnswer: "c:if (i==5)"
    },

    {
        question: "How can you add a comment in a JavaScript?",
        answers: [
            "a:<!..This is a comment..> ",
            "b: //This is a comment",
            "c: 'This is a comment"
        ],
        correctAnswer: "b: //This is a comment"
    }
];




// Variables for the time
var currentTime = document.querySelector("#timeLimit");
var startQuiz = document.querySelector("#startQuiz");
// Initial time
var secondsLeft = 76;
//Each wrong selection penalize 10 seconds
var penalty = 10;
// To create new elments list for the answers choices.
var ulCreate = document.createElement("ul");
var score = 0;
var questionIndex = 0;
var holdInterval = 0;

//  Eventlistener to intialize the quiz and time
startQuiz.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            //To ensure if time is less than 0, it will pass final score 0
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finalScore();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    display(questionIndex);
});





// Additinal varibales to place the questiona and answers
var quizContainer = document.querySelector("#questionsDiv");
var completeAll = document.querySelector("#allDone");
var totalRight = document.querySelector("#totalRight");
//ulCreate will be used to make the answers display 
var ulCreate = document.createElement("ul");


// To pass the question and answers choices in main container
function display(questionIndex) {
    quizContainer.innerHTML = " ";
    ulCreate.innerHTML = " ";
    //To display questions
    for (var i = 0; i < myQuestions.length; i++) {
        var userQuestion = myQuestions[questionIndex].question;
        var userChoices = myQuestions[questionIndex].answers;
        quizContainer.textContent = userQuestion;
    }
    // To dispalay the relatives answers
    userChoices.forEach(function (answerList) {
        var listAnswer = document.createElement("li");
        listAnswer.textContent = answerList;
        quizContainer.appendChild(ulCreate);
        ulCreate.appendChild(listAnswer);
        listAnswer.addEventListener("click", (compare));

    });
}


//Compares and make sure if the answer slecetion is correct
function compare(clickedAnswer) {
    var selected = clickedAnswer.target;

    if (selected.matches("li")) {
        //Alert the correct or wrong message
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        //If the answer is correct score goes up else vice versa
        if (selected.textContent == myQuestions[questionIndex].correctAnswer) {
            score++;
            newDiv.textContent = "Correct!"
        } else {
            secondsLeft = secondsLeft - penalty;
            newDiv.textContent = "Wrong!  "

        }

    }

    // Keep question adding
    questionIndex++;
    //Switched the question block to getResult
    if (questionIndex >= myQuestions.length) {
        finalScore();

        //It will hide the question answer block and display a submit button to go to HighScore page
        quizContainer.style.display = "none";
        completeAll.style.display = "block";
        totalRight.textContent = "End of quiz" + "  " + " " + "You got" + " " + score + "/" + myQuestions.length + " " + "Right Answer!";

    } else {

        display(questionIndex);
    }
    quizContainer.appendChild(newDiv);

}

//If time is over before answered selcetion made
var timeOver = document.getElementById("timeOver");

function finalScore() {

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        clearInterval(holdInterval);
        timeOver.textContent = "Your final score is: " + timeRemaining;
    }

    // To get input from the user and go to the highscore page
    var getResult = document.querySelector("#submitButton");

    getResult.addEventListener("click", function () {

        //Get the input/name of user
        var initials = document.getElementById("myInput").value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);

            //To save the score in localStorage
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            //Convert the  saved score to strings
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Move from main page to Highscore page
            window.location.href = './Highscore.html'

        }
    });




}




















// All the variables are here
var clearHistory = document.querySelector("#clearHistory");
var getReturn = document.querySelector("#getBack");
//div to display the recorded sscores
var highScore = document.querySelector("#highScore");

//get to the score from the localstorage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
   // Arranged and display the input/initial of user and saved score relatively
    for (var i = 0; i < allScores.length; i++) {
        var newList = document.createElement("li");
        newList.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(newList);

    }
}

// function to clear history 
clearHistory.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// function to bring back to the index page
getReturn.addEventListener("click", function () {
    window.location.href = './index.html'
});
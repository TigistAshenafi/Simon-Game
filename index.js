var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

// changes h1 when we press any key in the keyboard

$(document).keypress(function () {
  if (!started) {
    $("h1").text("level  " + level);
    nextSequence();
    started = true;
  }
});

$("button").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//selects random color in the array

function nextSequence() {
  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeIn(100);
  var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
  audio.play();
}

// playing sound function

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate the buttons when we press

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    },200)
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
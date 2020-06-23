// variables

var level = 0;
var gameList = [];
var userClickedPattern = [];

var started = false;

// Detecting key Press
$("body").keydown(function() {
  if (!started) {
    changeLevel();
    gameMove();
    started = true;
  }
});

// Detectiong button press
$(".btn").on("click", function() {
  // userClickedPattern.push(event.target.id);
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePressed(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gameList[currentLevel]) {
    if (gameList.length === userClickedPattern.length && gameList.length > 0) {
      setTimeout(function() {
        changeLevel();
        gameMove();
      }, 1000);
  } }else {
    gameOver();
  }

}


function changeLevel() {
  level++;
  $("#level-title").text("Level " + level);
}


function gameMove() {
  var randomButton = $(".btn")[Math.floor(Math.random() * 4)];
  gameList.push(randomButton.id);
  gameButtonClick(randomButton.id);
  userClickedPattern = [];

}

function gameButtonClick(button) {
  playSound(button);
  $("#" + button).css('visibility', 'hidden');
  setTimeout(function() {
    $("#" + button).css('visibility', 'visible');
  }, 150);
}

function animatePressed(button) {

  $("#" + button).addClass("pressed", 100);
  setTimeout(function() {
    $("#" + button).removeClass("pressed")
  }, 100);
}

function playSound(button) {
  switch (button) {
    case ("green"):
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case ("red"):
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case ("yellow"):
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    case ("blue"):
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case ("wrong"):
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      break;
    default:
      console.log("There is no the sound file!");
  }
}

function gameOver() {
  level = 0;
  gameList = [];
  userClickedPattern = [];
  started = false;
  $("#level-title").text("Game Over! Press any Key to Restart!");

  $("body").addClass("gameOver");
  setTimeout(function() {
    $("body").removeClass("gameOver");
  }, 200);
  playSound("wrong");
}

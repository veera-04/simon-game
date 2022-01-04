var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var lvl = 0;
var started = false;

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    $("#" + color)
        .fadeOut(100)
        .fadeIn(100);
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("Level " + lvl);
    lvl++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

$(".btn").click(function () {
    if (started) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function startOver() {
    lvl = 0;
    gamePattern = [];
    started = false;
}

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLvl) {
    if (userClickedPattern[currentLvl] == gamePattern[currentLvl]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

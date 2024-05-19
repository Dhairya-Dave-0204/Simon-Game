// Array of four button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// An empty array to store random colors
var gamePattern = [];

// An empty array to store random color patterns
var userClickedPattern = [];

// Checks if the game is started or not
var started = false;

// Stores the value of level
var level = 0;

// Detects a keypress and starts the game from level 0
$(document).keypress(function() {
    if (!started) {
        // Selcts the h1 element and changes it to level
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

// Adds a selected a random color to list to generate a random pattern
$(".btn").click(function() {
    // Stores a random color by selecting a the id of html element
    var userChosenColour = $(this).attr("id");

    // Adds the random selected html element into the pattern list
    userClickedPattern.push(userChosenColour);

    //plays a souond when a color is clicked
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Calling of function after user has clicked answer
    checkAnswer(userClickedPattern.length-1);
});

// Function to check the user selected answer with generated pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("SUCCESS");
        
        // User got the recent answer correct the nit calls nextSequence after 1s
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("WRONG");

        // Plays the wrong sound when user enters a wrong answer
        playSound("wrong");

        // Applies a class game-over to the website and removes it after 200ms
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        // Displays a new title to restart the game
        $("#level-title").text("Game over, Press any key to Restart");

        // Calling aof function to restart the game
        startOver();
    }
}


function nextSequence() {
    userClickedPattern = []
    level++;
    // Updates the level value with current value 
    $("#level-title").text("Level " + level);

    // Variable which generates a random whole number between 0 to 3 
    var randomNumber = Math.floor(Math.random() * 4);

    // Selects a random color from the list of colors 
    var randomChosenColor = buttonColours[randomNumber];

    // Inserts a random color in the array
    gamePattern.push(randomChosenColor);

    // Selects the html element as the random chosen color and adds a flashing animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // plays the sound in sequence and when button is clicked
    playSound(randomChosenColor);
}

// A function that plays a random sound 
function playSound(name) {
    //makes an audiio elemnet and palys that sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// A function that animates a clicked color
function animatePress(currentColor) {
    // Selects the current random color and adds a pressed class to it 
    $("#" + currentColor).addClass("pressed");

    // a funtion that removes the pressed class from current random color after dealy of 100ms
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    // Resetting all values to 0 to restart the game
    level = 0;
    gamePattern = [];
    started = false;
}
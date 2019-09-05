$(document).ready(function () {
    $("#rock").click(function () {
        compute("rock");
    });
    $("#paper").click(function () {
        compute("paper");
    });
    $("#scissors").click(function () {
        compute("scissors");
    });
});

function compute(userchoice) {
    var opponent = Math.random();
    if (opponent < 0.34) {
        opponentChoice = "rock";
    } else if (opponent <= 0.67) {
        opponentChoice = "paper";
    } else {
        opponentChoice = "scissors";
    }

    if (userchoice === opponentChoice) {

        alert( "Its a tie! Try again");
    }

    else if (userchoice === "rock") {

        if (opponentChoice === "scissors") {
            alert( "Congrats You Won !!! Your opponent had scissors");
        }
        else {
            alert("Sorry You Lost !!! Your opponent had Papers") ;
        }
    }

    else if (userchoice === "paper") {

        if (opponentChoice === "rock") {
            alert( "Congrats You Won !!! Your opponent had rock");
        }
        else {
            alert("Sorry You Lost !!! Your opponent had scissors") ;
        }

    }

    else if (userchoice === "scissors") {

        if (opponentChoice === "rock") {
            alert("Congrats You Won !!! Your opponent had rock") ;
        }
        else {
            alert("Sorry You Lost !!! Your opponent had scissors") ;
        }
    }

}
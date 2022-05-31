var context = document.getElementById("canvas").getContext("2d");
var shape = new Object();
var time_elapsed;
var HighestPoint = 0;
var pac_clr;
var board;
var score;
var start_time;

Begin();

var interval;
var game_on;
var side = 2;
var dir = 2;
var backSound = document.getElementById("STARTGAMESound");
var winningSound = document.getElementById("WinSound");

//mine image
var mineImage = new Image();
mineImage.src = "PacmanADD/BOMB.png";


//CHARRY image
var foodImage = new Image();
foodImage.src = "PacmanADD/CHARRY.png";

//candy image
var candyImage = new Image();
candyImage.src = "PacmanADD/STAR.png";





function Begin() {

    board = new Array()
    pac_clr = "yellow";
    var cnt = 100;
    score = 0;
    

    var food_left = 65;
    var candy_left = 20;
    var mine_left = 15;
    var rest = candy_left + mine_left; //fill 30% in the rest of the canvas
    var pacman_left = 1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        for (var j = 0; j < 10; j++) {
            var randomNum = Math.random();
            if (randomNum <= 1.0 * food_left / cnt) {
                food_left--;
                board[i][j] = 1;
            } else if (randomNum < 1.0 * (pacman_left + food_left) / cnt) {
                shape.i = i;
                shape.j = j;
                pacman_left--;
                board[i][j] = 2;
            } else {
                var randomNum_2 = Math.random();
                if (randomNum_2 < 1.0 * candy_left / rest) {
                    board[i][j] = 3;
                    candy_left--;
                } else {
                    board[i][j] = 4;
                    mine_left--;
                }
                rest--;
            }
            cnt--;
        }



    }

    keysDown = {};
    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function(e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval = setInterval(UpdatedPosition, 250);
}



function PressedKeys() {

    if (keysDown[38]) { // up
        return 1;
    }
    if (keysDown[40]) { //down 
        return 2;
    }
    if (keysDown[37]) { //left
        return 3;
    }
    if (keysDown[39]) { //right
        return 4;
    } else {
        return 5;
    }
}


function muteMusic() {
    document.getElementById("STARTGAMESound").pause();
    document.getElementById("WinSound").pause();
}

function Draw() {
    canvas.width = canvas.width;
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            var x = PressedKeys();
            if (x != 5) {
                dir = x;
            }
            if (board[i][j] == 2) {
                if (dir == 2) { 
                    //down
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, 2.35 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_clr; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 15, center.y - 5, 6, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();

                }
                if (dir == 3) { // left
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_clr; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 6, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();

                }
                if (dir == 4) { // right
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_clr; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 5, center.y - 15, 6, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();

                }
                if (dir == 1) { // up
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_clr; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y + 5, 6, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                }


            } else if (board[i][j] == 1) { //CHARRY
                context.drawImage(foodImage, center.x - 20, center.y - 20);
            } else if (board[i][j] == 3) { //candy
                context.drawImage(candyImage, center.x - 25, center.y - 25);
            } else if (board[i][j] == 4) { //mine
                context.drawImage(mineImage, center.x - 20, center.y - 20);
               
            }
        }
    }

}


function UpdatedPosition() {
    board[shape.i][shape.j] = 0;
    var x = PressedKeys();
    if (x == 1) // up
    {
        if (shape.j > 0) {
            shape.j--;
        }
    }
    if (x == 2) //down
    {
        if (shape.j < 9) {
            shape.j++;
        }
    }
    if (x == 3) //left
    {
        if (shape.i > 0) {
            shape.i--;
        }
    }
    if (x == 4) //right
    {
        if (shape.i < 9) {
            shape.i++;
        }
    }

    if (board[shape.i][shape.j] == 1) // score for the CHARRY 
    {
        score++;
    }
    if (board[shape.i][shape.j] == 3) //  score for candy
    {
        score = score + 3;
    }
    if (board[shape.i][shape.j] == 4) //  score for the mine
    {
        if (score >= 2) //  score not be negative
            score = score - 2;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;

    if (FoodOver()) {
        Draw();
        winningSound.play();
        if (score >= HighestPoint) {
            HighestPoint = score;
        }
        window.clearInterval(interval);

        document.getElementById("STARTGAMESound").pause();
        Timeout(function(){
            document.getElementById("WinSound").play();
        }, 3000);
        dAlert();
        
    } else {
        Draw();
    }

    //  playMusic();

    function FoodOver() {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (board[i][j] == 1 || board[i][j] == 3)
                    return false;
            }
        }
    
        return true;
    }
    


    function dAlert() {

        Timeout(function() {
            var playAgain = window.confirm("Great. you did it!!! your time is: " + time_elapsed +
                "\n Best score so far: " + HighestPoint +
                "\n let's play again?");
            if (playAgain) {
                Begin();
                document.getElementById("WinSound").pause();
            } else {
                document.getElementById("canvas").style.backgroundColor = "black";
            }

        }, 500);

    }

}
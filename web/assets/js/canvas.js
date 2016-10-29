/**
 * 
 * Part of this code was obtained from:
 * http://www.java2s.com/
 * It wasn't attribute to any author, so it belongs to the site.
 * 
 */


var canvas = document.getElementById('hangmanCanvas');
var context = canvas.getContext('2d');
// do stuff here

lineWidthPile = 8;
lineWidthMan = 3;
colorGrass = "#33FF33";
colorWood = "#A5492A";
colorRope = "#A5872A";
colorMan = "#000000"
context.lineCap = 'round';

function updateCanvas(attemptsLeft, gameOver)
{
    if (attemptsLeft === 10)
        clearCanvas();
    if (attemptsLeft <= 9)
        attemptsLeft9();
    if (attemptsLeft <= 8)
        attemptsLeft8();
    if (attemptsLeft <= 7)
        attemptsLeft7();
    if (attemptsLeft <= 6)
        attemptsLeft6();
    if (attemptsLeft <= 5)
        attemptsLeft5();
    if (attemptsLeft <= 4)
        attemptsLeft4();
    if (attemptsLeft <= 3)
        attemptsLeft3();
    if (attemptsLeft <= 2)
        attemptsLeft2();
    if (attemptsLeft <= 1)
        attemptsLeft1();
    if (attemptsLeft <= 0)
        attemptsLeft0();

    // gameOver == 2 means the user has WON he game
    // Only draw if user has less than 6 attempts left, 
    // because that means the head has been drawn
    if (attemptsLeft <= 5 && gameOver === 2)
        happyFace();

    // gameOver == 1 means game is over, and user has LOST the game
    else if (gameOver === 1)
        sadFace();
}

// clear the canvas
function clearCanvas(){   
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Init Canvas
function initCanvas(){
    attemptsLeft9();
    attemptsLeft8();
    attemptsLeft7();
    attemptsLeft6();
}

// Ground
function attemptsLeft9(){   
    context.lineWidth = lineWidthPile;
    context.strokeStyle = colorGrass;
    context.beginPath();
    context.moveTo(100, 290);
    context.lineTo(500, 290);
    context.stroke();
}

// Pile
function attemptsLeft8(){   
    context.lineWidth = lineWidthPile;
    context.strokeStyle = colorWood;
    context.beginPath();
    context.moveTo(250, 290);
    context.lineTo(250, 50);
    context.stroke();
}

// Top of pile
function attemptsLeft7(){   
    context.lineWidth = lineWidthPile;
    context.strokeStyle = colorWood;
    context.beginPath();
    context.moveTo(250, 50);
    context.lineTo(350, 50);
    context.stroke();
}

// Rope
function attemptsLeft6(){   
    context.lineWidth = lineWidthMan;
    context.strokeStyle = colorRope;
    context.beginPath();
    context.moveTo(350, 50);
    context.lineTo(350, 80);
    context.stroke();
}

// Head
function attemptsLeft5(){ 
    context.lineWidth = lineWidthMan;
    context.strokeStyle = colorMan;
    context.beginPath();
    context.arc(350, 95, 15, 0, 360, false);
    context.stroke();
}

// Body
function attemptsLeft4(){   
    context.lineWidth = lineWidthMan;
    context.strokeStyle = colorMan;
    context.beginPath();
    context.moveTo(350, 110);
    context.lineTo(350, 190);
    context.stroke();
}

// Left arm
function attemptsLeft3(){   
    context.lineWidth = lineWidthMan;
    context.strokeStyle = colorMan;
    context.beginPath();
    context.moveTo(350, 120);
    context.lineTo(315, 140);
    context.stroke();
}

// Right arm
function attemptsLeft2(){   
    context.lineWidth = lineWidthMan;
    context.strokeStyle = colorMan;
    context.beginPath();
    context.moveTo(350, 120);
    context.lineTo(385, 140);
    context.stroke();
}

// Left leg
function attemptsLeft1(){   
    context.lineWidth = lineWidthMan;
    context.strokeStyle = colorMan;
    context.beginPath();
    context.moveTo(350, 190);
    context.lineTo(330, 250);
    context.stroke();
}

// Right leg
function attemptsLeft0(){   
    context.lineWidth = lineWidthMan;
    context.strokeStyle = colorMan;
    context.beginPath();
    context.moveTo(350, 190);
    context.lineTo(370, 250);
    context.stroke();

    context.beginPath();
    context.arc(350, 105, 5, 1.1 * Math.PI, 1.9 * Math.PI, false);
    context.stroke();
}

function sadFace(){
    context.strokeStyle = colorMan;
    drawEyes();

    context.beginPath();
    context.arc(350, 105, 6, 1.1 * Math.PI, 1.9 * Math.PI, false);
    context.stroke();

//    writeGameOverStatus("You lost!", "red");
}

function happyFace(){
    context.strokeStyle = colorMan;
    drawEyes();

    context.beginPath();
    context.arc(350, 100, 6, 2.1 * Math.PI, 2.9 * Math.PI, false);
    context.stroke();

//    writeGameOverStatus("You won!!", "green");
}

function drawEyes(){
    // Left eye
    context.lineWidth = 2;
    context.beginPath();
    context.arc(345, 92, 2, 1.1 * Math.PI, 3.1 * Math.PI, false);
    context.stroke();
    // Right eye
    context.lineWidth = 2;
    context.beginPath();
    context.arc(355, 92, 2, 1.1 * Math.PI, 3.1 * Math.PI, false);
    context.stroke();
}


/*function writeGameOverStatus(text, color){
    context.textAlign = 'left';
    context.textBaseline = 'bottom';
    context.font = '50pt Calibri';
    context.fillStyle = color;
    context.fillText(text, 85, 295);
}*/
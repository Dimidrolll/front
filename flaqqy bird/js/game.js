var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//sprites
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var false_bird = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";
false_bird.src = "img/flappy_bird_false.png";

//music
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

//difficulty
var difficulty = 1;
var difDialog =  prompt("Enter a level of difficulty(1-10): ", difficulty);

difficulty = difDialog;
var gap = 130 - 10 * difficulty;

//event
document.addEventListener("keydown", moveUp);

function moveUp() {
    if(speedY > 0) speedY = -1;
    else speedY -= 1;
    fly.play();
}

function pause(ms)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < ms);
}

//
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0

}

//bird positon
var xPos = 10;
var yPos = 150;
var grav = 1.5;
var score = 0;
var speedY = 0;


function draw() {
    ctx.drawImage(bg, 0, 0);


    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        
        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
//            bird = false_bird;
//            ctx.drawImage(false_bird, xPos, yPos);
//            pause(1000);
            alert("Game Over!\n" + "Score: " + score/*.toFixed(4)*/ + "\nRestart de gam?");
            location.reload();
        }

        if (pipe[i].x == 5) {
            score += +difficulty;
            score_audio.play();
        }
      
    }
    

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    
    yPos += grav * speedY;
    speedY += 0.03;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score/*.toFixed(4)*/, 10, cvs.height - 20)
    
    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;

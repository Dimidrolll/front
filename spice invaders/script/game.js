var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var back = new Image();
back.src = "img/background.jpg";

var rasta = new Image();
rasta.src = "img/rasta.png";

var kosyak = new Image();
kosyak.src = "img/kosyak.png";

var cop = new Image();
cop.src = "img/cop.png";
var deadcop = new Image();
deadcop.src = "img/deadcop.png";

var smoke = new Image();
smoke.src = "img/smoke.png";
//heavy file
var anime = new Image();
anime.src = "img/anime.jpg";
//heavy file
var laugh1 = new Audio();
laugh1.src = "audio/laugh01.mp3";

var laugh2 = new Audio();
laugh2.src = "audio/laugh02.mp3";

var laugh3 = new Audio();
laugh3.src = "audio/laugh03.mp3";

var laugh4 = new Audio();
laugh4.src = "audio/laugh04.mp3";

var gamer = {
    x: 365,
    damage: 1,//////
    ammo: 5 //2 default
};

var timer = 0;
var rasta_bullets = [];
var smokes = [];
var cops = [];


//control
canvas.addEventListener("keydown", function (event) {
    if (event.keyCode === 37)
        gamer.x = gamer.x - 20;
    if (event.keyCode === 39)
        gamer.x = gamer.x + 20;
    if (event.keyCode === 32)
        if (rasta_bullets.length < gamer.ammo){
            //prikol
            if (timer % 4 == 0)laugh1.play();
            if (timer % 4 == 1)laugh2.play();
            if (timer % 4 == 2)laugh3.play();
            if (timer % 4 == 3)laugh4.play();
            //prikol
            rasta_bullets.push({
                x: gamer.x + 3,
                y: 564,
                speed: 2
            });
            smokes.push({
                x:gamer.x - 5,
                y:525,
                animx:0,
                animy:0
            });
        }
});

anime.onload = function () {
    //create cops
    for (i = 0; i < 10; i++){
        cops.push({
            x: i * 60,
            y: 60,
            hp: 1
        });
    }
    game();
}

//main cycle 
function game() {
    update();
    render();

    requestAnimationFrame(game);
    //requestAnimFrame(game);
}

function update() {
    timer++;
    if (timer > 600) timer = 0;
    //smoke animation
    for (i in smokes){
        smokes[i].animx = smokes[i].animx + 0.3;
        if (smokes[i].animx > 5){
            smokes[i].animy++;
            smokes[i].animx = 0;
        }
        if(smokes[i].animy > 3)
            smokes.splice(i,1);
    }
    
    //phis
    for (i in rasta_bullets)
        rasta_bullets[i].y -= rasta_bullets[i].speed;
    ////conditions
    //actor cond
    if(gamer.x < 0) gamer.x = 0;
    if(gamer.x > 730) gamer.x = 730;
    //out bullet
    for (i in rasta_bullets)
        if(rasta_bullets[i].y < -20)
            rasta_bullets.splice(i,1);
    //bullet hit
     for (i in rasta_bullets)
        for (j in cops)   
            if (rasta_bullets[i].x + 10 > cops[j].x && 
               rasta_bullets[i].x < cops[j].x+50 && 
                rasta_bullets[i].y < cops[j].y+50){
                rasta_bullets.splice(i,1);
                cops.splice(j,1);
            }
}

function render() {
    //background
    context.drawImage(back, 0, 0, 800, 600);
    //actor/gamer
    context.drawImage(rasta, gamer.x, 530, 70, 70);
    //cops
    for (i in cops)   
        context.drawImage(cop, cops[i].x, cops[i].y, 50, 50);

    //bullets
    for (i in rasta_bullets)   context.drawImage(kosyak,rasta_bullets[i].x,rasta_bullets[i].y,20,20);
    //smoke
    for (i in smokes)        context.drawImage(smoke,256*Math.floor(smokes[i].animx),256*Math.floor(smokes[i].animy), 256,256,smokes[i].x,smokes[i].y,50,50);

}

/*var requestAnimFrame = (function (){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
        window.setTimeout(calback, 1000/20);
    };   
})();*/

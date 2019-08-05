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

var gamer = {
    x: 365,
    damage: 1//////
};
var timer = 0;
var rasta_bullets = [];


//control
canvas.addEventListener("keydown", function (event) {
    if (event.keyCode === 37)
        gamer.x = gamer.x - 20;
    if (event.keyCode === 39)
        gamer.x = gamer.x + 20;
    if (event.keyCode === 32)
        rasta_bullets.push({
            x: gamer.x + 3,
            y: 564,
            speed: 1
        });
});

rasta.onload = function () {
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
    //phis
    for (i in rasta_bullets)
        rasta_bullets[i].y -= rasta_bullets[i].speed;
    //conditions
    if(gamer.x < 0) gamer.x = 0;
    if(gamer.x > 730) gamer.x = 730;
    
    for (i in rasta_bullets)
        if(rasta_bullets[i].y < -20)
            rasta_bullets.splice(i,1);
}

function render() {
    context.drawImage(back, 0, 0, 800, 600);
    context.drawImage(rasta, gamer.x, 530, 70, 70);
    context.drawImage(cop, 0, 0, 50, 50);
    
    for (i in rasta_bullets)   context.drawImage(kosyak,rasta_bullets[i].x,rasta_bullets[i].y,20,20);
    

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

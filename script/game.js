var nbPlayer;
let cvs;
let ctx;
const BALL_SPEED = 5;
const BALL_SIZE = 20;
const PLAYER_WIDTH = 20;
let PLAYER_HEIGHT;
let ball;
let p1;
let p2;
const framePerSecond = 40;

function init(){
    // balise canvas 
    cvs = $("#background")[0];

    // contexte du canvas
    ctx = cvs.getContext("2d");
    
    // Create a Ball
    ball = new Ball(cvs.width/2 - 10,cvs.height/2 -10,BALL_SPEED,BALL_SPEED);//(-10 to be on the right of the line)(-10 to be in the center of the height)
    
    // Create players
    PLAYER_HEIGHT = cvs.height/6;
    p1 = new player(2,cvs.height/2 - 50);
    p2 = new player(cvs.width - 20 - 2,cvs.height/2 - 50);
}

function drawRectangle(x,y,w,h ,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function drawText(text,x,y,color){
    ctx.fillStyle = color;
    ctx.font = "80px fantasy";
    ctx.fillText(text,x,y);
}

function drawLine(){
    for(let i = 0;i < cvs.height;i+= 15){
        drawRectangle(cvs.width/2 - 5,i,5,10,"#fffffe");
    }
}

function setup(){
    // clear the canvas
    drawRectangle(0,0,cvs.width,cvs.height,"#0f0e17");

    //draw the line
    drawLine();

    // draw score
    drawText(p1.score,cvs.width/4,cvs.height/8,"#a7a9be");
    drawText(p2.score,3*(cvs.width/4)-40,cvs.height/8,"#a7a9be");

    // draw player
    drawRectangle(p1.x,p1.y,PLAYER_WIDTH,PLAYER_HEIGHT,"#fffffe");
    drawRectangle(p2.x,p2.y,PLAYER_WIDTH,PLAYER_HEIGHT,"#fffffe");

    // draw ball
    drawRectangle(ball.x,ball.y,BALL_SIZE,BALL_SIZE,"#fffffe");
}

function collision(p){
    if(ball.x + BALL_SIZE > cvs.width - PLAYER_WIDTH){
        ball.top = ball.y;
        ball.bottom = ball.y + BALL_SIZE;
        p.top = p.y;
        p.bottom = p.y + PLAYER_HEIGHT;
        if(ball.top < p.bottom && ball.bottom > p.top){
            return true;
        }
    } else if(ball.x < PLAYER_WIDTH+2){
        ball.top = ball.y;
        ball.bottom = ball.y + BALL_SIZE;
        p.top = p.y;
        p.bottom = p.y + PLAYER_HEIGHT;
        if(ball.top < p.bottom && ball.bottom > p.top){
            return true;
        }
    }
   return false;
}

function resetBall(){
    ball.setXY(cvs.width/2 -10,cvs.height/2);
}

function update(){
    ball.moveX();
    ball.moveY();
    if(ball.y + BALL_SIZE > cvs.height || ball.y - BALL_SIZE < 0){
        ball.bounceV();
    }
    let player = (ball.x < cvs.width /2) ? p1 : p2;
    if(collision(player)){
        ball.bounceH();
    }
    if(ball.x + BALL_SIZE > cvs.width){
        p1.incScore();
        resetBall();
    } else if(ball.x - BALL_SIZE < 0){
        p2.incScore();
        resetBall();
    }
}

function moveCpu(){
    if(ball.x > cvs.width/2){
        if(ball.y < p2.y + PLAYER_HEIGHT/2){
            p2.moveUp();
        } 
        if(ball.y > p2.y + PLAYER_HEIGHT/2){
            p2.moveDown();
        }
    }
}

function game(){
    setup();
    update();
}

function start(){
    fetch("game.php")
        .then((response) => response.text())
        .then((data) => {
            $("body").html(data);
            init();
            // boucle
            setInterval(game,1000/framePerSecond);
        });        
}

function movePlayer(){
    var map = {};
            onkeydown = onkeyup = function(e){
                e = e || this.event;
                map[e.keyCode] = e.type == 'keydown';
                // key always in use
                if(map[90] && p1.y > 0){ // z
                    p1.moveUp();
                } else if(map[83] && p1.y + PLAYER_HEIGHT < 600){ // s
                    p1.moveDown();
                }
                // key for one or two player
                if(nbPlayer == 1){
                    if(map[38] && p2.y > 0){ // up
                        p1.moveUp();
                    } else if(map[40] && p2.y + PLAYER_HEIGHT < 600){ // down
                        p1.moveDown();
                    }
                } else if(nbPlayer == 2){
                    if(map[90] && map[38]){ // z+up
                        if(p1.y > 0){
                            p1.moveUp();
                        }
                        if(p2.y > 0){
                            p2.moveUp();
                        }
                    } else if(map[90] && map[40]){ // z+down
                        if(p1.y > 0){
                            p1.moveUp();
                        }
                        if(p2.y + PLAYER_HEIGHT < 600){
                            p2.moveDown();
                        }
                    } else if(map[83] && map[38]){ // s+up
                        if(p1.y + PLAYER_HEIGHT < 600){
                            p1.moveDown();
                        }
                        if(p2.y > 0){
                            p2.moveUp();
                        }
                    } else if(map[83] && map[40]){ //s+down
                        if(p1.y + PLAYER_HEIGHT < 600){
                            p1.moveDown();
                        }
                        if(p2.y + PLAYER_HEIGHT < 600){
                            p2.moveDown();
                        }
                    } else if(map[38] && p2.y > 0){ // up
                        p2.moveUp();
                    } else if(map[40] && p2.y + PLAYER_HEIGHT < 600){ // down
                        p2.moveDown();
                    }
                }
            }
    }

$("#button1").click(function(){
    nbPlayer = 1;
    start();
    movePlayer();
    setInterval(moveCpu,550);
});
$("#button2").click(function(){
    nbPlayer = 2;
    start();
    movePlayer();
});

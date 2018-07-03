let canvas,
    canvasContext,
    ballX = 50,
    ballY = 50,
    ballSpeedX = 5,
    ballSpeedY = 5,
    paddle1Y = 250,
    paddle2Y = 250,
    player1Score = 0,
    player2Score = 0,
    winScreen = false;


const paddleHeight = 100,
      paddleWidth = 10,
      winningScore = 5;

calculateMousePosition=(e)=>{
    let rectangle = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rectangle.left - root.scrollLeft;
    let mouseY = e.clientY - rectangle.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    }
};

window.onload =()=> {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framePerSecond =30;
    setInterval(()=>{moveEverything(), drawEverything();
    }, 1000/framePerSecond);

    canvas.addEventListener('mousemove',(e)=>{
            let mousePos = calculateMousePosition(e);
            paddle1Y = mousePos.y -(paddleHeight/2);
    })
};
ballReset =()=>{
    if (player1Score >= winningScore || player2Score >= winningScore){
        player1Score = 0;
        player2Score = 0;
        winScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
};

computerMovement =()=>{
    const paddle2Ycenter = paddle2Y + (paddleHeight/2);
    if(paddle2Ycenter < ballY -35) {
        paddle2Y += 6;
    }else if (paddle2Ycenter > ballY +35){
        paddle2Y -= 6;
    }
};

moveEverything =()=>{
    if(winScreen){
        return;
    }
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0) {
        if(ballY > paddle1Y && ballY <paddle1Y +paddleHeight){
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY -(paddle1Y +paddleHeight/2);
                ballSpeedY = deltaY * 0.35;
        }else {
            player2Score += 1;
            ballReset();
        }
    }
    if (ballX > canvas.width -10) {
        if(ballY > paddle2Y && ballY <paddle2Y +paddleHeight){
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY -(paddle2Y +paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        }else {
            player1Score +=1;
            ballReset();
        }
    }
        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballY > canvas.height -10) {
            ballSpeedY = -ballSpeedY;
        }
};

drawEverything=()=> {
    if(winScreen){
        canvasContext.fillText('click to continue', 50, 50);
        return;
    }
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    //ball size
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(ballX,ballY,10,10);
    //paddle left
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,paddle1Y, paddleWidth, paddleHeight);
    //paddle right
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(990,paddle2Y, paddleWidth, paddleHeight);
    //Score
    canvasContext.fillText(player1Score, 50, 50);
    canvasContext.fillText(player2Score, 950, 50);

};
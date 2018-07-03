let canvas,
    canvasContext,
    ballX = 50,
    ballY = 50,
    ballSpeedX = 5,
    ballSpeedY = 2,
    paddle1Y = 250,
    paddle2Y = 250;

const paddleHeight = 100,
    paddleWidth = 10;

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
            paddle2Y = mousePos.y -(paddleHeight/2);
    })
};
ballReset =()=>{
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
};

moveEverything=()=>{
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX < 0) {
        if(ballY > paddle1Y && ballY <paddle1Y +paddleHeight){
            ballSpeedX = -ballSpeedX
        }else {
            ballReset();
        }
    }
    if (ballX > canvas.width -10) {
        if(ballY > paddle2Y && ballY <paddle2Y +paddleHeight){
            ballSpeedX = -ballSpeedX
        }else {
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


};
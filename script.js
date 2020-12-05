let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let boardBounds = board.getBoundingClientRect();
let x = true,
    y = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");

function movePaddle(cPaddle, change) {
    let cPaddleBounds = cPaddle.getBoundingClientRect();
    if (cPaddleBounds.top + change >= boardBounds.top && cPaddleBounds.bottom + change <= boardBounds.bottom) {
        cPaddle.style.top = cPaddleBounds.top + change + "px";
    }
}

function resetGame() {
    ball.style.top = window.innerHeight * 0.45 + "px";
    ball.style.left = window.innerWidth * 0.45 + "px";
    requestAnimationFrame(moveBall);
}

function setColor(idx) {
    let allIcons = document.querySelectorAll(".fa.fa-circle");
    allIcons[idx].style.color = "#ffffcc";
}
//user input listen
document.addEventListener("keydown", function(e) {
    console.log("kuch toh hua hh");
    if (e.key == "w") {
        movePaddle(leftPaddle, -window.innerHeight * 0.1);
    } else if (e.key == "s") {
        movePaddle(leftPaddle, window.innerHeight * 0.1);
    } else if (e.key == "ArrowUp") {
        movePaddle(rightPaddle, -window.innerHeight * 0.1);
    } else if (e.key == "ArrowDown") {
        movePaddle(rightPaddle, window.innerHeight * 0.1);
    }
})

function moveBall() {
    let ballcord = ball.getBoundingClientRect();
    let ballTop = ballcord.top;
    let ballLeft = ballcord.left;
    let ballBottom = ballcord.bottom;
    let ballRight = ballcord.right;
    // is Ball in bound

    // handle Vertical Bound
    if (ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom) {
        y = !y;
    }

    // handle lives and GameOver
    let hasTouchedLeft = ballLeft < boardBounds.left;
    let hasTouchedRight = ballRight > boardBounds.right;
    if (hasTouchedLeft || hasTouchedRight) {
        if (hasTouchedLeft) {
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if (leftPlayerLives == 0) {
                alert("Game Over !!, Player B won.");
                document.location.reload();
            } else {
                return resetGame();
            }
        } else {
            rightPlayerLives--;
            setColor(3 + rightPlayerLives);
            if (rightPlayerLives == 0) {
                alert("Game Over !!, Player A won.");
                document.location.reload();
            } else {
                return resetGame();
            }
        }
    }



    //Collision
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    if (ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left && ballTop + 30 >= leftPaddleBounds.top &&
        ballTop - 30 <= leftPaddleBounds.bottom) {
        x = !x;
    }

    if (ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left && ballTop + 30 >= rightPaddleBounds.top &&
        ballTop - 30 <= rightPaddleBounds.bottom) {
        x = !x;
    }

    ball.style.top = y == true ? ballTop + 5 + "px" : ballTop - 5 + "px";
    ball.style.left = x == true ? ballLeft + 5 + "px" : ballLeft - 5 + "px";

    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);
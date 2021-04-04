// Models
import { CanvasView } from "./view/CanvasView";
import { Ball } from "./models/Ball";
import { Paddle } from "./models/Paddle";
import { Brick } from "./models/Brick";

// Image
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

// Level settings and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from "./setup";

// Helpers
import { createBricks } from "./helpers";
import { CollisionHandler } from "./CollisionHandler";

// Constants
let gameOver = false;
let score = 0;

// Functions
function setGameOver(canvas: CanvasView): void {
    canvas.drawInfo("Game over!");
    gameOver = false;
}

function setGameWin(canvas: CanvasView): void {
    canvas.drawInfo("You win!");
    gameOver = false;
}

function startGame(canvas: CanvasView) : void {
    // Reset display
    score = 0;
    canvas.drawInfo("");
    canvas.drawScore(0);
    // Get and draw bricks
    const bricks = createBricks(); 
    canvas.drawBricks(bricks);
    // create ball
    const ball = new Ball(
        BALL_IMAGE,
        {x: BALL_STARTX, y: BALL_STARTY},
        BALL_SIZE,
        BALL_SIZE,
        BALL_SPEED
        );
    // create paddle
    const paddle = new Paddle(
        PADDLE_IMAGE,
        {x: PADDLE_STARTX, y: canvas.canvas.height - PADDLE_HEIGHT - 5},
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        PADDLE_SPEED
        );

    // Instantiate a CollisionHandler
    const collisionHandler = new CollisionHandler();

    // Loop the game
    gameLoop(canvas, bricks, ball, paddle, collisionHandler);
}

function gameLoop(
    canvas: CanvasView,
    bricks: Brick[],
    ball: Ball,
    paddle: Paddle,
    collisionHandler: CollisionHandler
): void {
    canvas.clear();
    canvas.drawBricks(bricks);
    canvas.drawModel(paddle);
    canvas.drawModel(ball);

    // Move ball
    ball.moveBall();

    // Checking paddle movement
    if(paddle.isMovingLeft && paddle.getPosition.x > 0
        || paddle.isMovingRight && paddle.getPosition.x < canvas.canvas.width - paddle.getWidth)
    {
        paddle.movePaddle();
    }

    // Handling collision
    collisionHandler.handleBallCollision(ball, paddle, canvas);
    const isColliding = collisionHandler.handleBrickCollision(ball, bricks);

    // Adding to score on collision
    if(isColliding){
        score += 1;
        canvas.drawScore(score);
    }

    // Handling winning and losing conditions
    if(bricks.length === 0){
        canvas.drawBricks(bricks);
        return setGameWin(canvas);
    }
    if(ball.getPosition.y > canvas.canvas.height)
        gameOver = true;

    if(gameOver === true)
        return setGameOver(canvas);

    requestAnimationFrame(() => gameLoop(canvas, bricks, ball, paddle, collisionHandler));
}

// Instantiating a Canvas
const canvas = new CanvasView("#playField");
canvas.initStartButton(startGame);
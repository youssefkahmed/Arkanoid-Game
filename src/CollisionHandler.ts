import { CanvasView } from "./view/CanvasView";
import { Ball } from "./models/Ball";
import { Paddle } from "./models/Paddle";
import { Brick } from "./models/Brick";

export class CollisionHandler
{
    // Handling ball collisions
    public handleBallCollision(ball: Ball, paddle: Paddle, canvas: CanvasView): void {
        // Ball collision with paddle
        if(ball.getPosition.x + ball.getWidth > paddle.getPosition.x
            && ball.getPosition.x < paddle.getPosition.x + paddle.getWidth
            && ball.getPosition.y + ball.getHeight === paddle.getPosition.y) {
                ball.changeDirectionY();
            }

        // Ball collision with walls
        if(ball.getPosition.x < 0
            || ball.getPosition.x + ball.getWidth > canvas.canvas.width) {
                ball.changeDirectionX();
            }
        
        // Ball Y-Axis constraints
        if(ball.getPosition.y < 0) {
            ball.changeDirectionY();
        }
    }

    // Handling brick collisions
    public handleBrickCollision(ball: Ball, bricks: Brick[]) : boolean {
        let isColliding = false
        bricks.forEach(
            (brick, index) => {
                if(this.isCollidingWithBrick(ball, brick)){
                    ball.changeDirectionY();
                    brick.setEnergy = brick.getEnergy - 1;

                    if(brick.getEnergy === 0){
                        bricks.splice(index, 1);
                    }

                    isColliding = true;
                }
            }
        );

        return isColliding;
    }

    // Helper function to check if the ball is colliding with a certain brick
    public isCollidingWithBrick(ball: Ball, brick: Brick): boolean {
        if(ball.getPosition.x + ball.getWidth > brick.getPosition.x
            && ball.getPosition.x < brick.getPosition.x + brick.getWidth
            && ball.getPosition.y + ball.getHeight > brick.getPosition.y
            && ball.getPosition.y < brick.getPosition.y + brick.getHeight) {
                return true;
            }
        return false;
    }
}
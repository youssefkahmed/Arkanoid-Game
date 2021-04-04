import { Vector } from "../types";

export class Paddle {
    private image = new Image();
    private moveLeft: boolean;
    private moveRight: boolean;

    constructor(
        imagePath: string,
        private position: Vector,
        private width: number,
        private height: number,
        private speed: number,
    ) {
        this.image.src = imagePath;
        this.position = position;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.moveLeft = false;
        this.moveRight = false;

        // Handling movement
        document.addEventListener("keydown", this.keyDownHandler);
        document.addEventListener("keyup", this.keyUpHandler);
    }

    // Getters
    get getImage(): HTMLImageElement {
        return this.image;
    }
    
    get getPosition(): Vector {
        return this.position;
    }

    get getWidth(): number {
        return this.width;
    }
    
    get getHeight(): number {
        return this.height;
    }

    get getSpeed(): number {
        return this.speed;
    }

    get isMovingLeft(): boolean {
        return this.moveLeft;
    } 

    get isMovingRight(): boolean {
        return this.moveRight;
    } 

    // Setters
    set setSpeed(speed: number) {
        this.speed = speed;
    }

    // Functions
    public movePaddle(): void {
        if(this.moveLeft)
            this.position.x -= this.speed;
        else if(this.moveRight)
            this.position.x += this.speed;
    }

    keyUpHandler = (event: KeyboardEvent) => {
        if(event.code === "ArrowLeft") this.moveLeft = false;
        else if(event.code === "ArrowRight") this.moveRight = false;
    }

    keyDownHandler = (event: KeyboardEvent) => {
        if(event.code === "ArrowLeft") this.moveLeft = true;
        else if(event.code === "ArrowRight") this.moveRight = true;
    }
}
import { Vector } from "../types";

export class Ball {
    private image = new Image();
    private speed: Vector;

    constructor(
        imagePath: string,
        private position: Vector,
        private width: number,
        private height: number,
        speed: number
    ) {
        this.image.src = imagePath;
        this.position = position;
        this.width = width;
        this.height = height;
        this.speed = {x: speed, y: -speed};
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

    get getSpeed(): Vector {
        return this.speed;
    }

    // Setter
    set setSpeed(speed: number){
        this.speed = {x: speed, y: -speed};
    }

    // Functions
    public changeDirectionY(): void {
        this.speed.y = -this.speed.y;
    }

    public changeDirectionX(): void {
        this.speed.x = -this.speed.x;
    }

    public moveBall(): void {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}
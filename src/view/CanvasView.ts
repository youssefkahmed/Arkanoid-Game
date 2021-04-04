import { Ball } from "../models/Ball";
import { Brick } from "../models/Brick";
import { Paddle } from "../models/Paddle";

export class CanvasView {
    
    canvas : HTMLCanvasElement;
    private renderContext : CanvasRenderingContext2D | null;
    private scoreDisplay : HTMLObjectElement | null;
    private start : HTMLObjectElement | null;
    private info : HTMLObjectElement | null;

    constructor(canvasName: string){
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.renderContext = this.canvas.getContext("2d");
        this.scoreDisplay = document.querySelector("#score");
        this.start = document.querySelector("#start");
        this.info = document.querySelector("#info");
    }

    public clear(): void {
        this.renderContext?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public initStartButton(startFunction: (view: CanvasView) => void): void {
        this.start?.addEventListener("click", () => startFunction(this));
    }

    public drawScore(score: number): void {
        if(this.scoreDisplay)
            this.scoreDisplay.innerHTML = score.toString();
    }

    public drawInfo(text: string): void {
        if(this.info)
            this.info.innerHTML = text;
    }

    public drawModel(model: Brick | Paddle | Ball): void {
        if(!model)
            return

        this.renderContext?.drawImage(
            model.getImage,
            model.getPosition.x,
            model.getPosition.y,
            model.getWidth,
            model.getHeight
        );
    }

    public drawBricks(bricks: Brick[]): void {
        if(!bricks)
            return
        
        bricks.forEach(
            brick => this.drawModel(brick)
        );
    }
}
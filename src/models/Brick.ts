import { Vector } from "../types";

export class Brick {
    private image = new Image();

    constructor(
        imagePath: string,
        private position: Vector,
        private width: number,
        private height: number,
        private energy: number,
    ) {
        this.image.src = imagePath;
        this.position = position;
        this.width = width;
        this.height = height;
        this.energy = energy;
    }

    // Getters
    get getImage(): HTMLImageElement {
        return this.image;
    }
    
    get getPosition(): Vector {
        return this.position;
    }

    get getHeight(): number {
        return this.height;
    }

    get getWidth(): number {
        return this.width;
    }

    get getEnergy(): number {
        return this.energy;
    }

    // Setters
    set setEnergy(energy: number) {
        this.energy = energy;
    }
}
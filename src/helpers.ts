import {
    BRICK_IMAGES,
    BRICK_WIDTH,
    BRICK_HEIGHT,
    BRICK_ENERGY,
    BRICK_PADDING,
    STAGE_PADDING,
    STAGE_COLS,
    LEVEL
} from "./setup";

import { Brick } from "./models/Brick";

// Functions
export function createBricks(): Brick[] {
    return LEVEL.reduce(
        (accum, element, iterator) => {
            const row = Math.floor(iterator + 1) / STAGE_COLS;
            const col = iterator % STAGE_COLS;

            const x = STAGE_PADDING + col * (BRICK_WIDTH+BRICK_PADDING);
            const y = STAGE_PADDING + row * (BRICK_HEIGHT+BRICK_PADDING);

            if(element === 0)
                return accum;
            
            return [ ...accum,
                new Brick(
                BRICK_IMAGES[element],
                {x, y},
                BRICK_WIDTH,
                BRICK_HEIGHT,
                BRICK_ENERGY[element])
            ];
        },
        [] as Brick[]
    );
}
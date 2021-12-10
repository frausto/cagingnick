import { Position } from "./types/Position"

export class PositionRandomizer {
  
  generatePositionInRect(container: DOMRect, target: DOMRect) : Position {
    const xPercent = Math.random();
    const yPercent = Math.random();

    let x = container.width * xPercent;
    let y = container.height * yPercent;

    // snap to bounds
    // ensure the image visually is within the bounds
    // position top left doesn't appear to include the border - border is included in right/bottom - thus the +2 to the image width
    if (x < 0) {
      x = 0;
    } else if (x > container.width - (target.width + 2)) {
      x = container.width - (target.width + 2);
    }
    
    if (y < 0) {
      y = 0;
    } else if (y > container.height - (target.height + 2)) {
      y = container.height - (target.height + 2);
    }

    return new Position(x, y)
  }
}
import { AnimationControls } from "framer-motion";
import { Position } from "../position/types/Position";
import { Vector2D } from "../position/types/Vector";

export type AnimationStep = {
  play: (animator: AnimationControls) => void
}

export class MoveToPositionAnimationStep implements AnimationStep {
  _getPosition: () => Position;

  constructor(getPositionFunc: () => Position) {
    this._getPosition = getPositionFunc;
  }

  _getAnimationDefinition() {
    const position = this._getPosition();
    return {
      left: position.x.toString() + 'px',
      top: position.y.toString() + 'px',
      transition: { type: "easeInOut", duration: 1 },
    }
  }

  async play(animator: AnimationControls) {
    const animationDef = this._getAnimationDefinition();
    return await animator.start(animationDef);
  }
}

export class SetAtPositionAnimationStep implements AnimationStep {
  _getPosition: () => Position;

  constructor(getPositionFunc: () => Position) {
    this._getPosition = getPositionFunc;
  }

  _getAnimationDefinition() {
    const position = this._getPosition();
    return {
      left: position.x + 'px',
      top: position.y + 'px',
      display: 'inline',
      transition: {
        type: 'tween',
        duration: 0
      }
    }
  }

  async play(animator: AnimationControls) {
    const animationDef = this._getAnimationDefinition();
    return await animator.start(animationDef);
  }
}

export class VectorMoveAnimationStep implements AnimationStep {
  _getVector: () => Vector2D;

  constructor(getVectorFunc: () => Vector2D) {
    this._getVector = getVectorFunc;
  }

  _getAnimationDefinition() {
    const vector = this._getVector();
    return {
      x: vector.x + 'px',
      y: vector.y + 'px',
      transition: {
        type: 'tween',
        duration: 0.5
      },
    }
  }

  async play(animator: AnimationControls) {
    const animationDef = this._getAnimationDefinition();
    return await animator.start(animationDef);
  }
}

// finish remaining animation in place and reset position
// remove from dom with display none - so able to click target element
export class ResetAnimationStep implements AnimationStep {
  _getAnimationDefinition() {
    return {
      scale: 1,
      transition: {
        type: 'tween',
        duration: 1
      },
      transitionEnd: {
        display: 'none',
        left: 0,
        top: 0,
        x: 0,
        y: 0
      }
    }
  }

  async play(animator: AnimationControls) {
    const animationDef = this._getAnimationDefinition();
    return await animator.start(animationDef);
  }
}

export class VideoAnimationStep implements AnimationStep {
  _videoElem: HTMLVideoElement;

  constructor(videoElem: HTMLVideoElement) {
    this._videoElem = videoElem;
  }

  async play(animator: AnimationControls) {
    return new Promise<void>((resolve, reject) => {
      this._videoElem.play();
      resolve();
    });
  }
}

/*
const moveWithResetSequence = async (animation: AnimationControls, start: Position, to: Vector2D) => {
  await vid();
  // set the position to where clicked element is
  await animation.start({
    left: start.x + 'px',
    top: start.y + 'px',
    display: 'inline',
    transition: {
      type: 'tween',
      duration: 0
    }
  });
  // move aimation to target cage
  await animation.start({
    x: to.x + 'px',
    y: to.y + 'px',
    transition: {
      type: 'tween',
      duration: 0.5
    },
  });
  // finish remaining animation in place and reset position
  // remove from dom with display none - so able to click target element
  return animation.start({
    x: to.x + 'px',
    y: to.y + 'px',
    transition: {
      type: 'tween',
      duration: 1
    },
    transitionEnd: {
      display: 'none',
      left: 0,
      top: 0,
      x: 0,
      y: 0
    }
  });
}

const vid = () => {
  return new Promise<void>((resolve, reject) => {
    const vid = document.getElementById("starVideo") as HTMLVideoElement;
    vid.play();
    resolve();
  });
}
*/
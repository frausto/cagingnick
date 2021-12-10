import { AnimationControls } from "framer-motion";
import { Position } from "../position/types/Position";
import { Vector2D } from "../position/types/Vector";

// type interface where each step exposes a play function used in the orchestration clss AnimationSequence
export type AnimationStep = {
  play: (animator: AnimationControls) => void
}

// Below are concrete implementations of the AnimationStep type interface
// accepts dependencies via constructor injection and defines its own animation object literal used in AnimationControls.start
// play method accepts the runtime AnimationControl since the AnimationControl is a react hook and must be instantiated inside a react component
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

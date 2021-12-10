import { AnimationControls } from "framer-motion";
import { AnimationSequence } from "./AnimationSequence";

export class AnimationRunner {
  _sequences: Array<AnimationSequence>;
  _animators: Array<AnimationControls>;

  constructor() {
    this._sequences = new Array<AnimationSequence>();
    this._animators = new Array<AnimationControls>();
  }

  add(sequence: AnimationSequence, animator: AnimationControls) {
    this._sequences.push(sequence);
    this._animators.push(animator);
  }

  run() {
    for (let i = 0; i < this._sequences.length; i ++) {
      const animator = this._animators[i];
      const sequence = this._sequences[i];
      sequence.play(animator);
    }
  }
}
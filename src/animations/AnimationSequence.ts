import { AnimationControls } from "framer-motion";
import { AnimationStep } from "./AnimationSteps";

// AnimationSequence abstracts framer motion multi step animations
// uses AnimationSteps as the equivalent for AnimationControls.start
// sample: new AnimationSequence().add(new AnimationStep()).play(animator);
export class AnimationSequence {
  _steps: Array<AnimationStep>;

  constructor() {
    this._steps = new Array<AnimationStep>();
  }

  add(step: AnimationStep) {
    this._steps.push(step);
    return this;
  }

  async play(animator: AnimationControls): Promise<any> {
    for (let i = 0; i < this._steps.length - 1; i++) {
      const step = this._steps[i];
      await step.play(animator);
    }
    // last step return a promise
    const step = this._steps[this._steps.length - 1];
    return await step.play(animator);
  }
}

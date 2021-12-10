import React, { useEffect, useState, useRef } from "react";
import styles from "./GameBoard.module.css";
import { motion, useAnimation } from "framer-motion";
import { rootStore } from "../../stores/RootStore";
import { Position } from "../../position/types/Position";
import { Vector2D } from "../../position/types/Vector";
import { PositionRandomizer } from "../../position/Randomizer";

import { AnimationSequence } from "../../animations/AnimationSequence";
import {
  MoveToPositionAnimationStep,
  SetAtPositionAnimationStep,
  VectorMoveAnimationStep,
  ResetAnimationStep,
  VideoAnimationStep
} from "../../animations/AnimationSteps"

// contains game logic
export const GameBoard: React.FC = () => {
  const { gameStore } = rootStore;
  const nick = gameStore.nick;

  const positionRandomizer = new PositionRandomizer();
  // used in position/vector calculations
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const sparkleVideoRef = useRef<HTMLVideoElement>(null);
  const starVideoRef = useRef<HTMLVideoElement>(null);
  // for the starting randomized position
  const [startPos, setStartPos] = useState(new Position(0, 0));

  const moveNickAnimator = useAnimation();
  const [moveNickAnimation] = useState(new AnimationSequence());
  const moveStarAnimator = useAnimation();
  const [moveStarAnimation] = useState(new AnimationSequence());

  // eslint warnings on dependencies
  // went down rabbit hole of useCallback, inline wrapped functions, and removing the deps array results in compilation error
  // disaling linting for this bit -- really just need this portion to execute once
  useEffect(() => {
    setStartPos(getRandomPosition());
    moveNickAnimation
      .add(new MoveToPositionAnimationStep(getRandomPosition))
      .add(new VideoAnimationStep(sparkleVideoRef.current as HTMLVideoElement));
    moveStarAnimation
      .add(new VideoAnimationStep(starVideoRef.current as HTMLVideoElement))
      .add(new SetAtPositionAnimationStep(getNickPosition))
      .add(new VectorMoveAnimationStep(getCageVector))
      .add(new ResetAnimationStep());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // helper method to get the game board's bounding box
  const getGameBoardRect = () => {
    const gameElem = gameBoardRef?.current as HTMLElement;
    return gameElem.getBoundingClientRect();
  }

  // helper method to get the clickable element bounding box
  const getClickRect = () => {
    const clickElem = clickRef?.current as HTMLElement;
    return clickElem.getBoundingClientRect();
  }

  // uses the game board bounding box and dimensions of the clicked element to derive a random position in the game board bounds
  const getRandomPosition = () => {
    const gameRect = getGameBoardRect();
    const clickRect = getClickRect()
    return positionRandomizer.generatePositionInRect(gameRect, clickRect);
  }

  // for moving the clicked element inside the game board's bounds
  // since the clicked element is a direct child of the game board, can simply specifiy the absolute position to move to instead of translation
  const getNickPosition = () => {
    const clickElem = clickRef.current as HTMLElement;
    return new Position(parseFloat(clickElem.style.left.replace("px", "")), parseFloat(clickElem.style.top.replace("px", "")))
  }

  // for moving the star animation to the cage
  // calculates the translation X and Y needed for the animation since the cage's is not in the same bounding box as the clicked element
  const getCageVector = () => {
    const bound = getClickRect();
    const cageBound = gameStore.getCageBound();

    const x = cageBound.x - bound.left;
    const y = cageBound.y - bound.top;

    return new Vector2D(x, y);
  }

  const onNickClick = (e: React.MouseEvent<HTMLElement>) => {
    gameStore.addPoints(10);

    moveStarAnimation.play(moveStarAnimator);
    moveNickAnimation.play(moveNickAnimator);

    // stop the event bubble 
    // otherwise assume the user has clicked on the game board in gameBoardClicked
    e.stopPropagation();
  }

  // didn't click the nick, oops
  const onGameBoardClick = () => {
    gameStore.addPoints(-3);
  }

  return (
    <div ref={gameBoardRef} className={styles.boundingBox} onClick={onGameBoardClick}>
      <motion.div ref={clickRef} animate={moveNickAnimator} className={styles.clickPoint} style={{
        left: startPos.x + 'px',
        top: startPos.y + 'px',
      }} onClick={(e) => onNickClick(e)}>
        <div>
          <img src={nick.image} className={styles.nickImage} alt={nick.name} />
          <video muted ref={sparkleVideoRef} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <source src="sparkle.webm" type="video/webm" />
          </video>
        </div>
      </motion.div>
      <motion.div animate={moveStarAnimator} id={styles.starAnimation} style={{
        display: 'none'
      }}>
        <video muted ref={starVideoRef} id={styles.sparkleVideo}>
          <source src="star_fly.webm" type="video/webm" />
        </video>
      </motion.div>
    </div>
  )
}



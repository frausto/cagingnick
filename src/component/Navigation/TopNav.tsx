import React, { useEffect, useRef } from "react";
import styles from "./TopNav.module.css"
import cageImg from '../../images/cage.png';
import { rootStore } from "../../stores/RootStore"
import { observer } from "mobx-react"
import { NavLink } from "react-router-dom"
import { Position } from "../../position/types/Position";

export const TopNav: React.FC = observer(() => {
  const { gameStore } = rootStore;
  const cageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gameStore.setCageBoundsFunc(getCagePosition);
  }, [])

  const getCagePosition = (): Position => {
    const cageElement = cageRef?.current as HTMLElement;
    const cageBound = cageElement.getBoundingClientRect();
    return new Position(cageBound.left, cageBound.top);
  }

  return (
    <div className={styles.topNavArea}>
      <div className={styles.title}>
        Caging Nicolas Cage
        <nav>
          <ul>
            <li>
              <NavLink to="/">Choose</NavLink>
            </li>
            <li>
              <NavLink to="/play">Play</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className={styles.cageArea}>
          <div className={styles.cageImageContainer}>
            <img src={cageImg} className={styles.cageImage} alt="nickcage" />
            <img ref={cageRef} src={gameStore.nick.image} className={styles.nickImage} alt={gameStore.nick.name} />
          </div>
          <span className={styles.pointCount}>
            x {gameStore.nick.points}
          </span>
      </div>
    </div>
  )}
);



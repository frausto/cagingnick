import React from "react";
import styles from "./Game.module.css";
import { rootStore } from "../../stores/RootStore";
import { GameBoard } from "./GameBoard";

export const Game: React.FC = () => {
  const { gameStore } = rootStore;

  if (gameStore.error !== '') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.centerWrapper}>
          <p className={styles.warning}><img src="warning.png" alt="warning" /></p>
          <p className={styles.warning}>{gameStore.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h3>Click Nick!</h3>
      <GameBoard />
    </div>
  )
}

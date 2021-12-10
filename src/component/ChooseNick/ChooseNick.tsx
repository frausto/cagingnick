import React, { useEffect }  from "react";
import styles from "./ChooseNick.module.css";
import { observer } from "mobx-react"
import { rootStore } from "../../stores/RootStore"
import { SelectNick } from "./SelectNick";

export const ChooseNick: React.FC = observer(() => {
  const { gameStore } = rootStore;

  useEffect(() => {
    async function getData() {
      await gameStore.getAllNicks()
    }
		getData()
  }, [gameStore])

  if (gameStore.loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.centerWrapper}>
          <img src="loading.gif" alt="loading" />
        </div>
      </div>
    )
  }

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
      <h3>Choose your Nick</h3>
      <div>
        {gameStore.allNicks.map(n => <SelectNick key={n.id} nick={n} chosen={gameStore.nick.id === n.id} onChoose={gameStore.chooseNick} />)}
      </div>
    </div>
  )
})

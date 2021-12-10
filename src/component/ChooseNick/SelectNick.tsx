import React from "react";
import styles from "./SelectNick.module.css";

type Props = {
  nick: any;
  chosen: boolean;
  onChoose: (nick:any) => void;
};

export const SelectNick: React.FC<Props> = ({nick, chosen, onChoose}) => {
  
  return (
    <div className={styles.nickChoice} onClick={() => onChoose(nick)}>
      <img src={nick.image} className={styles.nickImage} alt={nick.name} />
      <div>
        {nick.name}
        {chosen ?  <span className={styles.choosen}>✅</span> : null}
      </div>
    </div>
  )
}

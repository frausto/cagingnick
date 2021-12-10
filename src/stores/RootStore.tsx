import { gameStore, GameStore } from "./GameStore";

export type RootStore = {
  gameStore: GameStore;
};

export const rootStore = {
  gameStore: gameStore(),
} as RootStore;

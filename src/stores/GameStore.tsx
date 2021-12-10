import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';
import { CageApi } from "../api/cage";
import { Nick } from "../types/Nick";
import { Position } from "../position/types/Position"

const cageApi = new CageApi();

export type GameStore = {
  loading: boolean,
  error: string,
  allNicks: Nick[],
  getAllNicks: () => Promise<Nick[]>,
  points: number,
  addPoints: (points: any) => void,
  nick: Nick,
  chooseNick: (nick: Nick) => void,
  getCageBound: () => Position,
  setCageBoundsFunc: (callback: () => Position) => void,
};

export const gameStore = (): GameStore => {
  const store = makeAutoObservable({
    loading: false,
    setLoading: (value: boolean) => {
      store.loading = value;
    },
    error: '',
    setError: (message: string) => {
      store.error = message;
    },
    allNicks: new Array<Nick>(),
    getAllNicks: async (): Promise<Nick[]> => {
      if (!store.allNicks || store.allNicks.length === 0) {
        store.setLoading(true);
        try {
          const res = await cageApi.getAll();
          store.setAllNicks(res);
          store.setCurrentNick(res[0]);
        } catch(e) {
          const message = (e instanceof Error) ? e.message : String(e);
          store.setError(message);
        } finally {
          store.setLoading(false);
        }
      }
      return store.allNicks;
    },
    setAllNicks: (data: Nick[]) => {
      store.allNicks = data;
    },
    updateNick: async (nick:Nick) => {
      for (let n of store.allNicks) {
        if (n.id === nick.id) { 
          n.points = nick.points;  
          break; 
        }
      }
      try {
        await cageApi.update(store.allNicks);
      } catch(e) {
        const message = (e instanceof Error) ? e.message : String(e);
        store.setError(message);
      }
    },
    points: 0,
    nick: { id: 0, points: 0, name: '', image: '' },
    setCurrentNick: (selected: Nick) => {
      store.nick = selected;
    },
    addPoints: (points: number) => {
      if (store.nick) {
        store.nick.points += points;
        if (store.nick.points < 0) {
          store.nick.points = 0;
        }
        store.updateNick(store.nick);
      }
    },
    chooseNick: (nick: Nick) => {
      store.nick = nick;
    },
    getCageBound: () => {
      return new Position(0, 0);
    },
    setCageBoundsFunc: (callback: () => Position) => {
      store.getCageBound = callback;
    },
  });

  // for when the game is reloaded, selected item is not lost
  makePersistable(store, { name: 'SampleStore', properties: ['nick'], storage: window.localStorage });

  return store;
};

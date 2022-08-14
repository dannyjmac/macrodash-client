import { makeAutoObservable } from "mobx";
import { API } from "../api";

export class Store {
  // UI Logic state - all the state for all user interaction
  // discover = new DiscoverView(this);
  api: {
    api: API;
  };

  constructor(api: API) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { api };
  }
}

export const createStore = () => {
  const api = new API();
  return new Store(api);
};

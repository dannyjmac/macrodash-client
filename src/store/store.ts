import { makeAutoObservable } from "mobx";
import { M2_MONEY_SUPPLY } from "../constants/endpoints";
import { API } from "../api";

export class Store {
  api: API;
  m2MoneySupply: any = null;
  yields: any = null;

  constructor(api: API) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = api;
  }

  fetchM2MoneySupply = async () => {
    try {
      const response = await this.api.fetchSeriesByTag(M2_MONEY_SUPPLY);

      if (!response?.data) return;

      this.m2MoneySupply = response.data;
    } catch (err) {
      console.log({ err });
    }
  };

  fetchYields = async () => {
    try {
      const response = await this.api.fetchYields();

      if (!response?.data) return;

      this.yields = response.data;
    } catch (err) {
      console.log({ err });
    }
  };
}

export const createStore = () => {
  const api = new API();
  return new Store(api);
};

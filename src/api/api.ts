import axios, { AxiosInstance } from "axios";
import { SERIES_BY_TAG, YIELDS } from "../constants/endpoints";

export default class API {
  client: AxiosInstance | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE,
      headers: {},
    });
  }

  fetchSeriesByTag = async (tag: string) => {
    if (!this.client) return;
    try {
      const response = this.client.get(`${SERIES_BY_TAG}/${tag}`);
      return response;
    } catch (err) {
      console.log({ err });
    }
  };

  fetchYields = async () => {
    if (!this.client) return;
    try {
      const response = this.client.get(YIELDS);
      return response;
    } catch (err) {
      console.log({ err });
    }
  };
}

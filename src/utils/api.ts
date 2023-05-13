// import { API_BEARER_TOKEN, BASE_URL } from "@env";
import axios from "axios";
import { IQueryParams } from "../../types/typings";

const BASE_URL = process.env.BASE_URL;
const API_BEARER_TOKEN = process.env.API_BEARER_TOKEN;

const headers = {
  Authorization: "bearer " + API_BEARER_TOKEN,
};

export const fetchDataFromApi = async (url: string, params: IQueryParams) => {
  return axios.get(BASE_URL + url, {
    headers,
    params,
  });
};

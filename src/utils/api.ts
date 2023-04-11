import { API_BEARER_TOKEN, BASE_URL } from "@env";
import axios from "axios";
import { IQueryParams } from "../../types/typings";

const headers = {
  Authorization: "bearer " + API_BEARER_TOKEN,
};

export const fetchDataFromApi = async (url: string, params: IQueryParams) => {
  return axios.get(BASE_URL + url, {
    headers,
    params,
  });
};

export const fetchDataFromApiV2 = async (url: string, params: IQueryParams) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
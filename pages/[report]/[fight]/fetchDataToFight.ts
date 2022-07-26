import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { axiosInstance } from '../../../axios';
import { IFightResponse } from '../../../interfaces/FightResponse';

interface IFetchFightData {
  setFightData: Dispatch<SetStateAction<IFightResponse>>,
  url?: string,
}
export function fetchDataToFight(url: string) {
  return axiosInstance.get(url).then((res) => res.data).catch((e) => {
    fetchDataToFight(url);
  });
}
export function fetchMockData(url: string) {
  return axios.get(url).then((res) => res.data);
}

export async function fetchFightData({
  setFightData, url,
}:IFetchFightData) {
  if (!url) {
    const data = await fetchMockData('http://localhost:4000/info');
    setFightData(data);
    return;
  }
  const data = await fetchDataToFight(url);
  if (data) {
    setFightData(data);
  }
}

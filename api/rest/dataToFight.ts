import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { axiosInstance } from '../client';
import { IFightResponse } from '../../interfaces/FightResponse';
import { Actions } from '../../interfaces';

interface IStaticFightData {
  action: Actions,
  code: string | string[],
  fight: string| string[],
  encounterID:string| string[],
  startTime: string| string[],
  endTime: string| string[]
}

interface IStaticFightParseData {
  action: Actions,
  code: string | string[],
  encounterID:string| string[],
  parseType: 'hps' | 'dps'
}

interface IFetchFightData {
  setFightData: Dispatch<SetStateAction<IFightResponse>>,
  params: IStaticFightData,
}

export function fetchStaticFightData(params: IStaticFightData) {
  return axiosInstance.get(`${process.env.BACKEND_URL}`, {
    params: {
      ...params,
    },
  });
}

export function fetchFightParseData(params: IStaticFightParseData) {
  return axiosInstance.get('', {
    params: {
      ...params,
    },
  });
}

export function dataToFight(params: IStaticFightData) {
  return axiosInstance.get('', {
    params,
  }).then((res) => res.data).catch((e) => {
    console.warn('Error: ', e);
    dataToFight(params);
  });
}

export async function fetchFightData({
  setFightData, params,
}:IFetchFightData) {
  // if (process.env.NODE_ENV === 'development') {
  //   const data = await axios.get('http://localhost:4000/info').then((res) => res.data);
  //   setFightData(data);
  //   return;
  // }
  const data = await dataToFight(params);
  if (data) {
    setFightData(data);
  }
}

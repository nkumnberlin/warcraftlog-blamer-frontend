import { Actions } from '../../interfaces';
import { axiosInstance } from '../client';

interface IGetAbilitiesToPlayer {
  action: Actions,
  code: string | string[],
  fight: string| string[],
  encounterID:string| string[],
  startTime: string| string[],
  endTime: string| string[]
  sourceID: number
}

export const getAbilitiesToPlayer = (params: IGetAbilitiesToPlayer) => axiosInstance.get('', {
  params: {
    ...params,
  },
}).then(({ data }) => data).catch((e) => console.log('Error while fetching ', params.action, ' __ ', e));

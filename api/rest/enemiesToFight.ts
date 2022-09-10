import { Actions } from '../../interfaces';
import { axiosInstance } from '../client';

interface IEnemiesToFight {
  action: Actions,
  code: string | string[],
}

export function fetchEnemiesToFight(params: IEnemiesToFight) {
  return axiosInstance.get(`${process.env.BACKEND_URL}`, {
    params: {
      ...params,
    },
  });
}

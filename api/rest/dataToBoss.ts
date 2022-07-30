import { Actions } from '../../interfaces';
import { axiosInstance } from '../client';

interface IStaticBossData {
  action: Actions,
  code: string | string[],
}

export function fetchStaticBossData(params: IStaticBossData) {
  return axiosInstance.get(`${process.env.BACKEND_URL}`, {
    params: {
      ...params,
    },
  });
}

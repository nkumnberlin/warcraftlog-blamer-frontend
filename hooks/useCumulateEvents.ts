import { useCallback } from 'react';
import { IPlayerEventData } from '../interfaces/EventDataPlayer';

function useCumulateEvents(event: IPlayerEventData[]) {
  return useCallback(() => event
    .reduce((prev, curr) => prev + curr.total, 0), [event]);
}

export default useCumulateEvents;

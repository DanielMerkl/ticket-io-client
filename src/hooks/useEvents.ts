import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { api } from '../utils/api';
import { Event } from '../types/interface/event';
import { EventDto } from '../types/interface/eventDto';

export const useEvents = () => {
  return useQuery<Event[], AxiosError>('events', () => {
    return api.get('/events').then((res: AxiosResponse<EventDto[]>) =>
      res.data.map((eventDto) => ({
        ...eventDto,
        date: new Date(eventDto.date),
      })),
    );
  });
};

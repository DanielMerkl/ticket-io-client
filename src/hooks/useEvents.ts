import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { api } from '../utils/api';
import { Event } from '../types/interface/event';

interface EventDto {
  id: string;
  title: string;
  date: string;
  city: string;
}

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

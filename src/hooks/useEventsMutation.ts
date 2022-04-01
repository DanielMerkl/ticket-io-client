import { useMutation, useQueryClient } from 'react-query';

import { CreateEventDto } from '../types/interface/createEventDto';
import { api } from '../utils/api';
import { Event } from '../types/interface/event';

export const useEventsMutation = () => {
  const queryClient = useQueryClient();

  const createEventMutation = useMutation(
    (event: CreateEventDto) => {
      return api.post('/events', event);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('events'),
    },
  );

  const editEventMutation = useMutation(
    ({ id, ...event }: Event) => {
      return api.patch(`/events/${id}`, event);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('events'),
    },
  );

  const deleteEventMutation = useMutation(
    (eventId: string) => api.delete('/events/' + eventId),
    {
      onSuccess: () => queryClient.invalidateQueries('events'),
    },
  );

  return { createEventMutation, editEventMutation, deleteEventMutation };
};

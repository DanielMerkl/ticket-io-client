import { useMutation, useQueryClient } from 'react-query';

import { api } from '../utils/api';
import { Event } from '../types/interface/event';

export const useEventsMutation = () => {
  const queryClient = useQueryClient();

  const createEventMutation = useMutation(
    (event: Omit<Event, 'id'>) => api.post('/events', event),
    {
      onSuccess: () => queryClient.invalidateQueries('events'),
    },
  );

  const editEventMutation = useMutation(
    ({ id, ...event }: Event) => api.patch(`/events/${id}`, event),
    {
      onSuccess: () => queryClient.invalidateQueries('events'),
    },
  );

  const deleteEventMutation = useMutation(
    (eventId: string) => api.delete(`/events/${eventId}`),
    {
      onSuccess: () => queryClient.invalidateQueries('events'),
    },
  );

  return { createEventMutation, editEventMutation, deleteEventMutation };
};

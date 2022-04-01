import { useMutation, useQueryClient } from 'react-query';
import { Event } from '../types/interface/event';
import { api } from '../utils/api';

export const useEditEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, ...event }: Event) => {
      return api.patch(`/events/${id}`, event);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      },
    },
  );
};

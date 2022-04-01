import { useMutation, useQueryClient } from 'react-query';

import { CreateEventDto } from '../types/interface/createEventDto';
import { api } from '../utils/api';

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (event: CreateEventDto) => {
      return api.post('/events', event);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('events');
      },
    },
  );
};

import { useMutation, useQueryClient } from 'react-query';

import { api } from '../utils/api';

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((eventId: string) => api.delete('/events/' + eventId), {
    onSuccess: () => queryClient.invalidateQueries('events'),
  });
};

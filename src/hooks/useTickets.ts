import { useQuery } from 'react-query';

import { api } from '../utils/api';
import { Ticket } from '../types/interface/ticket';

export const useTickets = (eventId: string | null) => {
  return useQuery<Ticket[]>(
    ['tickets', eventId],
    () => {
      return api.get(`/events/${eventId}/tickets`).then((res) => res.data);
    },
    { enabled: eventId !== null },
  );
};

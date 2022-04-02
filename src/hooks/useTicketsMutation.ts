import { useMutation, useQueryClient } from 'react-query';

import { Ticket } from '../types/interface/ticket';
import { api } from '../utils/api';

export const useTicketsMutation = () => {
  const queryClient = useQueryClient();

  const addTicketMutation = useMutation(
    (ticket: Omit<Ticket, 'id'>) =>
      api.post('/tickets', ticket).then((res) => res.data),
    {
      onSuccess: (createdTicket: Ticket) => {
        queryClient.setQueryData(
          ['tickets', createdTicket.eventId],
          (prevTickets: Ticket[] | undefined) => {
            return [...(prevTickets ?? []), createdTicket];
          },
        );
      },
    },
  );

  const removeTicketMutation = useMutation(
    (ticketId: string) =>
      api.delete(`/tickets/${ticketId}`).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries('tickets'),
    },
  );

  return {
    addTicketMutation,
    removeTicketMutation,
  };
};

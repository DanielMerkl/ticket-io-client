import { useState } from 'react';
import { Container, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

import { useEvents } from './hooks/useEvents';
import { Event } from './types/interface/event';
import { EventsTable } from './components/EventsTable';
import { EventsDialog } from './components/EventsDialog';
import { useEventsMutation } from './hooks/useEventsMutation';
import { TicketsDialog } from './components/TicketsDialog';

export function App() {
  const { data: events } = useEvents();

  const { deleteEventMutation } = useEventsMutation();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventsDialogOpen, setIsEventsDialogOpen] = useState(false);
  const [isTicketsDialogOpen, setIsTicketsDialogOpen] = useState(false);

  function handleAddClick() {
    setSelectedEvent(null);
    setIsEventsDialogOpen(true);
  }

  function handleTicketsClick(event: Event) {
    setSelectedEvent(event);
    setIsTicketsDialogOpen(true);
  }

  function handleEdit(event: Event) {
    setSelectedEvent(event);
    setIsEventsDialogOpen(true);
  }

  function handleDelete(eventId: string) {
    deleteEventMutation.mutate(eventId);
  }

  return (
    <main>
      <Container maxWidth="md" sx={{ p: 4 }}>
        <EventsTable
          events={events ?? []}
          onTicketClick={handleTicketsClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Container>
      <EventsDialog
        selectedEvent={selectedEvent}
        open={isEventsDialogOpen}
        onClose={() => setIsEventsDialogOpen(false)}
      />
      <TicketsDialog
        eventId={selectedEvent?.id ?? null}
        open={isTicketsDialogOpen}
        onClose={() => setIsTicketsDialogOpen(false)}
      />
      <Fab
        variant="extended"
        color="primary"
        sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
        onClick={handleAddClick}
      >
        <Add sx={{ mr: 1 }} />
        Event Hinzufügen
      </Fab>
    </main>
  );
}

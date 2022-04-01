import { useState } from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

import { useEvents } from './hooks/useEvents';
import { Event } from './types/interface/event';
import { EventsTable } from './components/EventsTable';
import { EventsDialog } from './components/EventsDialog';
import { useEventsMutation } from './hooks/useEventsMutation';

export function App() {
  const { data: events } = useEvents();

  const { deleteEventMutation } = useEventsMutation();

  const [isEventsDialogOpen, setIsEventsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  function handleAddClick() {
    setSelectedEvent(null);
    setIsEventsDialogOpen(true);
  }

  function handleTicketsClick(eventId: string) {
    // TODO: implement
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
      <EventsTable
        events={events ?? []}
        onTicketClick={handleTicketsClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EventsDialog
        selectedEvent={selectedEvent}
        open={isEventsDialogOpen}
        onClose={() => setIsEventsDialogOpen(false)}
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

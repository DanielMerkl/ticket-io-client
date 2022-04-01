import { useState } from 'react';

import { useEvents } from './hooks/useEvents';
import { Event } from './types/interface/event';
import { EventsTable } from './components/EventsTable';
import { EventsDialog } from './components/EventsDialog';
import { useDeleteEventMutation } from './hooks/useDeleteEventMutation';

export function App() {
  const { data: events } = useEvents();

  const deleteEventMutation = useDeleteEventMutation();

  const [isEventsDialogOpen, setIsEventsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
    </main>
  );
}

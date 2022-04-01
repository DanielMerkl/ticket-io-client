import { useEffect } from 'react';

import { useEvents } from './hooks/useEvents';
import { api } from './utils/api';
import { Event } from './types/interface/event';
import { EventsTable } from './components/EventsTable';

export function App() {
  const { data: events } = useEvents();

  useEffect(() => {
    const event: Omit<Event, 'id'> = {
      title: 'Banane',
      city: 'Paris',
      date: new Date(),
    };
    api.post('/events', event);
  }, []);

  return (
    <main>
      <EventsTable events={events ?? []} />
    </main>
  );
}

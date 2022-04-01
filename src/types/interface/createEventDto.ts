import { Event } from './event';

export type CreateEventDto = Omit<Event, 'id'>;

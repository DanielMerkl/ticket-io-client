import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { DesktopDatePicker, LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Event } from '../types/interface/event';
import { CreateEventDto } from '../types/interface/createEventDto';
import { api } from '../utils/api';

interface Props {
  selectedEvent: Event | undefined;
  open: boolean;
  onClose: () => void;
}

export const EventsDialog = ({ selectedEvent, open, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  const queryClient = useQueryClient();
  const postMutation = useMutation((event: CreateEventDto) => {
    return api.post('/events', event);
  });
  const patchMutation = useMutation(({ id, ...event }: Event) => {
    return api.patch(`/events/${id}`, event);
  });

  const dialogType: 'edit' | 'create' = selectedEvent ? 'edit' : 'create';

  useEffect(() => {
    if (!selectedEvent) return;

    setTitle(selectedEvent.title);
    setCity(selectedEvent.city);
    setDate(selectedEvent.date);
  }, []);

  function createEvent() {
    const event: CreateEventDto = {
      title,
      city,
      date,
    };
    postMutation.mutate(event, {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
        onClose();
      },
    });
  }

  function updateEvent() {
    if (!selectedEvent) return;

    const event: Event = {
      ...selectedEvent,
      title,
      city,
      date,
    };
    patchMutation.mutate(event, {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Event {dialogType === 'create' ? 'erstellen' : 'bearbeiten'}
      </DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 1 }}>
        <TextField
          label="Titel"
          variant="outlined"
          margin="dense"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="Stadt"
          variant="outlined"
          margin="dense"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <DesktopDatePicker
          label="Datum"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={(updatedDate) => setDate(updatedDate ?? new Date())}
          renderInput={(params) => <TextField {...params} />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <LoadingButton
          loading={
            dialogType === 'create'
              ? postMutation.isLoading
              : patchMutation.isLoading
          }
          color="primary"
          variant="contained"
          onClick={dialogType === 'create' ? createEvent : updateEvent}
          startIcon={<Save />}
        >
          Speichern
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

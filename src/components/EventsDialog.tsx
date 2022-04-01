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

import { Event } from '../types/interface/event';
import { useCreateEventMutation } from '../hooks/useCreateEventMutation';
import { useEditEventMutation } from '../hooks/useEditEventMutation';

interface Props {
  selectedEvent: Event | null;
  open: boolean;
  onClose: () => void;
}

export const EventsDialog = ({ selectedEvent, open, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  const createEventMutation = useCreateEventMutation();
  const editEventMutation = useEditEventMutation();

  const dialogType: 'edit' | 'create' = selectedEvent ? 'edit' : 'create';

  useEffect(() => {
    if (!selectedEvent) return;

    setTitle(selectedEvent.title);
    setCity(selectedEvent.city);
    setDate(selectedEvent.date);
  }, [selectedEvent]);

  function createEvent() {
    createEventMutation.mutate({
      title,
      city,
      date,
    });
    onClose();
  }

  function updateEvent() {
    if (!selectedEvent) return;

    editEventMutation.mutate({
      ...selectedEvent,
      title,
      city,
      date,
    });
    onClose();
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
              ? createEventMutation.isLoading
              : editEventMutation.isLoading
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

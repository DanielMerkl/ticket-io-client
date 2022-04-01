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
import { useEventsMutation } from '../hooks/useEventsMutation';

interface Props {
  selectedEvent: Event | null;
  open: boolean;
  onClose: () => void;
}

export const EventsDialog = ({ selectedEvent, open, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  const { createEventMutation, editEventMutation } = useEventsMutation();

  const dialogType: 'edit' | 'create' = selectedEvent ? 'edit' : 'create';

  useEffect(() => {
    setTitle(selectedEvent?.title ?? '');
    setCity(selectedEvent?.city ?? '');
    setDate(selectedEvent?.date ?? new Date());
  }, [selectedEvent]);

  function createEvent() {
    createEventMutation.mutate({
      title,
      city,
      date,
    });
    resetForm();
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
    resetForm();
    onClose();
  }

  function resetForm() {
    setTitle('');
    setCity('');
    setDate(new Date());
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Event {dialogType === 'create' ? 'erstellen' : 'bearbeiten'}
      </DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 1 }}>
        <TextField
          autoFocus
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

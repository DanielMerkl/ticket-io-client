import { useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { useTickets } from '../hooks/useTickets';
import { useTicketsMutation } from '../hooks/useTicketsMutation';
import { TicketsTable } from './TicketsTable';

interface Props {
  eventId: string | null;
  open: boolean;
  onClose: () => void;
}

export const TicketsDialog = ({ eventId, open, onClose }: Props) => {
  const { data: tickets } = useTickets(eventId);

  const { addTicketMutation, removeTicketMutation } = useTicketsMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [barcode, setBarcode] = useState('');

  const isValidBarcode = useMemo(() => {
    const isAlphaNumeric = /^[a-zA-Z0-9äÄöÖüÜ]+$/.test(barcode);
    return barcode.length <= 8 && (barcode.length === 0 || isAlphaNumeric);
  }, [barcode]);

  function handleAddTicketClick() {
    if (!eventId) return;

    addTicketMutation.mutate({ eventId, firstName, lastName, barcode });

    setFirstName('');
    setLastName('');
    setBarcode('');
  }

  function handleDeleteTicketClick(ticketId: string) {
    removeTicketMutation.mutate(ticketId);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tickets</DialogTitle>
      <DialogContent
        sx={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: '1fr 250px',
        }}
      >
        {tickets && tickets.length > 0 ? (
          <TicketsTable tickets={tickets} onDelete={handleDeleteTicketClick} />
        ) : (
          <Typography sx={{ mt: 2 }}>
            Noch keine Tickets hinzugefügt.
          </Typography>
        )}
        <Box sx={{ display: 'grid', pt: 2 }}>
          <Typography sx={{ mb: 2 }}>Weiteres Ticket</Typography>
          <TextField
            label="Vorname"
            id="firstName"
            autoComplete="off"
            variant="outlined"
            margin="dense"
            size="small"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            label="Nachname"
            id="lastName"
            autoComplete="off"
            variant="outlined"
            margin="dense"
            size="small"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            label="Barcode"
            id="barcode"
            autoComplete="off"
            variant="outlined"
            margin="dense"
            size="small"
            value={barcode}
            onChange={(event) => {
              const updatedBarcode = event.target.value;
              if (updatedBarcode.length <= 8) {
                setBarcode(updatedBarcode);
              }
            }}
            error={!isValidBarcode}
            helperText={
              !isValidBarcode ? 'Nur alphanumerische Zeichen erlaubt.' : ' '
            }
          />
          <LoadingButton
            sx={{ mt: 1 }}
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddTicketClick}
          >
            Hinzufügen
          </LoadingButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fertig</Button>
      </DialogActions>
    </Dialog>
  );
};

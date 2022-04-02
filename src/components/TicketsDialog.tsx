import { useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import { useTickets } from '../hooks/useTickets';
import { useTicketsMutation } from '../hooks/useTicketsMutation';

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
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Vorname</TableCell>
                  <TableCell align="left">Nachname</TableCell>
                  <TableCell align="left">Barcode</TableCell>
                  <TableCell align="center">Löschen</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets?.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{ticket.firstName}</TableCell>
                    <TableCell align="left">{ticket.lastName}</TableCell>
                    <TableCell align="left">{ticket.barcode}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteTicketClick(ticket.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

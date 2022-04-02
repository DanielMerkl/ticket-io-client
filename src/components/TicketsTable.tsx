import { useMemo, useState } from 'react';
import {
  Box,
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
import { Delete, Search } from '@mui/icons-material';

import { Ticket } from '../types/interface/ticket';

interface Props {
  tickets: Ticket[];
  onDelete: (id: string) => void;
}

export const TicketsTable = ({ tickets, onDelete }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = useMemo(() => {
    return tickets.filter(({ firstName, lastName, barcode }) => {
      const searchString = searchTerm.toLowerCase();
      return (
        firstName.toLowerCase().includes(searchString) ||
        lastName.toLowerCase().includes(searchString) ||
        barcode.toLowerCase().includes(searchString)
      );
    });
  }, [tickets, searchTerm]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: 2,
      }}
    >
      <TextField
        label="Freitextsuche"
        variant="outlined"
        autoComplete="off"
        size="small"
        margin="dense"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          ),
        }}
      />
      {filteredTickets.length === 0 ? (
        <Typography align="center">Keine Tickets gefunden.</Typography>
      ) : (
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
              {filteredTickets?.map((ticket) => (
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
                      onClick={() => onDelete(ticket.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

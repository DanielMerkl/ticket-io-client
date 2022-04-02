import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Ticket } from '../types/interface/ticket';

interface Props {
  tickets: Ticket[];
  onDelete: (id: string) => void;
}

// TODO: Freitextsuche implementieren
export const TicketsTable = ({ tickets, onDelete }: Props) => (
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
);

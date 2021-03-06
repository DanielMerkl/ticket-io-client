import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Event } from '../types/interface/event';
import { Delete, Edit, LocalActivity } from '@mui/icons-material';

interface Props {
  events: Event[];
  onTicketClick: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export const EventsTable = ({
  events,
  onTicketClick,
  onEdit,
  onDelete,
}: Props) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right">Titel</TableCell>
          <TableCell align="right">Stadt</TableCell>
          <TableCell align="right">Datum</TableCell>
          <TableCell align="right">Aktionen</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((event) => (
          <TableRow
            key={event.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="right">{event.title}</TableCell>
            <TableCell align="right">{event.city}</TableCell>
            <TableCell align="right">
              {event.date.toLocaleDateString()}
            </TableCell>
            <TableCell align="right">
              <div>
                <IconButton
                  color="primary"
                  aria-label="tickets"
                  onClick={() => onTicketClick(event)}
                >
                  <LocalActivity />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => onEdit(event)}>
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(event.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

import { rest, RestRequest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, test } from 'vitest';

import { render, waitFor, waitForElementToBeRemoved } from './utils/test-utils';
import { App } from './App';
import { Event } from './types/interface/event';

const mockServer = setupServer(
  rest.get('/events', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post('/events', (req: RestRequest<Omit<Event, 'id'>>, res, ctx) => {
    return res(ctx.json<Event>({ id: '123', ...req.body }));
  }),
);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test('add new event', async () => {
  const { getByText, getByLabelText, getByTestId } = render(<App />);

  await userEvent.click(getByText('Event Hinzufügen'));
  await waitFor(() => getByTestId('events-dialog'));
  await userEvent.type(getByLabelText('Titel'), 'Bananen Festival');
  await userEvent.type(getByLabelText('Stadt'), 'Nürnberg');
  await userEvent.click(getByText('Speichern'));

  mockServer.use(
    rest.get('/events', (req, res, ctx) => {
      return res(
        ctx.json<Event[]>([
          {
            id: '123',
            title: 'Bananen Festival',
            city: 'Nürnberg',
            date: new Date(),
          },
        ]),
      );
    }),
  );

  await waitForElementToBeRemoved(() => getByTestId('events-dialog'));
  await waitFor(() => getByText('Bananen Festival'));
  await waitFor(() => getByText('Nürnberg'));
});

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material';

import { App } from './App';
import './index.css';
import { theme } from './utils/theme';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

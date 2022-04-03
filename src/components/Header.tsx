import { AppBar, Container, Toolbar } from '@mui/material';

import logoUrl from '../logo.png';

export const Header = () => (
  <AppBar position="static">
    <Container maxWidth="md">
      <Toolbar disableGutters>
        <img style={{ maxHeight: '100px' }} src={logoUrl} alt="logo" />
      </Toolbar>
    </Container>
  </AppBar>
);

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0,
    minHeight: '48px',
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

export const StyledNavBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.5),
  },
}));

export const StyledNavButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
    fontSize: '0.75rem',
    minWidth: 'auto',
  },
}));

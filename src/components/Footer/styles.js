import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFooter = styled(Box)(({ theme }) => ({
  py: 3,
  px: 2,
  mt: 'auto',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    py: 2,
    px: 1,
  },
}));

export const StyledFooterContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const StyledFooterText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';

const Home = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Application
        </Typography>
      </Paper>
    </Grid>
  </Grid>
);

export default Home;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { StyledLayoutBox, StyledMainContainer } from './styles';

export const Layout = () => (
  <StyledLayoutBox>
    <Header />
    <StyledMainContainer component="main">
      <Outlet />
    </StyledMainContainer>
    <Footer />
  </StyledLayoutBox>
);

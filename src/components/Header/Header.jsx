import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@router/routes';
import { StyledAppBar, StyledToolbar, StyledTitle, StyledNavBox, StyledNavButton } from './styles';

export const Header = () => (
  <StyledAppBar>
    <StyledToolbar>
      <StyledTitle variant="h6" component="div">
        My React App
      </StyledTitle>
      <StyledNavBox>
        {routes.map(route => (
          <StyledNavButton key={route.path} component={Link} to={route.path}>
            {route.name}
          </StyledNavButton>
        ))}
      </StyledNavBox>
    </StyledToolbar>
  </StyledAppBar>
);

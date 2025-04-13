import React from 'react';
import { StyledFooter, StyledFooterContainer, StyledFooterText } from './styles';

export const Footer = () => (
  <StyledFooter component="footer">
    <StyledFooterContainer maxWidth="sm">
      <StyledFooterText variant="body1">
        © 2024 My React App. All rights reserved.
      </StyledFooterText>
    </StyledFooterContainer>
  </StyledFooter>
);

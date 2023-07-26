import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography, CardMedia } from '@mui/material';

const StyledAppBar = styled(AppBar)`
    width: 100vw;
    height: 65px;
    background-color: white;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: left;
  align-items: left;

`;

const StyledTypography = styled(Typography)`
    text-align: center;
    margin-top: auto;
    color: black;
    font-size: 24px;
    font-weight: bold;
`;

const NavBar = () => {
  return (
    <StyledAppBar position="static" color="primary">
      <StyledToolbar>
        <img src="/Navigation Logo.png" alt="Description"></img>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavBar;
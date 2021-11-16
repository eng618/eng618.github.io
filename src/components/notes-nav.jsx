import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Catalog32 } from '@carbon/icons-react';

const StyledDiv = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 32px;
`;

const StyledBack = styled(Catalog32)`
  width: 32px;
  position: relative;
  display: inline-block;
  user-select: none;
  vertical-align: sub;
  /* margin-left: 5px; */
  /* fill: #0062ff; */
`;

const NotesNav = () => (
  <StyledDiv>
    <StyledLink to="/notes">
      <StyledBack /> Notes Home
    </StyledLink>
  </StyledDiv>
);

export default NotesNav;

import React from 'react';
import PropTypes from 'prop-types';
import { Launch } from '@carbon/react/icons';
import styled from 'styled-components';

const StyledLaunch = styled(Launch)`
  width: 16px;
  object-fit: contain;
  position: relative;
  display: inline-block;
  user-select: none;
  vertical-align: text-bottom;
  margin-left: 5px;
  fill: #0062ff;
`;

function ExternalLink({ children = 'link', href, target = 'blank' }) {
  return (
    <a href={href} aria-label={children} target={target}>
      {children}
      <StyledLaunch size={16} />
    </a>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
};

export default ExternalLink;

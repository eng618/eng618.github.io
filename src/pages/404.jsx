import React from 'react';
import { FourOhFour } from 'gatsby-theme-carbon';

const links = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
];

const Custom404 = () => <FourOhFour links={links} />;

export default Custom404;

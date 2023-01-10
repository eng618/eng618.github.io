import React from 'react';
import { FourOhFour } from 'gatsby-theme-carbon';

const links = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
];

function Custom404() {
  return <FourOhFour links={links} />;
}

export default Custom404;

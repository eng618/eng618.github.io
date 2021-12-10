import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [
  {
    title: 'Github eng618',
    href: 'https://github.com/eng618',
  },
  {
    title: 'Site Source Code',
    href: 'https://github.com/eng618/eng618.github.io',
  },
];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = function CustomResources() {
  return <ResourceLinks shouldOpenNewTabs links={links} />;
};

export default CustomResources;

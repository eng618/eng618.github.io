import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const Content = ({ buildTime }) => (
  <>
    <p>Personal site for work related notes and documentation.</p>
    <p>
      This site was last updated on:
      <br />
      {buildTime}
    </p>
    <p>
      {/* TODO: update these links once the builds are running...through github actions */}
      <a href="https://travis.ibm.com/engarcia/engarcia.github.ibm.com">
        <img
          src="https://travis.ibm.com/engarcia/engarcia.github.ibm.com.svg?token=zWxLzHi3q4qbgWK8ZRwm&branch=develop"
          alt="Build Status"
        />
      </a>
    </p>
  </>
);

const links = {
  firstCol: [
    {
      href: 'https://www.linkedin.com/in/garciaericn/',
      linkText: 'LinkedIn',
    },
    {
      href: 'https://twitter.com/garciaericn',
      linkText: 'Twitter',
    },
  ],
  secondCol: [],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;

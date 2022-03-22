import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';
import PropTypes from 'prop-types';

function Content({ buildTime }) {
  return (
    <>
      <p>Personal site to host my notes and documentation.</p>
      <p>
        This site was last updated on:
        <br />
        {buildTime}
      </p>
      <p>
        <a href="https://github.com/eng618/eng618.github.io/actions/workflows/build-and-deploy.yml">
          <img
            src="https://github.com/eng618/eng618.github.io/actions/workflows/build-and-deploy.yml/badge.svg"
            alt="Build Status"
          />
        </a>
      </p>
      <p>© 2021 Garcia Enterprise</p>
    </>
  );
}

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

function CustomFooter() {
  return <Footer links={links} Content={Content} />;
}

Content.propTypes = {
  buildTime: PropTypes.string.isRequired,
};

export default CustomFooter;

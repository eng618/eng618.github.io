import React from 'react';
// eslint-disable-next-line no-unused-vars
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import styled from 'styled-components';
import { calloutLink } from './Homepage.module.scss';

import HeroTechVector from '../../images/hero-vector.svg';

const HeroText = styled.h1`
  color: #505050;
  filter: drop-shadow(0 0 0.25rem #9c8bff);
  font-weight: bold;
`;

// eslint-disable-next-line no-unused-vars
const FirstLeftText = function FirstLeftText() {
  return <p>Callout component</p>;
};

// eslint-disable-next-line no-unused-vars
const FirstRightText = function FirstRightText() {
  return (
    <p>
      This is a callout component. You can edit the contents by updating the{' '}
      <a href="https://github.com/carbon-design-system/gatsby-theme-carbon/blob/5fe12de31bb19fbfa2cab7c69cd942f55aa06f79/packages/example/src/gatsby-theme-carbon/templates/Homepage.js">
        pre-shadowed homepage template
      </a>
      . You can also provide <code>color</code> and <code>backgroundColor</code>{' '}
      props to suit your theme.
      <a
        className={calloutLink}
        href="https://github.com/carbon-design-system/gatsby-theme-carbon/blob/main/packages/example/src/gatsby-theme-carbon/templates/Homepage.js"
      >
        Homepage source →
      </a>
    </p>
  );
};

const BannerText = function BannerText() {
  return <HeroText>Eric N. Garcia</HeroText>;
};

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={HeroTechVector} />,
  FirstCallout: null,
  // FirstCallout: (
  //   <HomepageCallout
  //     backgroundColor="#030303"
  //     color="white"
  //     leftText={FirstLeftText}
  //     rightText={FirstRightText}
  //   />
  // ),
  SecondCallout: null,
  // SecondCallout: (
  //   <HomepageCallout
  //     leftText={SecondLeftText}
  //     rightText={SecondRightText}
  //     color="white"
  //     backgroundColor="#061f80"
  //   />
  // ),
};

// spreading the original props gives us props.children (mdx content)
const ShadowedHomepage = function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
};

export default ShadowedHomepage;

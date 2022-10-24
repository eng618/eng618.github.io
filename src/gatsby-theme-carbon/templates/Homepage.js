import React from 'react';
// eslint-disable-next-line no-unused-vars
import {
  HomepageBanner,
  HomepageCallout,
  Row,
  Column,
  ImageCard,
} from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { badgesRow } from './Homepage.module.scss';

import HeroTechVector from '../../images/hero-vector.svg';

const HeroText = styled.h1`
  color: #505050;
  filter: drop-shadow(0 0 0.25rem #9c8bff);
  font-weight: bold;
`;

// eslint-disable-next-line no-unused-vars
const BadgesLeftText = function BadgesLeftText() {
  return <p>Badges earned</p>;
};

// eslint-disable-next-line no-unused-vars
const BadgesRightText = function BadgesRightText() {
  return (
    // Max badges per row is 4
    <Row className={badgesRow}>
      <Column colMd={1} colLg={1} noGutterMdLeft>
        <ImageCard
          href="https://www.credly.com/badges/84c7f84c-eb57-489a-93ce-f0701008b7e3/public_url"
          actionIcon="Launch"
        >
          <StaticImage
            src="./credly/ibm-agile-explorer.png"
            alt="Agile explorer"
          />
        </ImageCard>
      </Column>

      <Column colMd={1} colLg={1} noGutterMdLeft>
        <ImageCard
          href="https://www.credly.com/badges/836c8f8f-fdd6-41aa-a310-ca38c0a6e54e/public_url"
          actionIcon="Launch"
        >
          <StaticImage
            src="./credly/ibm-cloud-kubernetes-service.png"
            alt="IBM Cloud Kubernetes Service"
          />
        </ImageCard>
      </Column>

      <Column colMd={1} colLg={1} noGutterMdLeft>
        <ImageCard
          href="https://www.credly.com/badges/de8ea4d0-1d49-4084-bc16-3b0a5366d354/public_url"
          actionIcon="Launch"
        >
          <StaticImage
            src="./credly/ibm-carbon-design-system-developer-essentials-react.png"
            alt="IBM Carbon Design System Developer Essentials - React"
          />
        </ImageCard>
      </Column>

      <Column colMd={1} colLg={1} noGutterMdLeft>
        <ImageCard
          href="https://www.credly.com/badges/36ddd342-c057-4624-9738-504cd982d585/public_url"
          actionIcon="Launch"
        >
          <StaticImage
            src="./credly/ibm-carbon-design-system-developer-essentials-react.png"
            alt="Enterprise Design Thinking Practitioner"
          />
        </ImageCard>
      </Column>
    </Row>
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
  SecondCallout: (
    <HomepageCallout
      backgroundColor="#061f80"
      color="white"
      leftText={BadgesLeftText}
      rightText={BadgesRightText}
    />
  ),
};

// spreading the original props gives us props.children (mdx content)
const ShadowedHomepage = function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
};

export default ShadowedHomepage;

import React from 'react';
import { HomepageBanner, HomepageCallout, Row, Column, ImageCard } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/components/Layouts/Homepage';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { badgesRow } from './Homepage.module.scss';

import HeroTechVector from '../../images/hero-vector.svg';

const HeroText = styled.h1`
  color: #505050;
  filter: drop-shadow(0 0 0.25rem #9c8bff);
  font-weight: bold;
`;

function BadgesLeftText() {
  return <p>Digital badges</p>;
}

function BadgesRight() {
  return (
    // Max badges per row is 4
    <>
      <Row className={badgesRow}>
        <Column colMd={1} colLg={1} noGutterMdLeft>
          <ImageCard
            href="https://www.credly.com/badges/01f77238-4e0d-406b-a2e1-b94ab3d27ef3/public_url"
            actionIcon="Launch"
          >
            <StaticImage src="../../images/credly/developer-profession-level-3-expert.png" alt="Agile explorer" />
          </ImageCard>
        </Column>
      </Row>
      <Row className={badgesRow}>
        <Column colMd={1} colLg={1} noGutterMdLeft>
          <ImageCard
            href="https://www.credly.com/badges/84c7f84c-eb57-489a-93ce-f0701008b7e3/public_url"
            actionIcon="Launch"
          >
            <StaticImage src="../../images/credly/ibm-agile-explorer.png" alt="Agile explorer" />
          </ImageCard>
        </Column>

        <Column colMd={1} colLg={1} noGutterMdLeft>
          <ImageCard
            href="https://www.credly.com/badges/836c8f8f-fdd6-41aa-a310-ca38c0a6e54e/public_url"
            actionIcon="Launch"
          >
            <StaticImage
              src="../../images/credly/ibm-cloud-kubernetes-service.png"
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
              src="../../images/credly/ibm-carbon-design-system-developer-essentials-react.png"
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
              src="../../images/credly/enterprise-design-thinking-practitioner.png"
              alt="Enterprise Design Thinking Practitioner"
            />
          </ImageCard>
        </Column>
      </Row>
    </>
  );
}

function CertsLeftText() {
  return <p>Certificates</p>;
}

function CertsRight() {
  return (
    <Row className={badgesRow}>
      <Column colMd={1} colLg={1} noGutterMdLeft>
        <ImageCard aspectRatio="4:3">
          <StaticImage src="../../images/2022-CIOHackathon-certificate.png" alt="CIO Hackathon 2022" />
        </ImageCard>
      </Column>
    </Row>
  );
}

function BannerText() {
  return <HeroText>Eric N. Garcia</HeroText>;
}

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={HeroTechVector} />,
  FirstCallout: (
    <HomepageCallout backgroundColor="#262626" color="white" leftText={BadgesLeftText} rightText={BadgesRight} />
  ),
  SecondCallout: (
    <HomepageCallout backgroundColor="#262626" color="white" leftText={CertsLeftText} rightText={CertsRight} />
  ),
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;

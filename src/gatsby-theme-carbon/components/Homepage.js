import React from 'react';
import { HomepageCallout, Row, Column, ImageCard } from 'gatsby-theme-carbon';
import { Button } from '@carbon/react';
import HomepageTemplate from './Layouts/Homepage';
import { StaticImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';
import { badgesRow } from './Homepage.module.scss';
import AnimatedHero from '../../components/AnimatedHero';

import HeroTechVector from '../../images/hero-vector.svg';

// Animation variants for scroll reveal
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

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

function SkillsLeftText() {
  return <p>Core Technologies</p>;
}

function SkillsRight() {
  return (
    <div>
      <p>Full-stack software engineer with expertise in:</p>
      <ul style={{ marginTop: '1rem', lineHeight: '1.6' }}>
        <li>
          <strong>Frontend:</strong> React, TypeScript, Carbon Design System
        </li>
        <li>
          <strong>Backend:</strong> Node.js, Python, Go
        </li>
        <li>
          <strong>Cloud:</strong> AWS, Kubernetes, Docker
        </li>
        <li>
          <strong>DevOps:</strong> CI/CD, Infrastructure as Code
        </li>
      </ul>
    </div>
  );
}

function ContactLeftText() {
  return <p>Let&apos;s Connect</p>;
}

function ContactRight() {
  return (
    <div>
      <p>Interested in collaboration or have questions?</p>
      <Button kind="primary" style={{ marginTop: '1rem' }} renderIcon="ArrowRight" href="/contact">
        Get In Touch
      </Button>
    </div>
  );
}

// Wrap callouts in motion.div for scroll reveal
const AnimatedCallout = ({ ...props }) => (
  <motion.div
    variants={sectionVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
  >
    <HomepageCallout {...props} />
  </motion.div>
);

const customProps = {
  Banner: <AnimatedHero image={HeroTechVector} />,
  FirstCallout: (
    <AnimatedCallout backgroundColor="#262626" color="white" leftText={BadgesLeftText} rightText={BadgesRight} />
  ),
  SecondCallout: (
    <AnimatedCallout backgroundColor="#161616" color="white" leftText={CertsLeftText} rightText={CertsRight} />
  ),
  ThirdCallout: (
    <AnimatedCallout backgroundColor="#262626" color="white" leftText={SkillsLeftText} rightText={SkillsRight} />
  ),
  FourthCallout: (
    <AnimatedCallout backgroundColor="#161616" color="white" leftText={ContactLeftText} rightText={ContactRight} />
  ),
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;

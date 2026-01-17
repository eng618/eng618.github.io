import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Grid, Row, Column } from 'gatsby-theme-carbon';

const Section = styled.section`
  background-color: #161616;
  background-image: radial-gradient(circle at 100% 0%, rgba(26, 26, 26, 1) 0%, #161616 50%);
  padding-top: 8rem;
  padding-bottom: 6rem;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Greeting = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #c6c6c6;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`;

const GradientText = styled(motion.h1)`
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 5rem;
  line-height: 1.1;
  margin-bottom: 2rem;

  background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 40%, #9c8bff 80%, #00eeff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  filter: drop-shadow(0 0 40px rgba(156, 139, 255, 0.15));

  @media (max-width: 672px) {
    font-size: 3rem;
  }
`;

const SubText = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  color: #c6c6c6;
  max-width: 32rem;
  margin-bottom: 3rem;
  line-height: 1.5;
`;

const AnimatedHero = ({ image }) => {
  return (
    <Section>
      <Grid>
        <Row>
          <Column colMd={8} colLg={8}>
            <ContentWrapper>
              <Greeting
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Hello, I&apos;m
              </Greeting>

              <GradientText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
              >
                Eric N. Garcia
              </GradientText>

              <SubText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Full-stack software engineer building engaging digital experiences and cloud-native solutions.
              </SubText>
            </ContentWrapper>
          </Column>

          <Column colMd={4} colLg={4}>
            <motion.div
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Use the existing vector image passed as prop or import it here if intended to reuse */}
              {image && (
                <img
                  src={image}
                  alt="Hero Vector"
                  style={{ maxWidth: '100%', height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(156,139,255,0.2))' }}
                />
              )}
            </motion.div>
          </Column>
        </Row>
      </Grid>
    </Section>
  );
};

export default AnimatedHero;

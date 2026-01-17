import React from 'react';
import Layout from 'gatsby-theme-carbon/src/components/Layouts/Default';
import { Button, Grid, Row, Column } from '@carbon/react';
import { ArrowLeft } from '@carbon/icons-react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SuccessWrapper = styled.div`
  background-color: #161616;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SuccessCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 4rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
`;

const Title = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #9c8bff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Message = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: #c6c6c6;
  margin-bottom: 2.5rem;
`;

const SuccessPage = ({ pageContext = { frontmatter: { title: 'Success' } }, location = {} }) => (
  <Layout homepage pageContext={pageContext} location={location}>
    <SuccessWrapper>
      <Grid>
        <Row>
          <Column colLg={8} offsetLg={2}>
            <SuccessCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Title>Message Sent!</Title>
              <Message>
                Thank you for reaching out. I've received your message and will get back to you as soon as possible.
              </Message>
              <Button 
                href="/" 
                kind="primary" 
                renderIcon={ArrowLeft}
                style={{ backgroundColor: '#9c8bff' }}
              >
                Back to Home
              </Button>
            </SuccessCard>
          </Column>
        </Row>
      </Grid>
    </SuccessWrapper>
  </Layout>
);

export default SuccessPage;

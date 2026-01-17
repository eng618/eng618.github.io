import React from 'react';
import Layout from 'gatsby-theme-carbon/src/components/Layouts/Default';
import ContactForm from '../../components/ContactForm';
import styled from 'styled-components';

const ContactPageWrapper = styled.div`
  background-color: #161616;
  min-height: calc(100vh - 3rem); /* Adjust for header height */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-image: radial-gradient(circle at 100% 100%, rgba(156, 139, 255, 0.05) 0%, transparent 50%);
`;

function ContactMe({ pageContext = { frontmatter: { title: 'Contact Me' } }, location = {} }) {
  return (
    <Layout homepage pageContext={pageContext} location={location}>
      <ContactPageWrapper>
        <ContactForm />
      </ContactPageWrapper>
    </Layout>
  );
}

export default ContactMe;

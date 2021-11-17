import React from 'react';
import Layout from 'gatsby-theme-carbon/src/components/Layout';
import { container } from 'gatsby-theme-carbon/src/components/FourOhFour/FourOhFour.module.scss';

const ContactMe = () => (
  <Layout homepage>
    <div className={container}>
      <iframe
        title="Contact "
        src="https://docs.google.com/forms/d/e/1FAIpQLSezjyM8b4tieDTgFccofUAzogvOfbDZUvN52ftg51IUS8CHQw/viewform?embedded=true"
        width="auto"
        height="1000px"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        {/* <div className="spinner" /> */}
        Loading...
      </iframe>
    </div>
  </Layout>
);

export default ContactMe;

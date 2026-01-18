import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TextInput, TextArea, Button, Form, Grid, Row, Column } from '@carbon/react';
import { Send } from '@carbon/icons-react';
import { navigate } from 'gatsby';

const FormContainer = styled(motion.div)`
  background: rgba(22, 22, 22, 0.8); /* Darker background to prevent bleed */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 3rem;
  margin: 2rem auto; /* Center with auto margin */
  width: 100%;
  max-width: 800px; /* Constrain width for better readability */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);

  @media (max-width: 672px) {
    padding: 1.5rem;
    margin: 1rem auto;
  }
`;

const FormTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #9c8bff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FormSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  color: #c6c6c6;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
`;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 1.5rem;

  .cds--label {
    color: #e0e0e0;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .cds--text-input {
    background-color: rgba(255, 255, 255, 0.05) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;
    height: 3rem;

    &:focus {
      outline: 2px solid #9c8bff !important;
      outline-offset: -2px;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4) !important;
    }
  }
`;

const StyledTextArea = styled(TextArea)`
  margin-bottom: 1.5rem;

  .cds--label {
    color: #e0e0e0;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .cds--text-area {
    background-color: rgba(255, 255, 255, 0.05) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;

    &:focus {
      outline: 2px solid #9c8bff !important;
      outline-offset: -2px;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4) !important;
    }
  }
`;

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    'bot-field': '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const body = encode({
      'form-name': form.getAttribute('name'),
      ...formState,
    });

    console.log('Submitting form with body:', body);

    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Form successfully submitted');
          navigate(form.getAttribute('action'));
        } else {
          console.error('Form submission failed with status:', response.status);
          throw new Error('Form submission failed with status: ' + response.status);
        }
      })
      .catch((error) => {
        console.error('Submission error:', error);
        alert('There was an error submitting the form. Please try again.');
      });
  };

  return (
    <Grid>
      <Row>
        <Column colLg={12} colMd={8} colSm={4}>
          <FormContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <FormTitle>Get in Touch</FormTitle>
            <FormSubtitle>Have a project in mind or just want to say hi? Drop me a message below.</FormSubtitle>

            <Form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/success/"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" value={formState['bot-field']} onChange={handleChange} />
                </label>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Row>
                  <Column colLg={6} colMd={4} colSm={4}>
                    <StyledTextInput
                      id="name"
                      name="name"
                      labelText="Full Name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </Column>
                  <Column colLg={6} colMd={4} colSm={4}>
                    <StyledTextInput
                      id="email"
                      name="email"
                      type="email"
                      labelText="Email Address"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </Column>
                </Row>

                <StyledTextInput
                  id="subject"
                  name="subject"
                  labelText="Subject"
                  placeholder="How can I help you?"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                />

                <StyledTextArea
                  id="message"
                  name="message"
                  labelText="Message"
                  placeholder="Tell me more about your inquiry..."
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />

                <div style={{ marginTop: '1rem' }}>
                  <Button
                    type="submit"
                    renderIcon={Send}
                    size="lg"
                    style={{
                      backgroundColor: '#9c8bff',
                      borderRadius: '4px',
                      fontWeight: '600',
                      width: 'fit-content',
                    }}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </Form>
          </FormContainer>
        </Column>
      </Row>
    </Grid>
  );
};

export default ContactForm;

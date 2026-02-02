import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TextInput, TextArea, Button, Grid, Row, Column, InlineNotification } from '@carbon/react';
import { Send, CheckmarkFilled } from '@carbon/icons-react';
import { useForm, ValidationError } from '@formspree/react';

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

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: white;

  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #9c8bff;
  }

  p {
    font-family: 'Inter', sans-serif;
    color: #c6c6c6;
    margin-bottom: 2rem;
  }
`;

const ContactForm = () => {
  const [state, handleSubmit] = useForm('meezlzyn');

  if (state.succeeded) {
    return (
      <Grid>
        <Row>
          <Column colLg={12} colMd={8} colSm={4}>
            <FormContainer
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SuccessMessage>
                <CheckmarkFilled size={64} style={{ color: '#9c8bff', marginBottom: '1.5rem' }} />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <Button kind="ghost" onClick={() => window.location.reload()} style={{ color: '#9c8bff' }}>
                  Send another message
                </Button>
              </SuccessMessage>
            </FormContainer>
          </Column>
        </Row>
      </Grid>
    );
  }

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

            {state.errors && state.errors.length > 0 && (
              <InlineNotification
                kind="error"
                title="Submission Error"
                subtitle="There was an error submitting your message. Please check the form and try again."
                hideCloseButton
                style={{ marginBottom: '1.5rem', maxWidth: '100%' }}
              />
            )}

            <form onSubmit={handleSubmit} className="cds--form">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Row>
                  <Column colLg={6} colMd={4} colSm={4}>
                    <StyledTextInput id="name" name="name" labelText="Full Name" placeholder="John Doe" required />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </Column>
                  <Column colLg={6} colMd={4} colSm={4}>
                    <StyledTextInput
                      id="email"
                      name="email"
                      type="email"
                      labelText="Email Address"
                      placeholder="john@example.com"
                      required
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </Column>
                </Row>

                <StyledTextInput
                  id="subject"
                  name="subject"
                  labelText="Subject"
                  placeholder="How can I help you?"
                  required
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} />

                <StyledTextArea
                  id="message"
                  name="message"
                  labelText="Message"
                  placeholder="Tell me more about your inquiry..."
                  rows={6}
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />

                <div style={{ marginTop: '1rem' }}>
                  <Button
                    type="submit"
                    renderIcon={Send}
                    size="lg"
                    disabled={state.submitting}
                    style={{
                      backgroundColor: '#9c8bff',
                      borderRadius: '4px',
                      fontWeight: '600',
                      width: 'fit-content',
                    }}
                  >
                    {state.submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </div>
            </form>
          </FormContainer>
        </Column>
      </Row>
    </Grid>
  );
};

export default ContactForm;

import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { FaAngleUp } from 'react-icons/fa';

import Heading from '../heading';
import Footer from '../footer';

const ContactSection = styled.section`
  position: relative;
  width: 100vw;
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FormSection = styled.section`
  margin-bottom: 4em;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.25em;
  }

  input,
  textarea {
    border-radius: 0.5em;
    border: 2px #cecece solid;
    margin-bottom: 1em;

    transition: border 200ms ease-out;

    &:focus {
      outline: none;
      border: 2px var(--color-primary) solid;
    }
  }

  input {
    padding: 0.5em 0.75em;
  }

  textarea {
    padding: 0.75em;
    resize: none;
  }

  button {
    padding: 0.5em 1em;
    border-radius: 0.5em;
    border: none;
    width: max-content;
    background-color: var(--color-primary);
    color: var(--color-background);
    font-weight: 600;
    line-height: 1;
    transform: scale(1);
    transition: transform 500ms cubic-bezier(0.57, 2.2, 0.26, 0.99);

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const SubmitMessage = styled.h3`
  max-width: 80%;
  margin: 1em auto;
  max-width: 22.5ch;

  font-weight: 600;
  text-align: center;
`;

const BTTButton = styled.button`
  position: absolute;
  bottom: 1.5em;
  right: 1.5em;
  z-index: 1;
  height: 50px;
  width: 50px;
  padding-top: 0.2rem;

  background-color: var(--color-primary);
  border-radius: 50%;
  border: none;
  color: var(--color-background);
  font-size: 1.25rem;
  cursor: pointer;
`;

const Contact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    honeypot: '',
    message: '',
    replyTo: '@',
    accessKey: '80a98840-c5bd-4eb4-8cdb-d647a7c928e8',
  });

  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: `Thank you for reaching out, I'll be in touch soon.`,
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message,
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message:
          'An error occured while submitting the form, feel free to email me using the link below.',
      });
    }
  };

  return (
    <ContactSection id="contact">
      <Content>
        <Heading>Contact</Heading>
        <FormSection>
          {!response.type ? (
            <ContactForm
              name="contact"
              action="https://api.staticforms.xyz/submit"
              method="post"
              onSubmit={handleSubmit}
            >
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
              <div style={{ display: 'none' }}>
                <label>Title</label>
                <div>
                  <input
                    type="text"
                    name="honeypot"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                  />
                  <input type="hidden" name="subject" onChange={handleChange} />
                </div>
              </div>
              <label>Message</label>
              <textarea
                placeholder="Message..."
                name="message"
                onChange={handleChange}
                required
              />
              <button type="submit">Send</button>
            </ContactForm>
          ) : (
            <div>
              <SubmitMessage
                style={
                  response.type === 'error'
                    ? { color: '#ff0033' }
                    : { color: 'var(--color-text)' }
                }
              >
                {response.message}
              </SubmitMessage>
            </div>
          )}
        </FormSection>

        <BTTButton
          className="btt-btn"
          onClick={() => {
            navigate('#nav');
          }}
        >
          <FaAngleUp />
        </BTTButton>
        <Footer />
      </Content>
    </ContactSection>
  );
};

export default Contact;

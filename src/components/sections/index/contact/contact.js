import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { FaAngleUp } from 'react-icons/fa';

import Footer from '../../../footer';
import ContactBGWrapper from './contact-bg-wrapper';

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

const Heading = styled.h1`
  font-size: 4.25rem;

  @media (min-width: 64em) {
    font-size: 6rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10em;

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
      border: 2px var(--accent) solid;
    }
  }

  input {
    padding: 0.5em 1em;
  }

  textarea {
    padding: 0.75em 1em;
    resize: none;
  }

  button {
    padding: 0.5em 1em;
    border-radius: 0.5em;
    border: none;
    width: max-content;
    background-color: var(--accent);
    color: var(--light);
    font-weight: bold;
    transform: scale(1);
    transition: transform 500ms cubic-bezier(0.57, 2.2, 0.26, 0.99);

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const BTTButton = styled.button`
  position: absolute;
  bottom: 1.5em;
  right: 1.5em;
  z-index: 1;
  background-color: var(--accent);
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  color: var(--light);
  font-size: 1.25rem;
  cursor: pointer;
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <ContactBGWrapper>
        <Content>
          <Heading>Contact</Heading>
          <ContactForm name="contact" method="POST" netlify>
            <label className="name-label" htmlFor="full-name">
              Name
            </label>
            <input
              className="name-input"
              id="full-name"
              name="Name"
              type="text"
              placeholder="Name"
            />

            <label className="email-label" htmlFor="email">
              Email
            </label>
            <input
              className="email-input"
              id="email"
              name="Email"
              type="text"
              placeholder="Email"
            />

            <label className="message-label" htmlFor="message">
              Message
            </label>
            <textarea
              className="message-input"
              id="message"
              name="Message"
              placeholder="Message..."
              rows="3"
            ></textarea>

            <button type="submit">Send</button>
          </ContactForm>

          <BTTButton
            className="btt-btn"
            onClick={() => {
              navigate('/#landing');
            }}
          >
            <FaAngleUp />
          </BTTButton>
          <Footer />
        </Content>
      </ContactBGWrapper>
    </ContactSection>
  );
};

export default Contact;

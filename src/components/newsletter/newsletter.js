/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { window } from 'browser-monads';

import { ThemeContext } from '../theme-context';
import Footer from '../footer';
import CTAButton from '../cta-button';

const NewsletterSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  width: min(80%, 70ch);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 3rem;
`;

const Paragraph = styled.p`
  line-height: 1.5;
`;

const Link = styled.a`
  text-decoration: underline;
  text-underline-offset: 1px;
  color: var(--color-text);
  margin: inherit;
  font-weight: 600;
`;

const FormContainer = styled.div`
  align-self: center;
  margin-bottom: 5rem;
`;

const NewsletterForm = styled.form`
  font-size: 1.25rem;
  position: relative;
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    color: var(--color-primary);
    position: absolute;
    top: -1.5em;
  }

  input {
    padding: 0.5em 0.75em;
    margin-right: 0.5em;
    border-radius: 0.5em;
    border: 2px solid var(--color-gray500);
    color: ${({ colorMode }) =>
      colorMode === 'light' ? 'var(--color-text)' : 'var(--color-background)'};

    transition: border 200ms ease-out;

    &:hover,
    &:focus,
    &:active {
      outline: none;
      border: 2px var(--color-primary) solid;
    }
  }

  button {
    padding: 0.7em 1em;
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

  @media (max-width: 31.25em) {
    flex-direction: column;

    input {
      margin-right: 0;
      margin-bottom: 0.5em;
    }
  }
`;

const Newsletter = () => {
  const { colorMode } = useContext(ThemeContext);

  const handleSubmit = () =>
    window.open('https://buttondown.email/ellyloel', 'popupwindow');

  return (
    <NewsletterSection id="Newsletter">
      <Content>
        <div>
          <Title>A newsletter that sparks joy</Title>
          <Paragraph>
            Keep up to date with my{' '}
            <Link href="/digital-garden">digital garden</Link>, my blog posts,
            and anything else I'm working on, as well as gain access to
            newsletter exclusive content.
          </Paragraph>
          <Paragraph>
            <em>No spam, unsubscribe at any time.</em>
          </Paragraph>
        </div>
        <FormContainer>
          <NewsletterForm
            action="https://buttondown.email/api/emails/embed-subscribe/ellyloel"
            method="post"
            target="popupwindow"
            onSubmit={handleSubmit}
            colorMode={colorMode}
          >
            <label htmlFor="bd-email">Email</label>
            <input
              id="bd-email"
              type="email"
              placeholder="you@example.com"
              name="email"
              required
            />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FormContainer>
      </Content>
      <CTAButton link="#nav" nobefore flip right />
      <Footer />
    </NewsletterSection>
  );
};

export default Newsletter;

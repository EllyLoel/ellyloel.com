/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import { styled } from '../../../stitches.config';
import { window } from 'browser-monads';

import { ThemeContext } from '../theme-context';
import Footer from '../footer';
import CTAButton from '../cta-button';

const NewsletterSection = styled('section', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const Content = styled('div', {
  width: 'min(80%, 70ch)',
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled('h2', {
  fontSize: '3rem',
});

const Paragraph = styled('p', {
  lineHeight: 1.5,
});

const Link = styled('a', {
  textDecoration: 'underline',
  textUnderlineOffset: '1px',
  color: 'var(--color-text)',
  margin: 'inherit',
  fontWeight: 600,
});

const FormContainer = styled('div', {
  alignSelf: 'center',
  marginBottom: '5rem',
});

const NewsletterForm = styled('form', {
  fontSize: '1.25rem',
  position: 'relative',
  marginTop: '5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& label': {
    color: 'var(--color-primary)',
    position: 'absolute',
    top: '-1.5em',
  },

  '& input': {
    padding: '0.5rem 0.75rem',
    marginRight: '0',
    marginBottom: '0.5rem',
    borderRadius: '0.5rem',
    border: '2px solid var(--color-gray500)',
    transition: 'border 200ms ease-out',

    '&:hover, &:focus, &:active': {
      outline: 'none',
      border: '2px var(--color-primary) solid',
    },
  },

  '& button': {
    padding: '0.7rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    width: 'max-content',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-background)',
    fontWeight: 600,
    lineHeight: 1,
    transform: 'scale(1)',
    transition: 'transform 500ms cubic-bezier(0.57, 2.2, 0.26, 0.99)',

    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  '@mobileLarge': {
    flexDirection: 'row',

    '& input': {
      marginRight: '0.5rem',
      marginBottom: '0',
    },
  },

  variants: {
    color: {
      light: {
        color: 'var(--color-text)',
      },
      dark: {
        color: 'var(--color-background)',
      },
    },
  },
});

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
              color={colorMode}
            />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FormContainer>
      </Content>
      <CTAButton link="#nav" noBefore flipped position="right" />
      <Footer />
    </NewsletterSection>
  );
};

export default Newsletter;

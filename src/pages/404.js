import * as React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../stitches.config';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Footer from '../components/footer';

const NavStyled = styled('div', {
  '@laptopSmall': {
    'nav ul li::before, nav ul li::after, nav h1::before, nav h1::after': {
      background: 'rgb(221, 231, 174)',
    },
  },
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  placeContent: 'center',
  placeItems: 'center',
});

const Content = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateAreas: `
    'title'
    'paragraph'
    'button'`,
  gap: '1em',

  '& a': {
    padding: '0.5em 1em',
    width: 'max-content',
    background: 'var(--color-primary)',
    color: 'var(--color-background)',
    fontWeight: 800,
    textDecoration: 'none',
    borderRadius: '9999px',
  },

  '@desktopSmall': {
    maxWidth: '70%',
  },

  '@desktopLarge': {
    maxWidth: '55%',
  },
});

const Title = styled('h1', {
  margin: '0',
});

const Paragraph = styled('p', {
  margin: '0',
});

const FooterStyled = styled('div', {
  height: '4rem',
  position: 'relative',

  'footer small, footer small a, footer ul a': {
    color: 'var(--color-text)',
  },

  'footer small a::before, footer small a::after, footer ul li::before, footer ul li::after':
    {
      background: 'rgb(221, 231, 174)',
    },
});

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="Not found" />
      <NavStyled>
        <Nav siteTitle="<e//y>" color="#99af33" navColor="#99af33" />
      </NavStyled>
      <Container>
        <Content>
          <Title>Page not found</Title>
          <Paragraph>
            Sorry 😔 we couldn’t find what you were looking for.
          </Paragraph>
          <Link to="/">Go home</Link>
        </Content>
      </Container>
      <FooterStyled>
        <Footer />
      </FooterStyled>
    </Layout>
  );
};

export default NotFoundPage;

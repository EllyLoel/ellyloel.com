import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Speaking from '../components/speaking/speaking';
import Contact from '../components/contact/contact';

const Content = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 4.25rem;
  margin: 2.5rem 0 4rem 0;

  @media (min-width: 64em) {
    font-size: 6rem;
  }
`;

const SpeakingPage = () => {
  return (
    <Layout>
      <SEO title="Speaking" />
      <Nav siteTitle="<e//y>" color="#393939" />
      <Content>
        <Heading>Speaking</Heading>
        <Speaking />
      </Content>
      <Contact />
    </Layout>
  );
};

export default SpeakingPage;

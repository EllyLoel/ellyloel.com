import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Speaking from '../components/speaking/speaking';
import Contact from '../components/contact/contact';

const SpeakingPage = () => {
  return (
    <Layout>
      <SEO title="Speaking" />
      <Nav siteTitle="<e//y>" color="#393939" />
      <Speaking />
      <Contact />
    </Layout>
  );
};

export default SpeakingPage;

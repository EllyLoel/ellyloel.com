import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Speaking from '../components/speaking/speaking';
import Newsletter from '../components/newsletter/newsletter';

const SpeakingPage = () => {
  return (
    <Layout>
      <SEO title="Speaking" />
      <Nav siteTitle="<e//y>" />
      <Speaking />
      <Newsletter />
    </Layout>
  );
};

export default SpeakingPage;

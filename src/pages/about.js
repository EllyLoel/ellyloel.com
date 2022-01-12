import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import About from '../components/about/about';
import Newsletter from '../components/newsletter/newsletter';

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About" />
      <Nav siteTitle="<e//y>" />
      <About />
      <Newsletter />
    </Layout>
  );
};

export default AboutPage;

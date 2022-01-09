import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import About from '../components/about/about';
import Contact from '../components/contact/contact';

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About" />
      <Nav siteTitle="<e//y>" color="#393939" />
      <About />
      <Contact />
    </Layout>
  );
};

export default AboutPage;

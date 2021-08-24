import React from 'react';
// import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import Graph from '../components/graph'; might look into displaying a graph on hovering over the digital garden link
import Landing from '../components/sections/landing';
import Projects from '../components/sections/projects';
import About from '../components/sections/about';
import Contact from '../components/sections/contact';

const IndexPage = () => {
  return (
    <Layout>
      <Landing />
      <Projects />
      <About />
      <Contact />
    </Layout>
  );
};

export default IndexPage;

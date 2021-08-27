import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
// import Graph from '../components/graph'; might look into displaying a graph on hovering over the digital garden link
import Landing from '../components/sections/landing/landing';
import Projects from '../components/sections/projects/projects';
import About from '../components/sections/about';
import Contact from '../components/sections/contact';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Landing />
      <Projects data={data} />
      <About />
      <Contact />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    projects: allMarkdownRemark(
      filter: { frontmatter: { github: { ne: null } } }
      sort: { fields: frontmatter___id, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            demo
            github
            id
            imageAlt
            title
            imageSrc {
              childImageSharp {
                gatsbyImageData(placeholder: DOMINANT_COLOR, width: 500)
              }
            }
          }
          html
        }
      }
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
// import Graph from '../components/graph'; might look into displaying a graph on hovering over the digital garden link
import Landing from '../components/index/landing/landing';
import Projects from '../components/index/projects/projects';
import About from '../components/index/about/about';
import Contact from '../components/index/contact/contact';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
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
      sort: { fields: frontmatter___id, order: DESC }
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
            comingSoon
          }
          html
        }
      }
    }
  }
`;

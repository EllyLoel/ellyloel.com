import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Landing from '../components/index/landing';
import About from '../components/about/about';
import Projects from '../components/projects/projects';
import Speaking from '../components/speaking/speaking';
import Newsletter from '../components/newsletter/newsletter';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Landing />
      <About />
      <Projects data={data} />
      <Speaking />
      <Newsletter />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    projects: allMdx(
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
                gatsbyImageData(
                  placeholder: BLURRED
                  width: 500
                  aspectRatio: 1.6
                )
              }
            }
            comingSoon
          }
          body
        }
      }
    }
  }
`;

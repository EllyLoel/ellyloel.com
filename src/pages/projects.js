import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Projects from '../components/projects/projects';
import Newsletter from '../components/newsletter/newsletter';

const ProjectsPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Projects" />
      <Nav siteTitle="<e//y>" />
      <Projects data={data} />
      <Newsletter />
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  {
    projects: allMdx(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
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

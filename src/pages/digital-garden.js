import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Graph from '../components/graph';

const DigitalGarden = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const Notes = edges.map((edge, index) => (
    <article key={index}>
      <Link to={`/notes/${edge.node.slug}`}>
        <h1>{edge.node.frontmatter.title}</h1>
      </Link>
      <p>{edge.node.frontmatter.date}</p>
    </article>
  ));

  return (
    <Layout>
      <section>{Notes}</section>
      <Graph location={'home'} data={edges} />
    </Layout>
  );
};

export default DigitalGarden;

export const pageQuery = graphql`
  query MyQuery {
    allMdx {
      edges {
        node {
          slug
          frontmatter {
            title
            date
          }
          outboundReferences {
            ... on Mdx {
              slug
            }
          }
        }
      }
    }
  }
`;

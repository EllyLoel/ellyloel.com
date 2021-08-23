import React from 'react';
import { Link, graphql } from 'gatsby';
import { ForceGraph2D } from 'react-force-graph';

import Layout from '../components/layout';

const IndexPage = ({
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
      {/* <ForceGraph2D graphData={edges} /> */}
    </Layout>
  );
};

export default IndexPage;

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
          inboundReferences {
            ... on Mdx {
              frontmatter {
                title
              }
              slug
            }
          }
          outboundReferences {
            ... on Mdx {
              frontmatter {
                title
              }
              slug
            }
          }
        }
      }
    }
  }
`;

import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/layout';
import Graph from '../components/graph';

export default function noteTemplate({ data: { mdx } }) {
  return (
    <Layout>
      <article>
        <MDXRenderer>{mdx.body}</MDXRenderer>
        {mdx.inboundReferences.length > 0 ? <p>Referenced in:</p> : ''}
        <ul>
          {mdx.inboundReferences.map((ref, index) => (
            <li key={index}>
              <Link to={`/notes/${ref.slug}`}>{ref.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </article>
      <Graph location={'note'} data={mdx} />
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      inboundReferences {
        ... on Mdx {
          frontmatter {
            title
          }
          slug
        }
      }
      frontmatter {
        title
      }
      slug
    }
  }
`;

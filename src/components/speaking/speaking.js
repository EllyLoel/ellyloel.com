import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 5em;

  & ol {
    line-height: 1.7;
    padding-left: 0;
    list-style-position: inside;
  }

  & a {
    text-decoration: underline;
    text-underline-offset: 1px;
    color: var(--dark);
    margin: inherit;
    font-weight: 600;
  }
`;

const Speaking = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/speaking/" } }) {
        edges {
          node {
            body
          }
        }
      }
    }
  `);

  return (
    <>
      {data.allMdx.edges.map((edge, index) => (
        <Container key={index}>
          <MDXRenderer>{edge.node.body}</MDXRenderer>
        </Container>
      ))}
    </>
  );
};

export default Speaking;

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import Heading from '../heading';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Containers = styled.div`
  width: min(80%, 70ch);
`;

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
    color: var(--color-text);
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
    <Content>
      <Heading>Speaking</Heading>
      <Containers>
        {data.allMdx.edges.map((edge, index) => (
          <Container key={index}>
            <MDXRenderer>{edge.node.body}</MDXRenderer>
          </Container>
        ))}
      </Containers>
    </Content>
  );
};

export default Speaking;

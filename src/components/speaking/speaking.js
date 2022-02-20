import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { styled } from '../../../stitches.config';

import Heading from '../heading';

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Containers = styled('div', {
  width: 'min(80%, 70ch)',
});

const Container = styled('div', {
  marginBottom: '5em',

  '& ol': {
    lineHeight: 1.7,
    paddingLeft: '0',
    listStylePosition: 'inside',
  },

  '& a': {
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    color: 'var(--color-text)',
    margin: 'inherit',
    fontWeight: 600,
  },
});

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

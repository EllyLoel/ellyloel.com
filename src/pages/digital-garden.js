import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import Nav from '../components/nav/nav';
import Header from '../components/garden/header';
import Filters from '../components/garden/filters';
import Notes from '../components/garden/notes';
import Graph from '../components/garden/graph';
import Footer from '../components/footer';

const NavStyled = styled.div`
  nav ul li::before,
  nav ul li::after,
  nav h1::before,
  nav h1::after {
    background: rgb(221, 231, 174);
  }
`;

const Container = styled.div`
  margin: 6em 1.5em 1.5em 1.5em;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(4, auto);
  grid-template-areas:
    'header'
    'filters'
    'notes'
    'graph';
  gap: 3em;

  @media (min-width: 64em) {
    margin: 4em 1.5em 1.5em 1.5em;

    gap: 5em;
  }

  @media (min-width: 76em) {
    grid-template-columns: 1fr max-content;
    grid-template-rows: repeat(3, auto);
    grid-template-areas:
      'header header'
      'filters graph'
      'notes graph';
  }

  @media (min-width: 90em) {
    margin: 6em auto 1.5em auto;
    max-width: 70%;
  }

  @media (min-width: 120em) {
    max-width: 65%;
  }

  @media (min-width: 120em) {
    max-width: 55%;
  }
`;

const FooterStyled = styled.div`
  height: 4rem;
  position: relative;

  footer small,
  footer small a,
  footer ul a {
    color: var(--dark);
  }

  footer small a::before,
  footer small a::after,
  footer ul li::before,
  footer ul li::after {
    background: rgb(221, 231, 174);
  }
`;

const DigitalGarden = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const [activeTagFilter, setActiveTagFilter] = useState([]);
  const [activeStageFilter, setActiveStageFilter] = useState('');

  const tags = new Set();
  const stages = new Set();

  for (const edge of edges) {
    for (const tag of edge.node.frontmatter.tags) {
      tags.add(tag);
    }
    stages.add(edge.node.frontmatter.stage);
  }

  return (
    <Layout>
      <NavStyled>
        <Nav siteTitle="<e//y>" color="#99af33" navColor="#99af33" />
      </NavStyled>
      <Container>
        <Header />
        <Filters
          tags={Array.from(tags)}
          stages={Array.from(stages)}
          activeTagFilter={activeTagFilter}
          setActiveTagFilter={setActiveTagFilter}
          activeStageFilter={activeStageFilter}
          setActiveStageFilter={setActiveStageFilter}
        />
        <Notes
          edges={edges}
          activeTagFilter={activeTagFilter}
          activeStageFilter={activeStageFilter}
        />
        <Graph location={'home'} data={edges} />
      </Container>
      <FooterStyled>
        <Footer />
      </FooterStyled>
    </Layout>
  );
};

export default DigitalGarden;

export const pageQuery = graphql`
  query {
    allMdx(
      filter: { frontmatter: { date: { ne: null } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          slug
          frontmatter {
            title
            date
            stage
            tags
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

import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { styled } from '../../stitches.config';
import { window } from 'browser-monads';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Header from '../components/garden/header';
import Filters from '../components/garden/filters';
import Notes from '../components/garden/notes';
import Graph from '../components/garden/graph';
import Footer from '../components/footer';

const NavStyled = styled('div', {
  '@laptopSmall': {
    'nav ul li::before, nav ul li::after, nav h1::before, nav h1::after': {
      background: 'rgb(221, 231, 174)',
    },
  },
});

const Container = styled('div', {
  margin: '6em 1.5em 1.5em 1.5em',

  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'repeat(4, auto)',
  gridTemplateAreas: `
    'header'
    'filters'
    'notes'
    'graph'`,
  gap: '3em',

  '@laptopSmall': {
    margin: '4em 1.5em 1.5em 1.5em',
    gap: '5em',
  },

  '@laptopLarge': {
    gridTemplateColumns: '1fr max-content',
    gridTemplateRows: 'repeat(3, max-content)',
    gridTemplateAreas: `
      'header header'
      'filters graph'
      'notes graph'`,
  },

  '@desktopSmall': {
    margin: '6em auto 1.5em auto',
    maxWidth: '70%',
  },

  '@desktopLarge': {
    maxWidth: '55%',
  },
});

const FooterStyled = styled('div', {
  height: '8rem',
  position: 'relative',

  'footer small, footer small a, footer ul a': {
    color: 'var(--color-text)',
  },

  'footer small a::before, footer small a::after, footer ul li::before, footer ul li::after':
    {
      background: 'rgb(221, 231, 174)',
    },

  '@mobileLarge': {
    height: '4rem',
  },
});

const DigitalGarden = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const [activeTagFilter, setActiveTagFilter] = useState([]);
  const [activeStageFilter, setActiveStageFilter] = useState('');
  const [width, setWidth] = useState(0);

  let tags = new Set();
  let stages = ['seedling', 'budding', 'evergreen'];

  for (const edge of edges) {
    for (const tag of edge.node.frontmatter.tags) {
      tags.add(tag);
    }
  }

  tags = Array.from(tags).sort();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1216) {
        setWidth(window.innerWidth - 48);
      } else if (window.innerWidth < 1440) {
        setWidth(window.innerWidth / 3 - 74);
      } else {
        setWidth(window.innerWidth / 5);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <SEO title="Digital Garden" />
      <NavStyled>
        <Nav
          siteTitle="<e//y>"
          color="hsl(71, 55%, 50%)"
          navColor="hsl(71, 55%, 50%)"
        />
      </NavStyled>
      <Container>
        <Header />
        <Filters
          tags={tags}
          stages={stages}
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
        <Graph location={'home'} data={edges} width={width} />
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
      filter: { frontmatter: { slug: { ne: null } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
            stage
            tags
          }
          outboundReferences {
            ... on Mdx {
              frontmatter {
                slug
              }
            }
          }
          inboundReferences {
            ... on Mdx {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    }
  }
`;

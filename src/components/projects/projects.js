import React from 'react';
import { styled } from '../../../stitches.config';

import Heading from '../heading';
import Card from './card';

const ProjectsSection = styled('section', {
  position: 'relative',
  width: '100vw',
  height: '100%',
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Cards = styled('section', {
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'auto',
  gap: '2.5em',

  '@desktopSmall': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@desktopLarge': {
    padding: '2.5rem',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(0, 1fr)',
  },
});

const Projects = ({ data }) => (
  <ProjectsSection id="projects">
    <Content>
      <Heading>Projects</Heading>
      <Cards>
        {data.projects.edges.map(({ node }) => (
          <Card key={node.frontmatter.id} project={node} />
        ))}
      </Cards>
    </Content>
  </ProjectsSection>
);

export default Projects;

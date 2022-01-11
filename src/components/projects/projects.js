import React from 'react';
import styled from 'styled-components';

import Heading from '../heading';
import Card from './card';

const ProjectsSection = styled.section`
  position: relative;
  width: 100vw;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Cards = styled.section`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: 2.5em;

  @media (min-width: 90em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 120em) {
    padding: 2.5rem;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
  }
`;

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

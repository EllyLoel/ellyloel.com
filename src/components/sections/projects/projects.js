import React from 'react';

import Card from './card';

const Projects = ({ data }) => (
  <section id="projects" className="projects">
    <div className="content">
      <h1>Projects</h1>

      <section className="cards">
        {data.projects.edges.map(({ node }) => (
          <Card key={node.frontmatter.id} project={node} />
        ))}
      </section>
    </div>
  </section>
);

export default Projects;

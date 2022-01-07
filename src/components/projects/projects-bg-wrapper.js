import React from 'react';
import styled from 'styled-components';

const ProjectsBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;

  background: var(--accent);
`;

const ProjectsOverlay = styled.div`
  width: 100%;
  height: 50vh;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;

  background: rgb(255, 255, 255);
  clip-path: polygon(0 40%, 100% 20%, 100% 0, 0 0);
`;

const ProjectsBGWrapper = ({ children }) => {
  return (
    <>
      {children}
      <ProjectsBackground />
      <ProjectsOverlay />
    </>
  );
};

export default ProjectsBGWrapper;

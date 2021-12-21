import React from 'react';
import styled from 'styled-components';

const SoftwareStyled = styled.section`
  grid-area: software;

  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 1rem;
  }
`;

const Software = () => {
  return (
    <SoftwareStyled id="software">
      <div>
        <h2>Software</h2>
        <ul>
          <li>Notion</li>
          <li>Atlassian Suite</li>
          <li>Figma</li>
          <li>Adobe Creative Suite</li>
          <li>Google Workspace</li>
          <li>Microsoft 365 Suite</li>
        </ul>
      </div>
    </SoftwareStyled>
  );
};

export default Software;

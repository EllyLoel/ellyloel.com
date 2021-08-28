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
      <div className="container">
        <h2>Software</h2>
        <ul>
          <li className="notion">Notion</li>
          <li className="atlassian">Atlassian Suite</li>
          <li className="figma">Figma</li>
          <li className="adobe">Adobe Creative Suite</li>
          <li className="google">G Suite</li>
          <li className="microsoft">Microsoft 365 Suite</li>
        </ul>
      </div>
    </SoftwareStyled>
  );
};

export default Software;

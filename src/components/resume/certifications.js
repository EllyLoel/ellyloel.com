import React from 'react';
import styled from 'styled-components';

const CertificationsStyled = styled.section`
  grid-area: certifications;
  line-height: 1.7;
`;

const Certifications = () => {
  return (
    <CertificationsStyled id="certifications">
      <h2>Certifications</h2>
      <ul>
        <li>
          <span>Certificate III</span> in Information, Digital Media &amp;
          Technology
        </li>
        <li>
          <span>The Frontend Developer Career Path</span> from Scrimba
        </li>
      </ul>
    </CertificationsStyled>
  );
};

export default Certifications;

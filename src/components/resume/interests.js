import React from 'react';
import styled from 'styled-components';

const InterestsStyled = styled.section`
  grid-area: interests;
  line-height: 1.7;
`;

const Interests = () => {
  return (
    <InterestsStyled id="interests">
      <h2>Interests</h2>
      <ul>
        <li>Personal knowledge management &amp; digital gardening</li>
        <li>Developing general development skills</li>
        <li>Building artisan mechanical keyboards</li>
        <li>Landscape photography</li>
      </ul>
    </InterestsStyled>
  );
};

export default Interests;

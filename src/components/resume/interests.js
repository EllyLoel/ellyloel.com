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
        <li>Landscape photography</li>
        <li>Building artisan Mechanical Keyboards</li>
        <li>Developing skills in Front-end Web Development</li>
      </ul>
    </InterestsStyled>
  );
};

export default Interests;

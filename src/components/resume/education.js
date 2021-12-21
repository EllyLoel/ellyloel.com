import React from 'react';
import styled from 'styled-components';

const EducationStyled = styled.section`
  grid-area: education;
  line-height: 1.7;
`;

const Education = () => {
  return (
    <EducationStyled id="education">
      <h2>Education</h2>
      <ul>
        <li>
          <span>The Frontend Developer Career Path</span> - Scrimba - June 2021
          - December 2021
        </li>
        <li>
          <span>Bachelor of Computer Science</span> - Swinburne University of
          Technology - March 2020 - September 2021
        </li>
        <li>
          <span>Victorian Certificate of Education</span> - Rosebud Secondary
          College - Graduated 2019
        </li>
      </ul>
    </EducationStyled>
  );
};

export default Education;

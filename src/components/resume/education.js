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
          <span>The Frontend Developer Career Path</span> - Scrimba - Jun
          2021-Dec 2021
        </li>
        <li>
          <span>Bachelor of Computer Science</span> - Swinburne University of
          Technology - Mar 2020-Sep 2021
        </li>
        <li>
          <span>Victorian Certificate of Education</span> - Rosebud Secondary
          College - 2014-2019
        </li>
      </ul>
    </EducationStyled>
  );
};

export default Education;

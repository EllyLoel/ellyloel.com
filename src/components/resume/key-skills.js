import React from 'react';
import styled from 'styled-components';

const KeySkillsStyled = styled.section`
  grid-area: key-skills;

  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 1rem;
  }

  .skills-container {
    display: flex;
  }
`;

const KeySkills = () => {
  return (
    <KeySkillsStyled id="key-skills">
      <div>
        <h2>Key skills</h2>
        <div className="skills-container">
          <ul>
            <li>Semantic HTML</li>
            <li>Advanced CSS</li>
            <li>JavaScript</li>
            <li>PHP</li>
            <li>Git</li>
            <li>A11y</li>
          </ul>
          <ul>
            <li>Sass</li>
            <li>Tailwind</li>
            <li>React</li>
            <li>Gatsby</li>
            <li>Next.js</li>
            <li>WordPress</li>
          </ul>
          <ul>
            <li>SilverStripe</li>
            <li>Laravel</li>
            <li>Docker</li>
            <li>GitHub</li>
            <li>Bitbucket</li>
          </ul>
        </div>
      </div>
    </KeySkillsStyled>
  );
};

export default KeySkills;

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
      <div className="container">
        <h2>Key skills</h2>
        <div className="skills-container">
          <ul>
            <li className="html">
              HTML
              <ul>
                <li className="a11y">A11y</li>
                <li className="semantic">Semantic HTML</li>
              </ul>
            </li>
            <li className="css">
              CSS
              <ul>
                <li className="sass">Sass</li>
                <li className="tailwind-css">Tailwind</li>
              </ul>
            </li>
            <li className="php">PHP</li>
          </ul>
          <ul>
            <li className="javascript">
              JavaScript
              <ul>
                <li className="react">React</li>
                <li className="nextjs">Next.js</li>
                <li className="gatsby">Gatsby</li>
              </ul>
            </li>
            <li className="git">
              Git
              <ul>
                <li className="github">GitHub</li>
              </ul>
            </li>
            <li className="oop">OOP</li>
          </ul>
        </div>
      </div>
    </KeySkillsStyled>
  );
};

export default KeySkills;

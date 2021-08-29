import React from 'react';
import styled, { keyframes } from 'styled-components';

import Layout from '../components/layout';
import Nav from '../components/nav/nav';
import Header from '../components/resume/header';
import ContactDetails from '../components/resume/contact-details';
import Summary from '../components/resume/summary';
import KeySkills from '../components/resume/key-skills';
import Software from '../components/resume/software';
import WorkHistory from '../components/resume/work-history';
import Education from '../components/resume/education';
import Certifications from '../components/resume/certifications';
import Interests from '../components/resume/interests';

const bgAnimation = keyframes`
		0% { background-position:0% 13% }
		50% { background-position:100% 88% }
		100% { background-position:0% 13% }
`;

const ResumeBody = styled.div`
  width: 100vw;
  height: 100%;

  background: linear-gradient(316deg, var(--bg-blue), var(--bg-purple));
  background-size: 400% 400%;
  animation: ${bgAnimation} 5s ease infinite;
`;

const ResumeContainer = styled.div`
  width: min(80%, 70rem);
  margin: 5em auto 2em auto;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(9, max-content);
  gap: 2em;
  grid-auto-flow: row;
  grid-template-areas:
    'header'
    'contact-details'
    'summary'
    'key-skills'
    'software'
    'work-history'
    'education'
    'certifications'
    'interests';

  & > * {
    background-color: white;
    padding: 1.5em;
    border-radius: 1em;
  }

  h2 {
    margin: 0;
  }

  ul {
    padding-left: 1.5rem;
  }

  li {
    line-height: 1.7;
  }

  @media (max-width: 20em) {
    width: 95%;
  }

  @media (min-width: 48em) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, max-content);
    grid-template-areas:
      'header contact-details'
      'summary summary'
      'key-skills software'
      'work-history work-history'
      'education education'
      'certifications interests';
  }

  @media (min-width: 90em) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
      'header header contact-details contact-details'
      'summary key-skills key-skills software'
      'work-history work-history work-history work-history'
      'education education certifications interests';
  }

  @media (min-width: 160em) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-template-areas:
      'header header contact-details contact-details'
      'summary key-skills key-skills software'
      'work-history work-history education education'
      'work-history work-history certifications interests';
  }
`;

const Resume = () => {
  return (
    <Layout>
      <ResumeBody>
        <Nav siteTitle="<e//y>" color="#FFDC84" />
        <ResumeContainer>
          <Header />
          <ContactDetails />
          <Summary />
          <KeySkills />
          <Software />
          <WorkHistory />
          <Education />
          <Certifications />
          <Interests />
        </ResumeContainer>
      </ResumeBody>
    </Layout>
  );
};

export default Resume;

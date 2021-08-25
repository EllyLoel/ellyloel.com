// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';
import styled from 'styled-components';

import BGWrapper from './bg-wrapper';
import SVGGraphic from '../../images/svg/sitting-laptop.svg';
import CTAButton from '../cta-button';

// STYLES /////////////////////////////////////////////////////////////////////

const LandingSection = styled.section`
  position: relative;

  grid-area: landing;

  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4em;
`;

const HeroHeader = styled.header`
  h1 {
    font-size: 4rem;
    margin: 0;
    line-height: 0.9;
  }

  p {
    font-size: 0.935rem;
    margin: 0;
    letter-spacing: -0.0025em;
  }
`;

const Heading = styled.h1`
  .flex-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .emoji-wrapper {
      width: max-content;
      font-size: 0.75em;
    }
  }
`;

const SubHeading = styled.p`
  padding-left: 0.4rem;
`;

// COMPONENTS /////////////////////////////////////////////////////////////////

const Landing = () => {
  return (
    <LandingSection id="landing">
      <BGWrapper>
        <Content>
          <HeroText />
          <SVGGraphic />
          <CTAButton />
        </Content>
      </BGWrapper>
    </LandingSection>
  );
};

export default Landing;

const HeroText = () => (
  <HeroHeader>
    <Heading>
      <span className="flex-container">
        Hello.{' '}
        <span role="img" aria-label="sparkles" className="emoji-wrapper">
          ✨
        </span>
      </span>
      <span style={{ display: 'block' }}>I am Elly</span>
    </Heading>
    <SubHeading>
      <em>I design &amp; build things for the web.</em>
    </SubHeading>
  </HeroHeader>
);

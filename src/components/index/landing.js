// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';
import { styled } from '../../../stitches.config';

import Nav from '../nav/nav';
import SVGGraphic from '../../images/svg/sitting-with-laptop.svg';
import CTAButton from '../cta-button';

// STYLES /////////////////////////////////////////////////////////////////////

const LandingSection = styled('section', {
  position: 'relative',
  width: '100vw',
  height: '100vh',

  gridArea: 'landing',
  display: 'grid',
  gridTemplateRows: 'max-content auto',
});

const Content = styled('div', {
  width: '100%',
  height: '100vh',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4em',

  '& .svg-graphic': {
    width: 'min(80vw, 22.5em)',
  },

  '@laptopSmall': {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: '0',

    '& .svg-graphic': {
      width: '100%',
      maxWidth: '22.5rem',
    },
  },

  '@desktopSmall': {
    '& .svg-graphic': {
      maxWidth: '30rem',
    },
  },
});

const HeroHeader = styled('header', {
  '& h1': {
    fontSize: '4rem',
    margin: '0',
    lineHeight: 0.9,
  },

  '& p': {
    fontSize: '0.935rem',
    margin: '0',
    letterSpacing: '-0.0025em',
  },

  '@laptopSmall': {
    '& h1': {
      fontSize: '5rem',
    },

    '& p': {
      fontSize: '1.15rem',
    },
  },

  '@desktopSmall': {
    '& h1': {
      fontSize: '6rem',
    },

    '& p': {
      fontSize: '1.4rem',
    },
  },
});

const Heading = styled('h1', {
  '& .flex-container': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& .emoji-wrapper': {
      width: 'max-content',
      fontSize: '0.75em',
    },
  },
});

const SubHeading = styled('p', {
  paddingLeft: '0.4rem',
});

// COMPONENTS /////////////////////////////////////////////////////////////////

const Landing = () => {
  return (
    <LandingSection id="landing">
      <Nav siteTitle="<e//y>" />
      <Content>
        <HeroText />
        <SVGGraphic />
        <CTAButton link="/#projects" />
      </Content>
    </LandingSection>
  );
};

export default Landing;

const HeroText = () => (
  <HeroHeader>
    <Heading>
      <span className="flex-container">
        Hello. <i className="twa twa-sparkles"></i>
      </span>
      <span style={{ display: 'block' }}>I am Elly</span>
    </Heading>
    <SubHeading>
      <em>I design &amp; build things for the web.</em>
    </SubHeading>
  </HeroHeader>
);

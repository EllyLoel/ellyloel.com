import React from 'react';
import { styled } from '../../../stitches.config';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useStaticQuery, graphql } from 'gatsby';

import Heading from '../heading';
import LeftSVGGraphic from '../../images/svg/standing-infront-webpage.svg';
import RightSVGGraphic from '../../images/svg/sitting-behind-laptop.svg';

const AboutSection = styled('section', {
  position: 'relative',
  width: '100vw',
});

const Content = styled('div', {
  width: '100%',
  height: '100%',

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const SubContent = styled('div', {
  '& article': {
    fontSize: '1.35rem',
    padding: '0 2em',
    lineHeight: 1.6,
  },

  '& .left-svg-graphic': {
    display: 'none',
  },

  '& .right-svg-graphic': {
    display: 'none',
  },

  '@tabletLarge': {
    maxWidth: 'min(80vw, 60rem)',
    display: 'grid',
    gridTemplateColumns: 'max-content 30vw',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3vw',

    '& p': {
      maxWidth: '35vw',
      fontSize: '1.25rem',
    },

    '& .right-svg-graphic': {
      display: 'block',
      width: '100%',
    },
  },

  '@laptopSmall': {
    gridTemplateColumns: '25vw max-content 25vw',

    '& .left-svg-graphic': {
      display: 'block',
      width: '100%',
      marginBottom: '20em',
    },

    '& p': {
      maxWidth: '30vw',
    },
  },
});

const About = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/about/" } }) {
        edges {
          node {
            body
          }
        }
      }
    }
  `);

  return (
    <AboutSection id="about">
      <Content>
        <Heading>About</Heading>
        <SubContent>
          <LeftSVGGraphic />
          <article>
            {data.allMdx.edges.map((edge, index) => (
              <div key={index}>
                <MDXRenderer>{edge.node.body}</MDXRenderer>
              </div>
            ))}
          </article>
          <RightSVGGraphic />
        </SubContent>
      </Content>
    </AboutSection>
  );
};

export default About;

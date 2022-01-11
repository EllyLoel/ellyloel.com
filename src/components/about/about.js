import React from 'react';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useStaticQuery, graphql } from 'gatsby';

import Heading from '../heading';
import LeftSVGGraphic from '../../images/svg/standing-infront-webpage.svg';
import RightSVGGraphic from '../../images/svg/sitting-behind-laptop.svg';

const AboutSection = styled.section`
  position: relative;
  width: 100vw;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SubContent = styled.div`
  article {
    font-size: 1.35rem;
    padding: 0 2em;
    line-height: 1.6;
  }

  .left-svg-graphic {
    display: none;
  }

  .right-svg-graphic {
    display: none;
  }

  @media (min-width: 48em) {
    max-width: min(80vw, 60rem);

    display: grid;
    grid-template-columns: max-content 30vw;
    align-items: center;
    justify-content: center;
    gap: 3vw;

    p {
      max-width: 35vw;
      font-size: 1.25rem;
    }

    .right-svg-graphic {
      display: block;
      width: 100%;
    }
  }

  @media (min-width: 64em) {
    grid-template-columns: 25vw max-content 25vw;

    .left-svg-graphic {
      display: block;
      width: 100%;
      margin-bottom: 20em;
    }

    p {
      max-width: 30vw;
    }
  }
`;

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

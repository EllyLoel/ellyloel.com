import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Header from '../components/resume/header';
import ResumeSection from '../components/resume/ResumeSection';
import Footer from '../components/footer';

const ResumeBody = styled.div``;

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
    background-color: var(--color-background);
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
      'summary key-skills'
      'interests software'
      'work-history work-history'
      'education education'
      'certifications certifications';
  }

  @media (min-width: 90em) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, max-content);
    grid-template-areas:
      'header contact-details'
      'summary key-skills'
      'interests software'
      'work-history work-history'
      'education certifications';
  }
`;

const Resume = ({ data }) => {
  return (
    <Layout>
      <SEO title="Resume" />
      <ResumeBody>
        <Nav siteTitle="<e//y>" />
        <ResumeContainer>
          <Header />
          {data.allMdx.nodes.map((node, index) => {
            return (
              <ResumeSection key={index} slug={node.slug}>
                <MDXRenderer>{node.body}</MDXRenderer>
              </ResumeSection>
            );
          })}
        </ResumeContainer>
      </ResumeBody>
      <Footer />
    </Layout>
  );
};

export default Resume;

export const pageQuery = graphql`
  query {
    allMdx(filter: { fileAbsolutePath: { regex: "/resume/" } }) {
      nodes {
        slug
        body
      }
    }
  }
`;

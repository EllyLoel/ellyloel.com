import React from 'react';
import { graphql } from 'gatsby';
import { styled } from '../../stitches.config';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import Header from '../components/resume/header';
import ResumeSection from '../components/resume/ResumeSection';
import Footer from '../components/footer';

const ResumeBody = styled('div', {});

const ResumeContainer = styled('div', {
  width: '90%',
  margin: '5em auto 2em auto',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'repeat(9, max-content)',
  gap: '2em',
  gridAutoFlow: 'row',
  gridTemplateAreas: `
    'header'
    'contact-details'
    'summary'
    'key-skills'
    'software'
    'work-history'
    'education'
    'certifications'
    'interests'`,

  '& > *': {
    backgroundColor: 'var(--color-background)',
    padding: '1.5em',
    borderRadius: '1em',
  },

  h2: {
    margin: '0',
  },

  ul: {
    paddingLeft: '1.5rem',
  },

  li: {
    lineHeight: 1.7,
  },

  '@laptopSmall': {
    width: 'min(80%, 70rem)',
  },

  '@tabletLarge': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(6, max-content)',
    gridTemplateAreas: `
      'header contact-details'
      'summary key-skills'
      'interests software'
      'work-history work-history'
      'education education'
      'certifications certifications'`,
  },

  '@desktopSmall': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(6, max-content)',
    gridTemplateAreas: `
      'header contact-details'
      'summary key-skills'
      'interests software'
      'work-history work-history'
      'education certifications'`,
  },
});

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

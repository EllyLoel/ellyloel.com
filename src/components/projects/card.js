import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { styled } from '../../../stitches.config';

import CardLinks from './card-links';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const CardStyled = styled('article', {
  maxWidth: 'min(80vw, 25em)',
  display: 'grid',
  gridTemplateAreas: `
    'img'
    'content'`,
  color: 'var(--color-text)',
  backgroundColor: 'var(--color-background)',
  boxShadow: 'var(--shadow-elevation-low)',
  borderRadius: '1rem',
  transform: 'scale(1)',
  transition: 'all 500ms cubic-bezier(0.57, 2.2, 0.26, 0.99)',

  '&:hover': {
    boxShadow: 'var(--shadow-elevation-medium)',
    transform: 'scale(1.0125)',
  },

  '& .no-click': {
    pointerEvents: 'none',
    cursor: 'default',
  },

  '& .blur': {
    filter: 'blur(3px)',
    userSelect: 'none',
  },

  '& .blur-img': {
    filter: 'blur(20px)',
    userSelect: 'none',
    transform: 'scale(1.1)',
  },
});

const CardImg = styled('a', {
  gridArea: 'img',
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: '1rem 1rem 0 0',
  overflow: 'hidden',
  lineHeight: 0,

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const CardContent = styled('div', {
  gridArea: 'content',
  padding: '1.5em',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Title = styled('h2', {
  margin: '0',
  lineHeight: 1,

  '& span': {
    display: 'block',
    color: 'rgba(255, 0, 0, 0.65)',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '1.1rem',
  },
});

const Content = styled('div', {
  lineHeight: 1.7,

  '& a': {
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    color: 'var(--color-text)',
    margin: 'inherit',
    fontWeight: 600,
  },
});

const Card = ({ project }) => (
  <CardStyled>
    <CardImg
      href={project.frontmatter.demo}
      target="_blank"
      rel="noreferrer"
      className={project.frontmatter.comingSoon && 'no-click'}
    >
      <GatsbyImage
        image={getImage(project.frontmatter.imageSrc)}
        alt={project.frontmatter.imageAlt}
        className={project.frontmatter.comingSoon && 'blur-img'}
      />
    </CardImg>
    <CardContent>
      <Title>
        {project.frontmatter.title}
        {project.frontmatter.comingSoon && <span>Coming Soon</span>}
      </Title>
      <Content className={project.frontmatter.comingSoon && 'blur'}>
        <MDXRenderer>{project.body}</MDXRenderer>
      </Content>
      <CardLinks
        demo={project.frontmatter.demo}
        github={project.frontmatter.github}
        comingSoon={project.frontmatter.comingSoon}
      />
    </CardContent>
  </CardStyled>
);

export default Card;

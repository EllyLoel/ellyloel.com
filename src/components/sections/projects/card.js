import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import CardLinks from './card-links';

const CardStyled = styled.article`
  max-width: min(80vw, 25em);

  display: grid;
  grid-template-areas:
    'img'
    'content';

  background-color: var(--light);
  color: var(--dark);

  border-radius: 1rem;

  transform: scale(1);
  transition: transform 500ms cubic-bezier(0.57, 2.2, 0.26, 0.99);
`;

const CardImg = styled.a`
  grid-area: img;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  line-height: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  grid-area: content;
  padding: 1.5em;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .blur {
    filter: blur(3px);
    user-select: none;
  }
`;

const Title = styled.h2`
  margin: 0;
  line-height: 1;

  span {
    display: block;
    color: rgba(255, 0, 0, 0.65);
    font-weight: 400;
    font-style: italic;
    font-size: 1.1rem;
  }
`;

const Content = styled.p`
  line-height: 1.7;

  a {
    text-decoration: underline;
    text-underline-offset: 1px;
    color: var(--dark);
    margin: inherit;
    font-weight: 600;
  }
`;

const Card = ({ project }) => (
  <CardStyled>
    <CardImg href={project.frontmatter.demo} target="_blank" rel="noreferrer">
      <GatsbyImage
        image={getImage(project.frontmatter.imageSrc)}
        alt={project.frontmatter.imageAlt}
      />
    </CardImg>
    <CardContent>
      <Title>{project.frontmatter.title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: project.html }} />
      <CardLinks
        demo={project.frontmatter.demo}
        github={project.frontmatter.github}
      />
    </CardContent>
  </CardStyled>
);

export default Card;

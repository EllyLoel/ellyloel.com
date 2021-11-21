import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Metadata from './metadata';

const NotesStyled = styled.section`
  grid-area: notes;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;

  a {
    max-width: 100%;
    max-height: 100%;

    display: block;

    color: var(--dark);
    text-decoration: none;
  }

  @media (min-width: 34em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 48em) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 90em) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Note = styled.article`
  width: 100%;
  padding: 0.5em 1em;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid rgba(52, 61, 68, 0.05);
  border-radius: 1rem;
  box-shadow: 0px 1px 2px rgba(52, 61, 68, 0.1);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover,
  &:focus {
    transform: scale(1.015);
    border: 1px solid var(--accent);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 34em) {
    height: 100%;
  }
`;

const Title = styled.h2`
  margin-top: 0.6em;
  font-weight: 600;
`;

const Notes = ({ edges, activeTagFilter, activeStageFilter }) => {
  const notes = edges
    .filter((edge) => {
      if (activeStageFilter) {
        if (activeStageFilter === edge.node.frontmatter.stage) {
          if (activeTagFilter.length) {
            return activeTagFilter.every((tag) =>
              edge.node.frontmatter.tags.includes(tag)
            );
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        if (activeTagFilter.length) {
          return activeTagFilter.every((tag) =>
            edge.node.frontmatter.tags.includes(tag)
          );
        } else {
          return true;
        }
      }
    })
    .map((edge, index) => {
      return (
        <Link to={`/notes/${edge.node.frontmatter.slug}`} key={index}>
          <Note>
            <Title>{edge.node.frontmatter.title}</Title>
            <Metadata
              date={edge.node.frontmatter.date}
              stage={edge.node.frontmatter.stage}
            />
          </Note>
        </Link>
      );
    });

  if (!notes.length) {
    notes.push(
      <Link to={`/digital-garden/`} key={0}>
        <Note>
          <Title>Nothing here.</Title>
          <p>There are no notes avaliable with the filters you have applied.</p>
        </Note>
      </Link>
    );
  }

  return <NotesStyled>{notes}</NotesStyled>;
};

export default Notes;

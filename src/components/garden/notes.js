import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../../stitches.config';

import Metadata from './metadata';

const NotesStyled = styled('section', {
  gridArea: 'notes',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1em',

  '& a': {
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    color: 'var(--color-text)',
    textDecoration: 'none',
  },

  '@tabletSmall': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@tabletLarge': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  '@desktopSmall': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const Note = styled('article', {
  width: '100%',
  padding: '0.5em 1em',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  background: 'var(--color-background)',
  borderRadius: '1rem',

  border: '1px solid var(--color-gray300)',
  boxShadow: 'var(--shadow-elevation-low)',
  transition: 'all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',

  '&:hover, &:focus': {
    transform: 'scale(1.015)',
    border: '1px solid var(--color-primary)',
    boxShadow: 'var(--shadow-elevation-medium)',
  },

  '@tabletSmall': {
    height: '100%',
  },
});

const Title = styled('h2', {
  marginTop: '0.6em',
  fontWeight: 600,
});

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

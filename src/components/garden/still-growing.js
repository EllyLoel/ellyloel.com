import React from 'react';
import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  position: 'relative',
  width: 'auto',
  padding: '1em 2em',
  background: '#bcd05f1a',
  borderRadius: '1rem',
  color: '#707070',
  fontStyle: 'italic',
  letterSpacing: '0.5px',
  textAlign: 'center',

  '& span': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },

  '& a': {
    fontStyle: 'normal',
  },
});

const StillGrowing = () => (
  <Container>
    <span>
      <i className="twa twa-seedling"></i> Still Growing{' '}
      <i className="twa twa-evergreen-tree"></i>
    </span>
    <br />
    <a
      href={`https://twitter.com/intent/tweet?text=Hey%20%40ellyloel!%20You%20should%20finish%20writing%20your%20note%20about%20`}
      target="_blank"
      rel="noreferrer"
    >
      Tweet
    </a>{' '}
    at me to finish writing this!
  </Container>
);

export default StillGrowing;

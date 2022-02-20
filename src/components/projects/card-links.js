import React from 'react';
import { styled } from '../../../stitches.config';
import { FaAngleRight } from 'react-icons/fa';

const Links = styled('div', {
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'stretch',
  gap: '0.5em',

  '@mobileSmall': {
    flexDirection: 'row',
    alignItems: 'initial',
  },
});

const Link = styled('a', {
  padding: '0.5rem 0.75rem 0.5rem 1rem',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'var(--color-background)',
  fontWeight: 'bold',
  backgroundColor: 'var(--color-text)',
  borderRadius: '9999px',
  opacity: 1,
  transition: 'opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',

  '& svg': {
    display: 'inline',
    verticalAlign: 'top',
  },

  '&:hover': {
    transition: 'opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
    opacity: 0.85,
  },
});

const CardLinks = ({ demo, github, comingSoon }) => {
  return (
    <Links>
      <Link
        href={demo}
        target="_blank"
        rel="noreferrer"
        className={comingSoon && 'blur no-click'}
      >
        Live Demo
        <FaAngleRight />
      </Link>
      <Link
        href={github}
        target="_blank"
        rel="noreferrer"
        className={comingSoon && 'blur no-click'}
      >
        GitHub
        <FaAngleRight />
      </Link>
    </Links>
  );
};

export default CardLinks;

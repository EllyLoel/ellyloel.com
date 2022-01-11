import React from 'react';
import styled from 'styled-components';
import { FaAngleRight } from 'react-icons/fa';

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;

  @media (max-width: 23.4375em) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const Link = styled.a`
  padding: 0.5rem 0.75rem 0.5rem 1rem;

  text-align: center;
  text-decoration: none;
  color: var(--color-background);
  font-weight: bold;
  background-color: var(--color-text);
  border-radius: 9999px;

  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  svg {
    display: inline;
    vertical-align: top;
  }

  &:hover {
    transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0.85;
  }
`;

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

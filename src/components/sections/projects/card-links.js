import React from 'react';
import styled from 'styled-components';
import { FaAngleRight } from 'react-icons/fa';

const Link = styled.a`
  padding: 0.5rem 0.75rem 0.5rem 1rem;

  text-decoration: none;
  color: var(--light);
  margin-right: 0.25em;
  font-weight: bold;
  background-color: var(--dark);
  border-radius: 9999px;

  svg {
    display: inline;
    vertical-align: top;
  }
`;

const CardLinks = ({ demo, github }) => {
  return (
    <div className="links">
      <Link href={demo} target="_blank" rel="noreferrer">
        Live Demo
        <FaAngleRight />
      </Link>
      <Link href={github} target="_blank" rel="noreferrer">
        GitHub
        <FaAngleRight />
      </Link>
    </div>
  );
};

export default CardLinks;

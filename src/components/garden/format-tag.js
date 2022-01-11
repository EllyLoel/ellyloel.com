import React from 'react';
import styled from 'styled-components';

const TagStyled = styled.button`
  appearance: none;
  background: none;
  border: none;
  margin: 0;

  padding: 0.3em 0.5em;

  border-radius: 4px;
  color: ${({ active }) =>
    active ? 'var(--color-background)' : 'rgb(101, 116, 34)'};
  background: ${({ active }) =>
    active ? 'rgb(181, 191, 134)' : 'rgb(221, 231, 174)'};
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: rgb(201, 211, 154);
    cursor: pointer;
  }

  &:first-letter {
    text-transform: capitalize;
  }
`;

const FormatTag = ({ tag }) => {
  return <TagStyled>{tag.split('-').join(' ')}</TagStyled>;
};

export default FormatTag;

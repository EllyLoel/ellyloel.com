import React from 'react';
import styled from 'styled-components';

const TagStyled = styled.span`
  color: ${({ active }) =>
    active ? 'var(--color-green700)' : 'var(--color-background)'};
  transform: all 0.3s ease-in-out;

  &:first-letter {
    text-transform: capitalize;
  }
`;

const FormatTag = ({ tag, active }) => {
  return <TagStyled active={active}>{tag.split('-').join(' ')}</TagStyled>;
};

export default FormatTag;

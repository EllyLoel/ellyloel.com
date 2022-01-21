import React from 'react';
import styled from 'styled-components';

const StageStyled = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1ch;

  span {
    color: ${({ active }) =>
      active ? 'var(--color-text)' : 'var(--color-green700)'};

    margin: 0;

    &:first-letter {
      text-transform: capitalize;
    }
  }
`;

const FormatStage = ({ stage, active }) => {
  let emoji = '';

  if (stage === 'seedling') {
    emoji = 'twa twa-seedling';
  } else if (stage === 'budding') {
    emoji = 'twa twa-herb';
  } else if (stage === 'evergreen') {
    emoji = 'twa twa-evergreen-tree';
  }

  return (
    <StageStyled active={active}>
      <i className={emoji}></i>
      <span>{stage}</span>
    </StageStyled>
  );
};

export default FormatStage;

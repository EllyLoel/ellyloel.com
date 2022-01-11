import React from 'react';
import styled from 'styled-components';

const StageStyled = styled.button`
  appearance: none;
  background: none;
  border: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1ch;

  span {
    margin: 0;

    color: #99af33;

    &:first-letter {
      text-transform: capitalize;
    }
  }
`;

const FormatStage = ({ stage }) => {
  let emoji = '';

  if (stage === 'seedling') {
    emoji = <i className="twa twa-seedling"></i>;
  } else if (stage === 'budding') {
    emoji = <i className="twa twa-herb"></i>;
  } else if (stage === 'evergreen') {
    emoji = <i className="twa twa-evergreen-tree"></i>;
  }

  return (
    <StageStyled>
      {emoji}
      <span>{stage}</span>
    </StageStyled>
  );
};

export default FormatStage;

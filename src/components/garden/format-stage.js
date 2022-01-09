import React from 'react';
import styled from 'styled-components';

const StageStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1ch;

  span {
    height: fit-content;
  }

  p {
    margin: 0;

    color: #99af33;

    &:first-letter {
      text-transform: capitalize;
    }
  }
`;

const FormatStage = ({ stage }) => {
  let emoji = '';
  let ariaLabel = '';

  if (stage === 'seedling') {
    emoji = <i className="twa twa-seedling"></i>;
    ariaLabel = 'Seedling';
  } else if (stage === 'budding') {
    emoji = <i className="twa twa-herb"></i>;
    ariaLabel = 'Herb';
  } else if (stage === 'evergreen') {
    emoji = <i className="twa twa-evergreen-tree"></i>;
    ariaLabel = 'Evergreen tree';
  }

  return (
    <StageStyled>
      <span role="img" aria-label={ariaLabel}>
        {emoji}
      </span>
      <p>{stage}</p>
    </StageStyled>
  );
};

export default FormatStage;

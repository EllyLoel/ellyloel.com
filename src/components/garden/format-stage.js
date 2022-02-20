import React from 'react';
import { styled } from '../../../stitches.config';

const StageStyled = styled('span', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1ch',

  '& span': {
    color: 'var(--color-green700)',
    margin: '0',

    '&:first-letter': {
      textTransform: 'capitalize',
    },
  },

  variants: {
    active: {
      true: {
        color: 'var(--color-text)',
      },
    },
  },
});

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

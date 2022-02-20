import React from 'react';
import { styled } from '../../../stitches.config';

const TagStyled = styled('span', {
  transform: 'all 0.3s ease-in-out',
  color: 'var(--color-background)',

  '&:first-letter': {
    textTransform: 'capitalize',
  },

  variants: {
    active: {
      true: {
        color: 'var(--color-green700)',
      },
    },
  },
});

const FormatTag = ({ tag, active }) => {
  return <TagStyled active={active}>{tag.split('-').join(' ')}</TagStyled>;
};

export default FormatTag;

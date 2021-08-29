import React from 'react';
import styled from 'styled-components';

const TagStyled = styled.div`
  p {
    margin: 0;

    &:first-letter {
      text-transform: capitalize;
    }
  }
`;

const FormatTag = ({ tag }) => {
  return (
    <TagStyled>
      <p>{tag.split('-').join(' ')}</p>
    </TagStyled>
  );
};

export default FormatTag;

import React from 'react';
import styled from 'styled-components';

import FormatStage from './format-stage';

const MetadataStyled = styled.div`
  padding: 0.75em 0 0.25em 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 0.85em;
  color: var(--color-text);
  border-top: 1px solid var(--color-gray300);
  opacity: 0.8;
`;

const DateStyled = styled.p`
  margin: 0;
`;

const Metadata = ({ date, stage }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <MetadataStyled>
      <DateStyled>{formattedDate}</DateStyled>
      <FormatStage stage={stage} />
    </MetadataStyled>
  );
};

export default Metadata;

import React from 'react';
import styled from 'styled-components';

const SummaryStyled = styled.section`
  grid-area: summary;

  p {
    line-height: 1.7;
    width: 95%;
    margin: 1em auto 0 auto;
  }
`;

const Summary = () => {
  return (
    <SummaryStyled>
      <h2>Summary</h2>
      <p>
        Computer science student who is looking to start their journey as a
        Frontend developer. Self-motivated learner with strong organisation,
        time management &amp; communication skills. Able to work independently
        &amp; collaboratively in a team with a meticulous attention to detail.
      </p>
    </SummaryStyled>
  );
};

export default Summary;

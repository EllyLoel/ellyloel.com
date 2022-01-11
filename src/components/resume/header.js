import React from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 15vw;
  margin: 0;

  @media (min-width: 48em) {
    font-size: 7vw;
  }

  @media (min-width: 64em) {
    font-size: 8vw;
  }

  @media (min-width: 90em) {
    font-size: 6vw;
  }

  @media (min-width: 125em) {
    font-size: 4.5vw;
  }

  @media (min-width: 160em) {
    font-size: 4vw;
  }
`;

const Subheading = styled.p`
  font-size: 3.25vw;
  text-align: right;
  margin: 0;
  margin-top: -0.75em;
  text-decoration: underline;
  text-decoration-color: var(--color-primary);
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;

  @media (min-width: 48em) {
    font-size: 1.5vw;
  }

  @media (min-width: 90em) {
    font-size: 1.3vw;
  }

  @media (min-width: 120em) {
    font-size: 1vw;
  }

  @media (min-width: 160em) {
    font-size: 1vw;
  }
`;

const Header = () => {
  return (
    <HeaderStyled>
      <Heading>Elly Loel</Heading>
      <Subheading>Web Developer & Designer</Subheading>
    </HeaderStyled>
  );
};

export default Header;

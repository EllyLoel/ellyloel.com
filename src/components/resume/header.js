import React from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;

  box-shadow: var(--shadow-elevation-low);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover,
  &:focus {
    transform: scale(1.015);
    outline: 1px solid var(--color-primary);
    box-shadow: var(--shadow-elevation-medium);
  }
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

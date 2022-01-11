import React from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  grid-area: header;

  h1 {
    margin: 0;

    font-size: 4rem;
    line-height: 1;
    color: var(--color-text);
    font-family: 'Nanum Pen Script', cursive;

    span {
      margin-left: 3px;
      vertical-align: top;

      font-size: 0.8em;
    }
  }

  p {
    margin-bottom: 0;

    line-height: 1.7;
  }

  @media (min-width: 64em) {
    p {
      max-width: 660px;
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyled>
      <h1>
        My Digital Garden <i className="twa twa-leaf-fluttering-in-wind"></i>
      </h1>
      <p>
        A collection of my ideas that I&apos;m nurturing out in the open. The
        notes range from seedlings, which are fresh out of my mind, to budding,
        which are developing, to evergreen, which are polished ideas.
      </p>
    </HeaderStyled>
  );
};

export default Header;

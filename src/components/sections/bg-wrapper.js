import React from 'react';
import styled, { keyframes } from 'styled-components';

const bgAnimation = keyframes`
		0% { background-position:0% 13% }
		50% { background-position:100% 88% }
		100% { background-position:0% 13% }
`;

const Background = styled.div`
  background: linear-gradient(316deg, var(--bg-blue), var(--bg-purple));
  background-size: 200% 200%;

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  animation: ${bgAnimation} 5s ease infinite;

  z-index: -2;
`;

const Overlay = styled.div`
  background-color: rgb(255, 255, 255);

  width: 100%;
  height: 100vh;

  position: absolute;
  bottom: 0;
  left: 0;

  clip-path: polygon(0 75%, 100% 65%, 100% 100%, 0% 100%);

  z-index: -1;
`;

const BGWrapper = ({ children }) => {
  return (
    <>
      {children}
      <Background />
      <Overlay />
    </>
  );
};

export default BGWrapper;

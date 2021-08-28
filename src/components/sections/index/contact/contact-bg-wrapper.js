import React from 'react';
import styled, { keyframes } from 'styled-components';

const bgAnimation = keyframes`
		0% { background-position:0% 13% }
		50% { background-position:100% 88% }
		100% { background-position:0% 13% }
`;

const ContactBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;

  background: linear-gradient(316deg, var(--bg-blue), var(--bg-purple));
  background-size: 200% 200%;
  animation: ${bgAnimation} 5s ease infinite;
`;

const ContactOverlay = styled.div`
  width: 100%;
  height: 50vh;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;

  background: rgb(255, 255, 255);
  clip-path: polygon(0 40%, 100% 20%, 100% 0, 0 0);
`;

const ContactBGWrapper = ({ children }) => {
  return (
    <>
      {children}
      <ContactBackground />
      <ContactOverlay />
    </>
  );
};

export default ContactBGWrapper;

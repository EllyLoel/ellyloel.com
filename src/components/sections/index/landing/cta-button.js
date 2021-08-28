import React from 'react';
import styled, { keyframes } from 'styled-components';
import { navigate } from 'gatsby';
import { FaAngleDown } from 'react-icons/fa';

const bgAnimation = keyframes`
		0% { background-position:0% 13% }
		50% { background-position:100% 88% }
		100% { background-position:0% 13% }
`;

const Button = styled.button`
  position: absolute;
  z-index: 0;
  bottom: 2.5%;
  height: 50px;
  width: 50px;
  padding-top: 0.5rem;

  border: none;
  border-radius: 50%;

  background-color: var(--accent);
  color: var(--light);
  font-size: 1.25rem;
  cursor: pointer;

  &::before {
    content: 'Explore!';
    display: inline-block;
    width: max-content;
    position: absolute;
    bottom: 125%;
    left: 50%;

    transform: scale(1) translateX(-50%);
    transform-origin: bottom left;
    transition: transform 500ms cubic-bezier(0.57, 2.2, 0.26, 0.99);

    font-weight: bold;
    text-decoration: none;
    padding: 0.5em 1em;
    border-radius: 0.5em;

    background: linear-gradient(316deg, var(--bg-blue), var(--bg-purple));
    background-size: 200% 200%;
    animation: ${bgAnimation} 5s ease infinite;
  }

  &:hover::before {
    transform: scale(1.1) translateX(-50%);
  }
`;

const CTAButton = () => (
  <Button
    className="cta-btn"
    onClick={() => {
      navigate('/#projects');
    }}
  >
    <FaAngleDown />
  </Button>
);

export default CTAButton;

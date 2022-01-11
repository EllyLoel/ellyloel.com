import styled from 'styled-components';

const underlineHoverTransition = `
  transition: color 200ms ease-out;
  position: relative;
  white-space: nowrap;

  &::before,
  &::after {
    position: absolute;
    width: 95%;
    height: 2.5px;
    border-radius: 9999px;
    background: var(--color-primary);
    top: 105%;
    left: 2.5%;
    pointer-events: none;
  }

  &::before {
    content: '';
    transform-origin: 100% 50%;
    transform: scale3d(0, 1, 1);
    transition: transform 0.3s;
  }

  &:hover::before,
  &:focus::before {
    transform-origin: 0% 50%;
    transform: scale3d(1, 1, 1);
  }
`;

export const Link = styled.a`
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;

  ${underlineHoverTransition}

  &:hover,
  &:focus {
    svg {
      color: var(--color-primary);
    }
  }
`;

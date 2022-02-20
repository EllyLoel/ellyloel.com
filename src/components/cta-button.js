import React from 'react';
import { styled, keyframes } from '../../stitches.config';
import { navigate } from 'gatsby';
import { FaAngleDown } from 'react-icons/fa';

const bgAnimation = keyframes({
  '0%': { backgroundPosition: '0% 13%' },
  '50%': { backgroundPosition: '100% 88%' },
  '100%': { backgroundPosition: '0% 13%' },
});

const Button = styled('button', {
  position: 'absolute',
  zIndex: 0,
  height: '50px',
  width: '50px',
  paddingTop: '0.5rem',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-background)',
  fontSize: '1.25rem',
  cursor: 'pointer',

  '& > svg path': {
    fill: 'var(--color-background) !important',
  },

  '&::before': {
    content: "'Explore!'",
    display: 'inline-block',
    width: 'max-content',
    position: 'absolute',
    bottom: '125%',
    left: '50%',
    transform: 'scale(1) translateX(-50%)',
    transformOrigin: 'bottom left',
    transition: 'transform 500ms cubic-bezier(0.57, 2.2, 0.26, 0.99)',
    fontWeight: 'bold',
    textDecoration: 'none',
    padding: '0.5em 1em',
    borderRadius: '0.5em',
    background: 'linear-gradient(316deg, var(--bg-blue), var(--bg-purple))',
    backgroundSize: '200% 200%',
    animation: `${bgAnimation} 5s ease infinite`,
  },

  '&:hover::before': {
    transform: 'scale(1.1) translateX(-50%)',
  },

  variants: {
    position: {
      center: {
        bottom: '2.5%',
        right: 'unset',
      },
      right: {
        bottom: '1.5rem',
        right: '1.5rem',
      },
    },
    flipped: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
    noBefore: {
      true: {
        '&::before': {
          display: 'none',
        },
      },
    },
  },

  defaultVariants: {
    position: 'center',
    flipped: false,
    noBefore: false,
  },
});

const CTAButton = ({ link, noBefore, flipped, position }) => (
  <Button
    className="cta-btn"
    onClick={() => {
      navigate(link);
    }}
    noBefore={noBefore}
    flipped={flipped}
    position={position}
  >
    <FaAngleDown />
  </Button>
);

export default CTAButton;

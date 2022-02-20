import { styled } from '../../stitches.config';

export const Link = styled('a', {
  color: 'var(--color-text)',
  textDecoration: 'none',
  cursor: 'pointer',

  transition: 'color 200ms ease-out',
  position: 'relative',
  whiteSpace: 'nowrap',

  '&::before, &::after': {
    position: 'absolute',
    width: '95%',
    height: '2.5px',
    borderRadius: '9999px',
    background: 'var(--color-primary)',
    top: '105%',
    left: '2.5%',
    pointerEvents: 'none',
  },

  '&::before': {
    content: "''",
    transformOrigin: '100% 50%',
    transform: 'scale3d(0, 1, 1)',
    transition: 'transform 0.3s',
  },

  '&:hover::before, &:focus::before': {
    transformOrigin: '0% 50%',
    transform: 'scale3d(1, 1, 1)',
  },

  '&:hover, &:focus': {
    '& svg': {
      color: 'var(--color-primary)',
    },
  },
});

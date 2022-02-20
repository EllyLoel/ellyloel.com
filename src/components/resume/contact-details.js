import { styled } from '../../../stitches.config';

export const ContactDetails = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, max-content)',
  gridTemplateRows: 'repeat(6, max-content)',
  gap: '1em',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',

  '& svg': {
    display: 'inline',
    verticalAlign: 'top',
    fontSize: '1.125rem',
    color: 'var(--dark)',
    transition: 'color 200ms ease-out',
  },

  '@desktopSmall': {
    gridTemplateColumns: 'repeat(2, max-content)',
    gridTemplateRows: 'repeat(3, max-content)',
  },
});

export const Paragraph = styled('p', {
  lineHeight: 1.15,
});

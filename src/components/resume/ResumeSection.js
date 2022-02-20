import React from 'react';
import { styled } from '../../../stitches.config';

const Section = styled('section', {
  lineHeight: 1.7,
  boxShadow: 'var(--shadow-elevation-low)',
  transition: 'all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',

  '&:hover,  &:focus': {
    transform: 'scale(1.015)',
    outline: '1px solid var(--color-primary)',
    boxShadow: 'var(--shadow-elevation-medium)',
  },

  '&.contact-details': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '&.work-history': {
    '& ul': {
      marginTop: '1.5rem',
      '& li::marker': { color: 'var(--color-primary)' },
    },

    '& blockquote': {
      marginTop: '0',
      marginBottom: '2rem',
      marginLeft: '0.5rem',
      paddingLeft: '0.75rem',
      borderLeft: '2px solid var(--color-primary)',
    },

    '& span': {
      fontWeight: 600,
      textDecorationLine: 'underline',
      textDecorationThickness: 'initial',
      textDecorationStyle: 'initial',
      textUnderlineOffset: '1px',
      textDecorationColor: 'var(--color-primary)',
    },
  },

  '& ul, & li, & p': {
    margin: '0',
  },

  '&.software > ul, &.key-skills > ul': {
    padding: '0 !important',
    marginBottom: '0',
    marginTop: '0',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    listStyleType: 'none',

    '& > li': {
      padding: '0.25rem 0.65rem',
      marginRight: '0.5rem',
      marginTop: '0.5rem',
      borderRadius: '0.5rem',
      color: 'var(--color-background)',
      background: 'var(--color-primary)',

      '&:last-child': {
        marginBottom: '0',
      },
    },
  },
});

const ResumeSection = ({ children, slug }) => (
  <Section css={{ gridArea: slug }} className={slug}>
    {children}
  </Section>
);

export default ResumeSection;

import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  line-height: 1.7;
  grid-area: ${({ slug }) => slug};

  box-shadow: var(--shadow-elevation-low);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover,
  &:focus {
    transform: scale(1.015);
    outline: 1px solid var(--color-primary);
    box-shadow: var(--shadow-elevation-medium);
  }

  &.contact-details {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.work-history {
    & ul {
      margin-top: 1.5rem;
      & li::marker {
        color: var(--color-primary);
      }
    }
    & blockquote {
      margin-top: 0;
      margin-bottom: 2rem;
      margin-left: 0.5rem;
      padding-left: 0.75rem;
      border-left: 2px solid var(--color-primary);
    }
    & span {
      font-weight: 600;
      text-decoration-line: underline;
      text-decoration-thickness: initial;
      text-decoration-style: initial;
      text-underline-offset: 1px;
      text-decoration-color: var(--color-primary);
    }
  }

  & ul,
  & li,
  & p {
    margin: 0;
  }

  &.software > ul,
  &.key-skills > ul {
    padding: 0 !important;
    margin-bottom: 0;
    margin-top: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;

    & > li {
      padding: 0.25rem 0.65rem;
      margin-right: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 0.5rem;
      color: var(--color-background);
      background: var(--color-primary);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const ResumeSection = ({ children, slug }) => (
  <Section slug={slug} className={slug}>
    {children}
  </Section>
);

export default ResumeSection;

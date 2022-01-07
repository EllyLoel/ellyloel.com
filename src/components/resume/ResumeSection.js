import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  line-height: 1.7;
  grid-area: ${(props) => props.slug};

  &.contact-details {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.work-history {
    & ul {
      margin-top: 1.5rem;
      & li::marker {
        color: var(--accent);
      }
    }
    & blockquote {
      margin-top: 0;
      margin-bottom: 2rem;
      margin-left: 0.5rem;
      padding-left: 0.75rem;
      border-left: 2px solid var(--accent);
    }
    & span {
      font-weight: 600;
      text-decoration-line: underline;
      text-decoration-thickness: initial;
      text-decoration-style: initial;
      text-underline-offset: 1px;
      text-decoration-color: var(--accent);
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
      background: var(--accent);

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

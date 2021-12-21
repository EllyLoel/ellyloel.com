import React from 'react';
import styled from 'styled-components';

const WorkHistoryStyled = styled.section`
  grid-area: work-history;

  .mt-1 {
    margin-top: 1.5em;
  }
`;

const Title = styled.span`
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 1px;
  text-decoration-color: var(--accent);
`;

const WorkHistory = () => {
  return (
    <WorkHistoryStyled id="work-history">
      <h2>Work history</h2>
      <ul>
        <li className="mt-1">
          <Title>Junior Developer</Title> at Portable - Sep 2021-Present
          <ul>
            <li>
              Developed web apps for client (VEOHRC, Headspace, etc.) projects
              using a range of web technologies (React, Gatsby, PHP,
              SilverStripe, Docker, etc.) as well as gave talks on
              neurodiversity and landing your first tech job.
            </li>
          </ul>
        </li>
        <li className="mt-1">
          <Title>PC Sales, Support &amp; Service Technician</Title> at
          Aftershock PC Australia - Dec 2020-Jun 2021
          <ul>
            <li>
              Created &amp; finalised sales leads for hundreds of high end
              custom built desktop PC&#39;s, generating thousands of dollars of
              profit.
            </li>
          </ul>
        </li>
        <li className="mt-1">
          <Title>Video Editor &amp; Motion Designer</Title> at Idleglance (
          <em>YouTube Channel</em>) - 2018–2019
          <ul>
            <li>
              Delivered music video edits with audio syncing, motion graphics,
              titles, audio &amp; special effects.
            </li>
          </ul>
        </li>
        <li className="mt-1">
          <Title>Social Media Manager &amp; Content Curator</Title> at Coaching
          Psychology Online - 2017–2018
          <ul>
            <li>
              After consultation with the client I created and edited visual
              communications to be posted on platforms, such as Facebook &amp;
              LinkedIn.
            </li>
          </ul>
        </li>
      </ul>
    </WorkHistoryStyled>
  );
};

export default WorkHistory;

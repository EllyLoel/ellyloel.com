import React from 'react';
import styled from 'styled-components';

import FormatTag from './format-tag';
import FormatStage from './format-stage';

const FiltersStyled = styled.section`
  grid-area: filters;

  display: grid;
  grid-template-areas:
    'tags'
    'stages';
  gap: 1em;
  align-items: center;
  justify-content: center;

  @media (min-width: 48em) {
    grid-template-areas: 'tags stages';
  }
`;

const TagFilter = styled.ul`
  grid-area: tags;

  list-style-type: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75em;
`;

const FormatTagStyled = styled.button`
  appearance: none;
  background: none;
  border: none;
  margin: 0;

  width: fit-content;
  height: fit-content;

  padding: 0.3em 0.5em;

  border-radius: 4px;
  outline: ${({ active }) =>
    active ? '2px solid var(--color-green500)' : '2px solid transparent'};
  outline-offset: 2px;
  background: ${({ active }) =>
    active ? 'var(--color-green300)' : 'var(--color-green500)'};
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    outline: ${({ active }) =>
      active
        ? '2px solid var(--color-green500)'
        : '2px solid var(--color-green300)'};
    cursor: pointer;
  }
`;

const StageFilter = styled.ul`
  grid-area: stages;

  list-style-type: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75em;
`;

const FormatStageStyled = styled.button`
  appearance: none;
  background: none;
  border: none;

  width: fit-content;
  height: fit-content;
  padding: 0.5em 1em 0.5em 0.8em;

  border: 2px solid var(--color-green500);
  border-radius: 9999px;
  transition: all 0.3s ease-in-out;
  background: ${({ active }) =>
    active ? 'var(--color-green300)' : 'var(--color-background)'};

  &:hover,
  &:focus {
    transition: all 0.3s ease-in-out;
    border: 2px solid var(--color-green300);
    cursor: pointer;
  }
`;

const Filters = ({
  tags,
  stages,
  activeTagFilter,
  setActiveTagFilter,
  activeStageFilter,
  setActiveStageFilter,
}) => {
  const handleTagFilterClick = (tag) => {
    if (!activeTagFilter.includes(tag)) {
      setActiveTagFilter((prevActiveStageFilter) => [
        ...prevActiveStageFilter,
        tag,
      ]);
    } else {
      setActiveTagFilter((prevActiveStageFilter) => {
        let index = prevActiveStageFilter.indexOf(tag);

        if (index > -1) {
          prevActiveStageFilter.splice(index, 1);
        }

        return [...prevActiveStageFilter];
      });
    }
  };

  const handleStageFilterClick = (stage) => {
    if (activeStageFilter !== stage) {
      setActiveStageFilter(stage);
    } else {
      setActiveStageFilter('');
    }
  };

  return (
    <FiltersStyled>
      <TagFilter>
        {tags.map((tag, index) => {
          return !tag ? null : (
            <li key={index}>
              <FormatTagStyled
                onClick={() => handleTagFilterClick(tag)}
                active={activeTagFilter.includes(tag) ? true : false}
              >
                <FormatTag
                  tag={tag}
                  active={activeTagFilter.includes(tag) ? true : false}
                />
              </FormatTagStyled>
            </li>
          );
        })}
      </TagFilter>
      <StageFilter>
        {stages.map((stage, index) => (
          <li key={index}>
            <FormatStageStyled
              onClick={() => handleStageFilterClick(stage)}
              active={activeStageFilter.includes(stage) ? true : false}
            >
              <FormatStage
                stage={stage}
                active={activeStageFilter.includes(stage) ? true : false}
              />
            </FormatStageStyled>
          </li>
        ))}
      </StageFilter>
    </FiltersStyled>
  );
};

export default Filters;

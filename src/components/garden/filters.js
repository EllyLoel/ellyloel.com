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

const TagFilter = styled.div`
  grid-area: tags;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25em;
`;

const FormatTagStyled = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.3em 0.5em;

  border-radius: 4px;
  color: ${({ active }) => (active ? 'var(--light)' : 'rgb(101, 116, 34)')};
  background: ${({ active }) =>
    active ? 'rgb(181, 191, 134)' : 'rgb(221, 231, 174)'};
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: rgb(201, 211, 154);
    cursor: pointer;
  }
`;

const StageFilter = styled.div`
  grid-area: stages;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25em;
`;

const FormatStageStyled = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.5em 1em 0.5em 0.8em;

  border: 2px solid #bcd05f;
  border-radius: 9999px;
  transition: all 0.3s ease-in-out;
  background: ${({ active }) => (active ? '#bcd05f' : 'var(--light)')};

  p {
    transition: all 0.3s ease-in-out;
    color: ${({ active }) => (active ? 'var(--light)' : '#99af33')};
  }

  &:hover,
  &:focus {
    transition: all 0.3s ease-in-out;
    border: 2px solid #e0eab6;
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
            <FormatTagStyled
              key={index}
              onClick={() => handleTagFilterClick(tag)}
              active={activeTagFilter.includes(tag) ? true : false}
            >
              <FormatTag tag={tag} />
            </FormatTagStyled>
          );
        })}
      </TagFilter>
      <StageFilter>
        {stages.map((stage, index) => (
          <FormatStageStyled
            key={index}
            onClick={() => handleStageFilterClick(stage)}
            active={activeStageFilter.includes(stage) ? true : false}
          >
            <FormatStage stage={stage} />
          </FormatStageStyled>
        ))}
      </StageFilter>
    </FiltersStyled>
  );
};

export default Filters;

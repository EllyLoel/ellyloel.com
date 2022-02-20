import React from 'react';
import { styled } from '../../../stitches.config';

import FormatTag from './format-tag';
import FormatStage from './format-stage';

const FiltersStyled = styled('section', {
  gridArea: 'filters',

  display: 'grid',
  gridTemplateAreas: `
    'tags'
    'stages'`,
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',

  '@tabletLarge': {
    gridTemplateAreas: "'tags stages'",
  },
});

const TagFilter = styled('ul', {
  gridArea: 'tags',

  padding: 0,
  listStyleType: 'none',

  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.75rem',
});

const FormatTagStyled = styled('button', {
  appearance: 'none',
  border: 'none',
  margin: '0',

  width: 'fit-content',
  height: 'fit-content',

  padding: '0.3em 0.5em',

  borderRadius: '4px',
  outline: '2px solid transparent',
  outlineOffset: '2px',
  background: 'var(--color-green500)',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    transition: 'all 0.3s ease-in-out',
    outline: '2px solid var(--color-green300)',
    cursor: 'pointer',
  },

  variants: {
    active: {
      true: {
        outline: '2px solid var(--color-green500)',
        background: 'var(--color-green300)',
        '&:hover': {
          outline: '2px solid var(--color-green500)',
        },
      },
    },
  },
});

const StageFilter = styled('ul', {
  gridArea: 'stages',

  padding: 0,
  listStyleType: 'none',

  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.75rem',
});

const FormatStageStyled = styled('button', {
  appearance: 'none',
  border: '2px solid var(--color-green500)',

  width: 'fit-content',
  height: 'fit-content',
  padding: '0.5em 1em 0.5em 0.8em',

  borderRadius: '9999px',
  transition: 'all 0.3s ease-in-out',
  background: 'var(--color-background)',

  '&:hover, &:focus': {
    transition: 'all 0.3s ease-in-out',
    border: '2px solid var(--color-green300)',
    cursor: 'pointer',
  },

  variants: {
    active: {
      true: {
        background: 'var(--color-green300)',
      },
    },
  },
});

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

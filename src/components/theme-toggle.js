import React from 'react';
import { styled } from '../../stitches.config';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

import { ThemeContext } from './theme-context';

const Label = styled('label', {
  '& svg': {
    display: 'block',
    cursor: 'pointer',
  },
});

const Checkbox = styled('input', {
  display: 'none',
});

const ThemeToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  return (
    <Label>
      <Checkbox
        type="checkbox"
        checked={colorMode === 'dark'}
        onChange={(ev) => {
          setColorMode(ev.target.checked ? 'dark' : 'light');
        }}
      />{' '}
      {colorMode === 'dark' ? <MdDarkMode /> : <MdLightMode />}
    </Label>
  );
};

export default ThemeToggle;

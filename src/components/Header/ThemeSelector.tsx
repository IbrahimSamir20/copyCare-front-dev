// components/ThemeSwitcher.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, selectTheme } from '@/common/state/theme.state';
import { CiDark, CiLight } from 'react-icons/ci';

const ThemeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div onClick={toggleTheme} className="cursor-pointer text-2xl text-textPrimary">
      {theme === 'light' ? <CiLight /> : <CiDark />}
    </div>
  );
};

export default ThemeSelector;

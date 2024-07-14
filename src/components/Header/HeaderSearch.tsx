import React, { Dispatch, FC, SetStateAction } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useWindowSize } from 'react-use';

interface Props {
  searchMode: boolean;
  setSearchMode: Dispatch<SetStateAction<boolean>>;
  toggleSideBar: () => void;
}

const HeaderSearch: FC<Props> = ({ searchMode, setSearchMode, toggleSideBar }) => {
  const { width } = useWindowSize();
  return (
    <div className="flex flex-grow items-center gap-6">
      {width < 1024 && (
        <svg
          xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer"
          onClick={toggleSideBar}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      )}
      <div
        className="flex cursor-pointer select-none items-center justify-center gap-2"
        onClick={() => setSearchMode(!searchMode)}
      >
        <CiSearch className="text-xl text-textPrimary" />
        <span className="text-gray-400">Search</span>
      </div>
    </div>
  );
};

export default HeaderSearch;

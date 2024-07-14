import { FC, useCallback, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import LanguageSelector from './Header/LanguageSelector';
import ProfileSetting from './Header/ProfileSetting';
import ThemeSelector from './Header/ThemeSelector';
import Notifications from './Header/Notifications';

import GlobalSearch from './Header/GlobalSearch';
import HeaderSearch from './Header/HeaderSearch';

interface Props {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<Props> = ({ showSideBar, setShowSideBar }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [searchMode, setSearchMode] = useState(false);
  const toggleSideBar = useCallback(() => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  }, [setShowSideBar, showSideBar]);
  useClickAway(headerRef, () => setSearchMode(false));

  return (
    <div className="sticky top-0 z-50 mx-0 translate-x-0 px-6 pt-4 backdrop-blur-sm 2.5xl:mx-[5vh]" ref={headerRef}>
      {searchMode ? (
        <GlobalSearch setSearchMode={setSearchMode} />
      ) : (
        <div className="flex items-center justify-between rounded bg-white p-4 shadow-xl">
          <HeaderSearch toggleSideBar={toggleSideBar} searchMode={searchMode} setSearchMode={setSearchMode} />
          <div className="flex items-center gap-6">
            <LanguageSelector />
            <ThemeSelector />
            <Notifications />
            <ProfileSetting />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

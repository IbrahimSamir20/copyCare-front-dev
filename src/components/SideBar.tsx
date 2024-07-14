import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway, useWindowSize } from 'react-use';
import { Link, useLocation, useParams } from '@tanstack/react-router';

import onlyIcon from '@/assets/only_icon.webp';
import useSideBarMenu from '@/hooks/useSideBarMenu';

interface SideBarProps {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const variants = {
  active: {
    transform: 'translateX(0)',
  },
  inactive: {
    transform: 'translateX(-100%)',
  },
};

const SideBar: FC<SideBarProps> = ({ setShowSideBar, showSideBar }) => {
  const { tenant } = useParams({ strict: false });
  const { pathname } = useLocation();
  const { menu } = useSideBarMenu();
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [activePath, setActivePath] = useState(pathname.split('/')[2]);

  const animate = useMemo(() => {
    if (width < 1024 && !showSideBar) return 'inactive';
    else return 'active';
  }, [width, showSideBar]);

  useEffect(() => {
    if (width > 1024) setShowSideBar(false);
  }, [setShowSideBar, width]);

  useClickAway(ref, () => setShowSideBar(false));

  return (
    <motion.div
      variants={variants}
      animate={animate}
      ref={ref}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className="absolute left-0 top-0 z-60 flex h-screen w-64 flex-col bg-white shadow-md lg:static lg:translate-x-0"
    >
      <div className="p-4 pt-6 text-center text-gray-900 transition-all duration-300 ease-in-out">
        <Link className="flex items-center gap-1 text-3xl" to={`/${tenant}`}>
          <span className="text-4xl">C</span>
          <img src={onlyIcon} alt="icon" className="w-10" />
          py Care
        </Link>
      </div>
      <div className="mt-4 flex-grow overflow-auto p-4">
        {menu.map((l) => {
          return (
            <React.Fragment key={l.path}>
              <Link
                className="flex items-center gap-2 rounded-md p-2 text-zinc-700 transition-colors duration-150 ease-linear hover:bg-gray-100"
                to={`/$tenant/${l.path}`}
                params={{ tenant }}
                search={l.search}
                activeProps={{ className: 'bg-indigo-100 text-indigo-800 pointer-events-none' }}
                onClick={() => setActivePath(l.path)}
              >
                <span>{l.icon}</span>
                {l.label}
              </Link>
              <AnimatePresence>
                {activePath === l.path && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                    className="overflow-hidden"
                  >
                    {l?.childMenu?.map((c) => {
                      return (
                        <Link
                          className="text-gray-600"
                          key={c.label}
                          to={`/${tenant}/${l.path}/${c.path}`}
                          activeProps={{ className: 'text-indigo-800' }}
                        >
                          <div className="my-2 cursor-pointer pl-10">{c.label}</div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SideBar;

import { router } from '@/config';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

const menu = [
  { label: 'Setting', value: '/setting' },
  {
    label: 'Logout',
    value: '/logout',
    action: () => {
      localStorage.clear();
      router.navigate({ to: '/' });
    },
  },
];

const ProfileSetting = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  useClickAway(ref, () => setMenuIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <img
        src="https://placehold.co/32x32"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="cursor-pointer rounded-full"
        alt="profile-image"
      />
      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-full mt-4 flex w-36 -translate-x-full flex-col overflow-hidden rounded bg-white shadow-xl"
          >
            {menu.map((l) => {
              return (
                <div
                  key={l.value}
                  onClick={l.action}
                  className={`cursor-pointer px-4 py-2 text-textPrimary transition-colors duration-150 ease-linear hover:bg-gray-100 hover:text-indigo-600`}
                >
                  {l.label}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSetting;

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { useClickAway } from 'react-use';

const notifications = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Español',
    value: 'es',
  },
];

const Notifications = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  useClickAway(ref, () => setMenuIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <CiBellOn className="cursor-pointer text-xl text-textPrimary" onClick={() => setMenuIsOpen(!menuIsOpen)} />
      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-full mt-4 flex w-36 flex-col overflow-hidden rounded bg-white shadow-xl"
          >
            {notifications.map((l) => {
              return (
                <div
                  key={l.value}
                  // onClick={() => i18n.changeLanguage(l.value)}
                  className={`cursor-pointer px-4 py-2 transition-colors duration-150 ease-linear hover:bg-gray-100 hover:text-indigo-600 ${l.value === 'ar' ? 'pointer-events-none bg-indigo-200 text-indigo-700' : 'bg-transparent text-stone-700'}`}
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

export default Notifications;

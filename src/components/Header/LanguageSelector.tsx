import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiMiniLanguage } from 'react-icons/hi2';
import { useClickAway } from 'react-use';

const languages = [
  {
    value: 'ar',
    label: 'العربية',
  },
  {
    value: 'en',
    label: 'English',
  },
];

const LanguageSelector = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useClickAway(ref, () => setMenuIsOpen(false));
  return (
    <div className="relative" ref={ref}>
      <HiMiniLanguage className="cursor-pointer text-xl text-textPrimary" onClick={() => setMenuIsOpen(!menuIsOpen)} />
      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-full mt-4 flex w-36 flex-col overflow-hidden rounded bg-white shadow-xl"
          >
            {languages.map((l) => {
              return (
                <div
                  key={l.value}
                  onClick={() => i18n.changeLanguage(l.value)}
                  className={`cursor-pointer px-4 py-2 transition-colors duration-150 ease-linear hover:bg-gray-100 hover:text-indigo-600 ${i18n.language === l.value ? 'pointer-events-none bg-indigo-200 text-indigo-700' : 'bg-transparent text-stone-700'}`}
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

export default LanguageSelector;

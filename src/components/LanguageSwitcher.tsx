import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiCheck, FiChevronDown } from 'react-icons/fi';

const languages = [
  { code: 'en', name: 'English', shortCode: 'EN' },
  { code: 'zh', name: '中文', shortCode: 'ZH' },
  { code: 'ar', name: 'العربية', shortCode: 'AR', dir: 'rtl' },
  { code: 'fr', name: 'Français', shortCode: 'FR' },
];

const LanguageSwitcher: React.FC<{ variant?: 'light' | 'dark' }> = ({ variant = 'light' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const currentLangObj = languages.find(l => l.code === i18n.language) || languages[0];

  // FIX 1: Robust RTL/Lang listener
  useEffect(() => {
    const dir = currentLangObj.code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', currentLangObj.code);
  }, [i18n.language, currentLangObj.code]);

  const closeDropdown = useCallback((returnFocus = false) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Handle Click Outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) closeDropdown();
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeDropdown]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    closeDropdown(true);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(languages.findIndex(l => l.code === i18n.language));
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent, index: number) => {
    const move = (dir: number) => {
      event.preventDefault();
      setActiveIndex((index + dir + languages.length) % languages.length);
    };

    if (event.key === 'ArrowDown') move(1);
    else if (event.key === 'ArrowUp') move(-1);
    else if (event.key === 'Escape') closeDropdown(true);
    else if (event.key === 'Tab') closeDropdown();
  };

  useEffect(() => {
    if (isOpen && activeIndex !== -1) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  const isDark = variant === 'dark';

  return (
    <div className="relative z-[100]" ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className={`flex h-9 items-center gap-2 px-3 rounded-full transition-all active:scale-95 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-transparent text-gray-700'
          } border`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FiGlobe className="w-3.5 h-3.5 opacity-70" />
        <span className="text-xs font-bold uppercase">{currentLangObj.shortCode}</span>
        <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-1 overflow-hidden"
        >
          {languages.map((lang, i) => (
            <button
              key={lang.code}
              ref={el => optionRefs.current[i] = el}
              role="menuitem"
              onClick={() => changeLanguage(lang.code)}
              onKeyDown={(e) => handleOptionKeyDown(e, i)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${i18n.language === lang.code
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              {lang.name}
              {i18n.language === lang.code && <FiCheck className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
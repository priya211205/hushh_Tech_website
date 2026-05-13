import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiCheck, FiChevronDown } from 'react-icons/fi';

const languages = [
  { code: 'en', name: 'English', shortCode: 'EN' },
  { code: 'zh', name: '中文', shortCode: 'ZH' },
  { code: 'ar', name: 'العربية', shortCode: 'AR' },
  { code: 'fr', name: 'Français', shortCode: 'FR' },
];

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'light' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = 'language-switcher-menu';

  const currentLangObj = languages.find(l => l.code === i18n.language) || languages[0];

  // Sync document direction and language attributes
  useEffect(() => {
    const dir = currentLangObj.code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', currentLangObj.code);
  }, [i18n.language, currentLangObj.code]);

  const closeDropdown = useCallback((returnFocus = false) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (returnFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeDropdown]);

  // Handle keyboard interaction for the trigger
  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(languages.findIndex(l => l.code === i18n.language));
    }
  };

  // Handle keyboard navigation within the menu
  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index + 1) % languages.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index - 1 + languages.length) % languages.length);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeDropdown(true);
    } else if (event.key === 'Tab') {
      closeDropdown();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      i18n.changeLanguage(languages[index].code);
      closeDropdown(true);
    }
  };

  useEffect(() => {
    if (isOpen && activeIndex !== -1) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  const isDark = variant === 'dark';

  return (
    <div className="relative z-[100]" ref={dropdownRef}>
      {/* Language Selector Pill */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className={`group flex h-9 items-center gap-2 px-3 py-1.5 rounded-full transition-all active:scale-95 ${isDark
            ? 'bg-gray-800 active:bg-gray-700 border-gray-700 text-white'
            : 'bg-gray-100 hover:bg-gray-200 border-transparent text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          } border`}
        aria-label="Select language" // CRITICAL: Required for automated tests
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
      >
        <FiGlobe className="w-3.5 h-3.5 opacity-70" />
        <span className="text-xs font-bold uppercase">{currentLangObj.shortCode}</span>
        <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Language options"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-1 z-[200] overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {languages.map((lang, index) => {
            const isSelected = i18n.language === lang.code;
            return (
              <button
                key={lang.code}
                ref={(node) => { optionRefs.current[index] = node; }}
                type="button"
                role="menuitem"
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  closeDropdown(true);
                }}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${isSelected
                    ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                <span>{lang.name}</span>
                {isSelected && <FiCheck className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
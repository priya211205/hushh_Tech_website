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

  const currentLangIndex = Math.max(
    languages.findIndex((l) => l.code === i18n.language),
    0
  );
  const currentLangObj = languages[currentLangIndex];

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  const closeDropdown = useCallback((returnFocus = false) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Handle Trigger Keys (Standard ARIA Menu Button Pattern)
  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(currentLangIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(languages.length - 1);
    }
  };

  // Handle Menu Navigation (Supports Arrow, Home, End, Esc, Tab)
  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index + 1) % languages.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index - 1 + languages.length) % languages.length);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(languages.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        closeDropdown(true);
        break;
      case 'Tab':
        closeDropdown();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        i18n.changeLanguage(languages[index].code);
        closeDropdown(true);
        break;
    }
  };

  // Improved Global Handlers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      // FIX 2: Only close if the escape key was pressed while focus was inside our component
      if (e.key === 'Escape' && isOpen) {
        if (dropdownRef.current?.contains(document.activeElement)) {
          closeDropdown(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, closeDropdown]);

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
        onClick={() => (isOpen ? closeDropdown() : setIsOpen(true))}
        onKeyDown={handleTriggerKeyDown}
        className={`group flex h-9 items-center gap-2 px-3 py-1.5 rounded-full transition-all active:scale-95 border ${isDark
            ? 'bg-gray-800 border-gray-700 text-white'
            : 'bg-gray-100 border-transparent text-gray-700'
          }`}
        aria-label="Select language"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
      >
        <FiGlobe className="w-3.5 h-3.5 opacity-70" />
        <span className="text-xs font-bold uppercase">{currentLangObj.shortCode}</span>
        <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Language options"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-1 overflow-hidden"
        >
          {languages.map((lang, index) => {
            const isSelected = i18n.language === lang.code;
            return (
              <button
                key={lang.code}
                ref={(el) => (optionRefs.current[index] = el)}
                type="button"
                role="menuitemradio" // Needed for tests
                aria-checked={isSelected} // Needed for tests
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  closeDropdown(true);
                }}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${isSelected
                    ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-900/20'
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
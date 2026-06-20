// src/components/common/Autocomplete/Autocomplete.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import Input from '../Input';

export interface AutocompleteOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value: AutocompleteOption | null;
  onChange: (option: AutocompleteOption | null) => void;
  placeholder?: string;
  label?: string;
  emptyMessage?: string;
  className?: string;
}

/**
 * Generic autocomplete/search-select. Used wherever the app needs to
 * search-and-pick from a list: categories, friends, merchants, accounts.
 * Keep this component free of domain logic — pass in `options` shaped
 * as { id, label, description?, icon? } from the calling feature.
 */
const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Search…',
  label,
  emptyMessage = 'No results found',
  className = '',
}) => {
  const [query, setQuery] = useState(value?.label ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter(
      (opt) => opt.label.toLowerCase().includes(q) || opt.description?.toLowerCase().includes(q)
    );
  }, [options, query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery(value?.label ?? '');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const handleSelect = (option: AutocompleteOption) => {
    onChange(option);
    setQuery(option.label);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[highlightedIndex]) {
      e.preventDefault();
      handleSelect(filtered[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);
          if (e.target.value === '') onChange(null);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
      />
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className="absolute z-30 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-[color:var(--color-border-subtle)] bg-bg-raised shadow-raised p-1.5"
          >
            {filtered.length === 0 ? (
              <li className="px-3.5 py-3 text-sm text-[color:var(--color-text-secondary)]">{emptyMessage}</li>
            ) : (
              filtered.map((option, index) => (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={value?.id === option.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    'flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm cursor-pointer transition-colors',
                    index === highlightedIndex
                      ? 'bg-violet-dim text-[color:var(--color-text-primary)]'
                      : 'text-[color:var(--color-text-secondary)]'
                  )}
                >
                  {option.icon && <span className="shrink-0">{option.icon}</span>}
                  <span className="flex flex-col">
                    <span className="font-medium text-[color:var(--color-text-primary)]">{option.label}</span>
                    {option.description && <span className="text-xs opacity-70">{option.description}</span>}
                  </span>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Autocomplete;

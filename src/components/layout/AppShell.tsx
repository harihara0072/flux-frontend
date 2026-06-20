// src/components/layout/AppShell.tsx
import React from 'react';
import { LayoutGrid, Receipt, Users, PiggyBank, Search, Bell, Plus } from 'lucide-react';
import Tabs, { type TabItem } from '../common/Tabs';
import Avatar from '../common/Avatar';
import IconButton from '../common/IconButton';
import Button from '../common/Button';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import type { TabId } from '../../types';
import { currentUser } from '../../lib/mockData';

interface AppShellProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
}

const navItems: TabItem<TabId>[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutGrid size={18} /> },
  { id: 'transactions', label: 'Transactions', icon: <Receipt size={18} /> },
  { id: 'bills', label: 'Bills & Splits', icon: <Users size={18} />, badge: 2 },
  { id: 'budgets', label: 'Budgets', icon: <PiggyBank size={18} /> },
];

const tabLabels: Record<TabId, string> = {
  overview: 'Overview',
  transactions: 'Transactions',
  bills: 'Bills & Splits',
  budgets: 'Budgets',
};

const tabDescriptions: Record<TabId, string> = {
  overview: 'Your full financial picture, at a glance.',
  transactions: 'Every transaction, automatically categorized.',
  bills: 'Split bills with friends and track who owes what.',
  budgets: 'Set limits and watch your spending stay in check.',
};

const AppShell: React.FC<AppShellProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left rail */}
      <aside className="w-rail shrink-0 hidden lg:flex flex-col border-r border-[color:var(--color-border-subtle)] px-4 py-6">
        <div className="flex items-center justify-between px-3 mb-10">
          <Logo size={36} />
        </div>

        <Tabs items={navItems} activeId={activeTab} onChange={onTabChange} orientation="rail" layoutGroupId="rail-indicator" />

        <div className="mt-auto px-3 pt-6 border-t border-[color:var(--color-border-subtle)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[color:var(--color-text-secondary)]">Appearance</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3">
            <Avatar name={currentUser.name} initials={currentUser.initials} size="sm" />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-[color:var(--color-text-primary)] truncate">{currentUser.name}</span>
              <span className="text-xs text-[color:var(--color-text-secondary)] truncate">Personal</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-raised border-t border-[color:var(--color-border-subtle)] px-2 py-2 flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === item.id ? 'text-violet-soft' : 'text-[color:var(--color-text-secondary)]'
            }`}
          >
            {item.icon}
            {item.label.split(' ')[0]}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        <header className="sticky top-0 z-20 bg-bg/80 backdrop-blur-md border-b border-[color:var(--color-border-subtle)]">
          <div className="max-w-content mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 lg:hidden">
              <Logo size={32} markOnly />
            </div>
            <div>
              <h1 className="font-display text-2xl text-[color:var(--color-text-primary)]">{tabLabels[activeTab]}</h1>
              <p className="text-sm text-[color:var(--color-text-secondary)] mt-0.5">{tabDescriptions[activeTab]}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <ThemeToggle />
              </div>
              <div className="hidden md:flex items-center gap-3">
                <IconButton icon={<Search size={18} />} label="Search" />
                <IconButton icon={<Bell size={18} />} label="Notifications" />
                <Button size="md" leftIcon={<Plus size={16} />}>
                  Add transaction
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-content w-full mx-auto px-6 lg:px-10 py-8">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;

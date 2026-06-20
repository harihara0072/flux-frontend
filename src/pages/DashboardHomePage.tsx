// src/pages/DashboardHomePage.tsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppShell from '../components/layout/AppShell';
import OverviewPage from '../features/dashboard/OverviewPage';
import TransactionsPage from '../features/transactions/TransactionsPage';
import BillsPage from '../features/bills/BillsPage';
import BudgetsPage from '../features/budgets/BudgetsPage';
import type { TabId } from '../types';

const pageComponents: Record<TabId, React.FC> = {
  overview: OverviewPage,
  transactions: TransactionsPage,
  bills: BillsPage,
  budgets: BudgetsPage,
};

/**
 * Homepage of the app. Tab state lives here for now (no routing per tab
 * yet) so switching is instant and animated. When real routes are wired
 * up later, this can be swapped for nested <Route> elements without
 * touching the feature pages themselves.
 */
const DashboardHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const ActivePage = pageComponents[activeTab];

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <ActivePage />
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
};

export default DashboardHomePage;

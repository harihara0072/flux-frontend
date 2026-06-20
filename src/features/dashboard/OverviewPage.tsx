// src/features/dashboard/OverviewPage.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Users } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import { FlowBar, TrendChart, StatCard } from '../../components/charts';
import { transactions, spendingByCategory, monthlyTrend, billSplits, currentUser } from '../../lib/mockData';
import { formatCurrency, formatSignedCurrency, formatDate } from '../../lib/utils';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const totalSpent = spendingByCategory.reduce((sum, s) => sum + s.amount, 0);
const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
const recentTransactions = transactions.slice(0, 5);
const pendingSplits = billSplits.filter((b) => b.status !== 'settled');

const OverviewPage: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
      {/* Hero: signature FlowBar */}
      <motion.div variants={itemVariants}>
        <Card padding="lg" variant="raised">
          <FlowBar data={spendingByCategory} total={totalSpent} />
        </Card>
      </motion.div>

      {/* Stat cards row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total balance" value={currentUser.totalBalance} icon={<Wallet size={16} />} accentColor="#6c5ce7" />
        <StatCard label="Income this month" value={totalIncome} changePercent={3.2} icon={<TrendingUp size={16} />} accentColor="#00d9a3" />
        <StatCard label="Spent this month" value={totalSpent} changePercent={-6.4} icon={<TrendingDown size={16} />} accentColor="#ff6b6b" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card padding="lg" className="h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-lg text-[color:var(--color-text-primary)]">Income vs. expenses</h3>
              <div className="flex items-center gap-4 text-xs text-[color:var(--color-text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal" /> Income
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-violet" /> Expenses
                </span>
              </div>
            </div>
            <TrendChart data={monthlyTrend} />
          </Card>
        </motion.div>

        {/* Pending splits */}
        <motion.div variants={itemVariants}>
          <Card padding="lg" className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-[color:var(--color-text-primary)]">Bills to settle</h3>
              <Badge tone="coral" dot>
                {pendingSplits.length} pending
              </Badge>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {pendingSplits.map((bill) => (
                <div key={bill.id} className="flex items-center gap-3 p-3 rounded-xl bg-overlay-faint border border-[color:var(--color-border-subtle)]">
                  <Avatar name={bill.paidBy.name} initials={bill.paidBy.initials} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[color:var(--color-text-primary)] truncate">{bill.title}</p>
                    <p className="text-xs text-[color:var(--color-text-secondary)]">Paid by {bill.paidBy.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium tabular-amount text-[color:var(--color-text-primary)]">
                      {formatCurrency(bill.yourShare)}
                    </p>
                    <Badge tone={bill.status === 'overdue' ? 'coral' : 'amber'} className="mt-1">
                      {bill.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[color:var(--color-border-subtle)] text-sm text-[color:var(--color-text-secondary)]">
              <Users size={14} />
              <span>4 friends connected</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent transactions */}
      <motion.div variants={itemVariants}>
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-[color:var(--color-text-primary)]">Recent transactions</h3>
            <button className="text-sm text-violet-soft hover:text-violet font-medium transition-colors">View all</button>
          </div>
          <div className="flex flex-col">
            {recentTransactions.map((txn, index) => (
              <div
                key={txn.id}
                className={`flex items-center gap-4 py-3.5 ${
                  index !== recentTransactions.length - 1 ? 'border-b border-[color:var(--color-border-subtle)]' : ''
                }`}
              >
                <span
                  className="h-10 w-10 rounded-full flex items-center justify-center text-base shrink-0"
                  style={{ backgroundColor: `${txn.category.colorHex}22` }}
                >
                  {txn.category.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[color:var(--color-text-primary)] truncate">{txn.description}</p>
                  <p className="text-xs text-[color:var(--color-text-secondary)]">
                    {txn.category.name} · {formatDate(txn.date)}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium tabular-amount shrink-0 ${
                    txn.type === 'income' ? 'text-teal' : 'text-[color:var(--color-text-primary)]'
                  }`}
                >
                  {formatSignedCurrency(txn.amount, txn.type)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default OverviewPage;

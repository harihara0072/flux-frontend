// src/features/bills/BillsPage.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Plus, Receipt } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { billSplits, friends } from '../../lib/mockData';
import { formatCurrency, formatDate } from '../../lib/utils';
import type { BadgeTone } from '../../components/common/Badge';
import type { SplitStatus } from '../../types';

const statusTone: Record<SplitStatus, BadgeTone> = {
  settled: 'teal',
  pending: 'amber',
  overdue: 'coral',
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const BillsPage: React.FC = () => {
  const youAreOwed = billSplits
    .filter((b) => b.status !== 'settled' && b.paidBy.id === 'you')
    .reduce((sum, b) => sum + (b.totalAmount - b.yourShare), 0);
  const youOwe = billSplits
    .filter((b) => b.status !== 'settled' && b.paidBy.id !== 'you')
    .reduce((sum, b) => sum + b.yourShare, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card padding="lg" variant="raised">
          <p className="text-sm text-[color:var(--color-text-secondary)]">You owe</p>
          <p className="font-display text-3xl text-coral mt-1.5 tabular-amount">{formatCurrency(youOwe)}</p>
        </Card>
        <Card padding="lg" variant="raised">
          <p className="text-sm text-[color:var(--color-text-secondary)]">You're owed</p>
          <p className="font-display text-3xl text-teal mt-1.5 tabular-amount">{formatCurrency(youAreOwed)}</p>
        </Card>
      </div>

      {/* Friends row */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-[color:var(--color-text-primary)]">Connections</h3>
          <Button variant="ghost" size="sm" leftIcon={<Plus size={14} />}>
            Add friend
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex flex-col items-center gap-2 w-16">
              <Avatar name={friend.name} initials={friend.initials} size="lg" />
              <span className="text-xs text-[color:var(--color-text-secondary)] text-center truncate w-full">
                {friend.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Bill splits list */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-[color:var(--color-text-primary)]">Recent splits</h3>
          <Button size="sm" leftIcon={<Receipt size={14} />}>
            Upload a bill
          </Button>
        </div>

        {billSplits.map((bill) => (
          <motion.div key={bill.id} variants={itemVariants}>
            <Card padding="lg" interactive>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <Avatar name={bill.paidBy.name} initials={bill.paidBy.initials} size="md" />
                  <div className="min-w-0">
                    <p className="font-medium text-[color:var(--color-text-primary)]">{bill.title}</p>
                    <p className="text-sm text-[color:var(--color-text-secondary)] mt-0.5">
                      Paid by {bill.paidBy.name} · {formatDate(bill.date)}
                    </p>
                    <div className="flex items-center -space-x-2 mt-3">
                      {bill.participants.map((p) => (
                        <Avatar key={p.id} name={p.name} initials={p.initials} size="xs" ringed />
                      ))}
                      <span className="text-xs text-[color:var(--color-text-secondary)] ml-3">
                        Split {bill.participants.length} ways
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-xl text-[color:var(--color-text-primary)] tabular-amount">
                    {formatCurrency(bill.totalAmount)}
                  </p>
                  <p className="text-xs text-[color:var(--color-text-secondary)] mt-1 tabular-amount">
                    Your share: {formatCurrency(bill.yourShare)}
                  </p>
                  <Badge tone={statusTone[bill.status]} className="mt-2">
                    {bill.status}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BillsPage;

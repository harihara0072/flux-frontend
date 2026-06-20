// src/features/budgets/BudgetsPage.tsx
import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Pencil, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import IconButton from '../../components/common/IconButton';
import { budgetLimits as initialBudgets } from '../../lib/mockData';
import { formatCurrency } from '../../lib/utils';
import type { BudgetLimit } from '../../types';

function deriveStatus(value: number, max: number) {
  if (max <= 0) return 'on-track' as const;
  const ratio = value / max;
  if (ratio >= 1) return 'exceeded' as const;
  if (ratio >= 0.85) return 'approaching' as const;
  return 'on-track' as const;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<BudgetLimit[]>(initialBudgets);
  const [editingBudget, setEditingBudget] = useState<BudgetLimit | null>(null);
  const [draftLimit, setDraftLimit] = useState('');

  const exceededCount = budgets.filter((b) => deriveStatus(b.spentAmount, b.limitAmount) === 'exceeded').length;

  const openEdit = (budget: BudgetLimit) => {
    setEditingBudget(budget);
    setDraftLimit(String(budget.limitAmount));
  };

  const saveLimit = () => {
    if (!editingBudget) return;
    const parsed = parseFloat(draftLimit);
    if (Number.isNaN(parsed) || parsed <= 0) return;
    setBudgets((prev) => prev.map((b) => (b.id === editingBudget.id ? { ...b, limitAmount: parsed } : b)));
    setEditingBudget(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {exceededCount > 0 && (
        <Card padding="md" className="flex items-center gap-3 border-coral/30 bg-coral-dim">
          <AlertTriangle size={18} className="text-coral shrink-0" />
          <p className="text-sm text-[color:var(--color-text-primary)]">
            {exceededCount} {exceededCount === 1 ? 'category is' : 'categories are'} over its monthly limit.
          </p>
        </Card>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {budgets.map((budget) => {
          const status = deriveStatus(budget.spentAmount, budget.limitAmount);
          const remaining = budget.limitAmount - budget.spentAmount;

          return (
            <motion.div key={budget.id} variants={itemVariants}>
              <Card padding="lg" className="h-full flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-10 w-10 rounded-full flex items-center justify-center text-base shrink-0"
                      style={{ backgroundColor: `${budget.category.colorHex}22` }}
                    >
                      {budget.category.icon}
                    </span>
                    <div>
                      <p className="font-medium text-[color:var(--color-text-primary)]">{budget.category.name}</p>
                      <p className="text-xs text-[color:var(--color-text-secondary)] capitalize">{budget.period} limit</p>
                    </div>
                  </div>
                  <IconButton icon={<Pencil size={14} />} label={`Edit ${budget.category.name} limit`} onClick={() => openEdit(budget)} />
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm tabular-amount text-[color:var(--color-text-primary)] font-medium">
                      {formatCurrency(budget.spentAmount)}
                      <span className="text-[color:var(--color-text-secondary)] font-normal"> of {formatCurrency(budget.limitAmount)}</span>
                    </span>
                    {status === 'exceeded' && <Badge tone="coral">Exceeded</Badge>}
                    {status === 'approaching' && <Badge tone="amber">Approaching</Badge>}
                    {status === 'on-track' && <Badge tone="teal">On track</Badge>}
                  </div>
                  <ProgressBar value={budget.spentAmount} max={budget.limitAmount} status={status} />
                  <p className="text-xs text-[color:var(--color-text-secondary)] mt-2">
                    {remaining >= 0
                      ? `${formatCurrency(remaining)} remaining this period`
                      : `${formatCurrency(Math.abs(remaining))} over budget`}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <Modal
        isOpen={!!editingBudget}
        onClose={() => setEditingBudget(null)}
        title={editingBudget ? `Edit ${editingBudget.category.name} limit` : ''}
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditingBudget(null)}>
              Cancel
            </Button>
            <Button onClick={saveLimit}>Save limit</Button>
          </>
        }
      >
        <Input
          label="Monthly limit"
          type="number"
          min="0"
          step="0.01"
          value={draftLimit}
          onChange={(e) => setDraftLimit(e.target.value)}
          leftIcon={<span className="text-sm">$</span>}
        />
      </Modal>
    </div>
  );
};

export default BudgetsPage;

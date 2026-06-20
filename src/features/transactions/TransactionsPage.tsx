// src/features/transactions/TransactionsPage.tsx
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Autocomplete, { type AutocompleteOption } from '../../components/common/Autocomplete';
import { transactions as initialTransactions, categories } from '../../lib/mockData';
import { formatSignedCurrency, formatDate } from '../../lib/utils';
import type { Transaction } from '../../types';

const categoryOptions: AutocompleteOption[] = categories.map((c) => ({
  id: c.id,
  label: c.name,
  icon: <span>{c.icon}</span>,
}));

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = search.toLowerCase();
    return transactions.filter(
      (t) => t.description.toLowerCase().includes(q) || t.category.name.toLowerCase().includes(q)
    );
  }, [transactions, search]);

  const handleReassign = (transactionId: string, option: AutocompleteOption | null) => {
    if (!option) return;
    const newCategory = categories.find((c) => c.id === option.id);
    if (!newCategory) return;
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, category: newCategory } : t))
    );
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search transactions or categories…"
            leftIcon={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[color:var(--color-border-subtle)] text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] hover:bg-overlay-soft transition-colors">
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      <Card padding="none">
        <div className="divide-y divide-[color:var(--color-border-subtle)]">
          <AnimatePresence initial={false}>
            {filtered.map((txn) => (
              <motion.div
                key={txn.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4 px-5 py-4"
              >
                <span
                  className="h-10 w-10 rounded-full flex items-center justify-center text-base shrink-0"
                  style={{ backgroundColor: `${txn.category.colorHex}22` }}
                >
                  {txn.category.icon}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[color:var(--color-text-primary)] truncate">{txn.description}</p>
                  <p className="text-xs text-[color:var(--color-text-secondary)]">{formatDate(txn.date)}</p>
                </div>

                <div className="hidden sm:block w-48 shrink-0">
                  {editingId === txn.id ? (
                    <Autocomplete
                      options={categoryOptions}
                      value={categoryOptions.find((o) => o.id === txn.category.id) ?? null}
                      onChange={(option) => handleReassign(txn.id, option)}
                      placeholder="Reassign category…"
                    />
                  ) : (
                    <button onClick={() => setEditingId(txn.id)} className="w-full text-left">
                      <Badge tone="neutral" className="hover:bg-overlay-strong transition-colors cursor-pointer">
                        {txn.category.name}
                      </Badge>
                    </button>
                  )}
                </div>

                <span
                  className={`text-sm font-medium tabular-amount shrink-0 w-24 text-right ${
                    txn.type === 'income' ? 'text-teal' : 'text-[color:var(--color-text-primary)]'
                  }`}
                >
                  {formatSignedCurrency(txn.amount, txn.type)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-[color:var(--color-text-secondary)]">
              No transactions match "{search}".
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TransactionsPage;

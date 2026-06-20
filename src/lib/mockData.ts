// src/lib/mockData.ts
// Placeholder data so the new UI can be reviewed end-to-end before the
// real API integration lands. Each feature page reads from here for now;
// swapping to live data later means replacing these calls with API hooks,
// not restructuring the components.

import type {
  Category,
  Transaction,
  BudgetLimit,
  Friend,
  BillSplit,
  SpendingByCategory,
  MonthlyTrendPoint,
} from '../types';

export const categories: Category[] = [
  { id: 'cat-housing', name: 'Housing', icon: '🏠', colorHex: '#6c5ce7', isGlobal: true },
  { id: 'cat-food', name: 'Food & Drink', icon: '🍔', colorHex: '#00d9a3', isGlobal: true },
  { id: 'cat-transport', name: 'Transportation', icon: '🚗', colorHex: '#5b9eff', isGlobal: true },
  { id: 'cat-shopping', name: 'Shopping', icon: '🛍️', colorHex: '#ff8fc7', isGlobal: true },
  { id: 'cat-utilities', name: 'Utilities', icon: '💡', colorHex: '#ffb84d', isGlobal: true },
  { id: 'cat-entertainment', name: 'Entertainment', icon: '🎬', colorHex: '#ff6b6b', isGlobal: true },
  { id: 'cat-income', name: 'Income', icon: '💰', colorHex: '#00d9a3', isGlobal: true },
];

const cat = (id: string) => categories.find((c) => c.id === id)!;

export const transactions: Transaction[] = [
  { id: 't1', amount: 2400, description: 'Rent — November', merchant: 'Maple Court Apartments', date: '2026-06-01', type: 'expense', category: cat('cat-housing') },
  { id: 't2', amount: 86.42, description: 'Whole Foods Market', merchant: 'Whole Foods', date: '2026-06-15', type: 'expense', category: cat('cat-food') },
  { id: 't3', amount: 5200, description: 'Paycheck', merchant: 'Acme Corp', date: '2026-06-14', type: 'income', category: cat('cat-income') },
  { id: 't4', amount: 42.0, description: 'Uber ride', merchant: 'Uber', date: '2026-06-13', type: 'expense', category: cat('cat-transport') },
  { id: 't5', amount: 129.99, description: 'New running shoes', merchant: 'Nike', date: '2026-06-12', type: 'expense', category: cat('cat-shopping') },
  { id: 't6', amount: 64.5, description: 'Electric bill', merchant: 'City Power & Light', date: '2026-06-10', type: 'expense', category: cat('cat-utilities') },
  { id: 't7', amount: 15.99, description: 'Netflix', merchant: 'Netflix', date: '2026-06-09', type: 'expense', category: cat('cat-entertainment') },
  { id: 't8', amount: 38.2, description: 'Trader Joe\'s', merchant: "Trader Joe's", date: '2026-06-08', type: 'expense', category: cat('cat-food') },
  { id: 't9', amount: 9.5, description: 'Coffee', merchant: 'Blue Bottle', date: '2026-06-07', type: 'expense', category: cat('cat-food') },
  { id: 't10', amount: 220.0, description: 'Car insurance', merchant: 'Geico', date: '2026-06-05', type: 'expense', category: cat('cat-transport') },
];

export const budgetLimits: BudgetLimit[] = [
  { id: 'b1', category: cat('cat-housing'), limitAmount: 2500, spentAmount: 2400, period: 'monthly' },
  { id: 'b2', category: cat('cat-food'), limitAmount: 500, spentAmount: 460, period: 'monthly' },
  { id: 'b3', category: cat('cat-transport'), limitAmount: 300, spentAmount: 262, period: 'monthly' },
  { id: 'b4', category: cat('cat-shopping'), limitAmount: 200, spentAmount: 129.99, period: 'monthly' },
  { id: 'b5', category: cat('cat-utilities'), limitAmount: 150, spentAmount: 64.5, period: 'monthly' },
  { id: 'b6', category: cat('cat-entertainment'), limitAmount: 60, spentAmount: 75.5, period: 'monthly' },
];

export const friends: Friend[] = [
  { id: 'f1', name: 'Priya Patel', initials: 'PP' },
  { id: 'f2', name: 'Jordan Lee', initials: 'JL' },
  { id: 'f3', name: 'Sam Okafor', initials: 'SO' },
  { id: 'f4', name: 'Maya Chen', initials: 'MC' },
];

export const billSplits: BillSplit[] = [
  {
    id: 'bill1',
    title: 'Dinner at Nocturne',
    totalAmount: 186.4,
    date: '2026-06-15',
    paidBy: friends[0],
    participants: [friends[0], friends[1], friends[2]],
    yourShare: 62.13,
    status: 'pending',
  },
  {
    id: 'bill2',
    title: 'Weekend cabin trip',
    totalAmount: 840.0,
    date: '2026-06-10',
    paidBy: friends[3],
    participants: friends,
    yourShare: 210.0,
    status: 'overdue',
  },
  {
    id: 'bill3',
    title: 'Concert tickets',
    totalAmount: 240.0,
    date: '2026-05-28',
    paidBy: friends[1],
    participants: [friends[1], friends[2]],
    yourShare: 120.0,
    status: 'settled',
  },
];

export const spendingByCategory: SpendingByCategory[] = (() => {
  const totals = new Map<string, number>();
  let grandTotal = 0;
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      totals.set(t.category.id, (totals.get(t.category.id) ?? 0) + t.amount);
      grandTotal += t.amount;
    });
  return Array.from(totals.entries())
    .map(([categoryId, amount]) => ({
      category: cat(categoryId),
      amount,
      percentage: (amount / grandTotal) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);
})();

export const monthlyTrend: MonthlyTrendPoint[] = [
  { month: 'Jan', income: 5200, expense: 3650 },
  { month: 'Feb', income: 5200, expense: 3890 },
  { month: 'Mar', income: 5400, expense: 4120 },
  { month: 'Apr', income: 5200, expense: 3580 },
  { month: 'May', income: 5300, expense: 4310 },
  { month: 'Jun', income: 5200, expense: 3392 },
];

export const currentUser = {
  name: 'Alex Rivera',
  initials: 'AR',
  totalBalance: 18420.55,
};

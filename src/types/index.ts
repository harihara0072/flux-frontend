// src/types/index.ts

export type TransactionType = 'expense' | 'income';

export interface Category {
  id: string;
  name: string;
  icon: string;
  colorHex: string;
  isGlobal: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  merchant?: string;
  date: string; // ISO date
  type: TransactionType;
  category: Category;
  account?: string;
}

export interface BudgetLimit {
  id: string;
  category: Category;
  limitAmount: number;
  spentAmount: number;
  period: 'monthly' | 'weekly';
}

export type BudgetStatus = 'on-track' | 'approaching' | 'exceeded';

export interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
}

export type SplitStatus = 'settled' | 'pending' | 'overdue';

export interface BillSplit {
  id: string;
  title: string;
  totalAmount: number;
  date: string;
  paidBy: Friend;
  participants: Friend[];
  yourShare: number;
  status: SplitStatus;
}

export interface SpendingByCategory {
  category: Category;
  amount: number;
  percentage: number;
}

export interface MonthlyTrendPoint {
  month: string;
  income: number;
  expense: number;
}

export type TabId = 'overview' | 'transactions' | 'bills' | 'budgets';

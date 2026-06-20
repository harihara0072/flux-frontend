// src/components/charts/TrendChart.tsx
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { MonthlyTrendPoint } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface TrendChartProps {
  data: MonthlyTrendPoint[];
}

interface TrendTooltipPayloadEntry {
  dataKey: 'income' | 'expense';
  value: number;
  color: string;
}

const CustomTooltip: React.FC<{ active?: boolean; payload?: TrendTooltipPayloadEntry[]; label?: string }> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-raised border border-[color:var(--color-border-subtle)] rounded-lg px-3.5 py-2.5 shadow-raised text-sm">
      <p className="text-[color:var(--color-text-secondary)] text-xs mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="tabular-amount font-medium" style={{ color: entry.color }}>
          {entry.dataKey === 'income' ? 'Income' : 'Expenses'}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d9a3" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#00d9a3" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: '#8a8f9c', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: '#8a8f9c', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <RechartsTooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#00d9a3"
            strokeWidth={2}
            fill="url(#incomeGradient)"
            animationDuration={900}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#6c5ce7"
            strokeWidth={2}
            fill="url(#expenseGradient)"
            animationDuration={900}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;

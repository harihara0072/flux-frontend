// src/lib/utils.ts

/**
 * Lightweight className combiner. Filters falsy values so conditional
 * classes can be expressed as `cn(base, isActive && 'active')`.
 */
export function cn(...classes: Array<string | boolean | null | undefined>): string {
  return classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ');
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatSignedCurrency(amount: number, type: 'expense' | 'income'): string {
  const sign = type === 'income' ? '+' : '−';
  return `${sign}${currencyFormatter.format(Math.abs(amount))}`;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

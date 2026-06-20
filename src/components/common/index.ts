// src/components/common/index.ts
// Single import surface for the reusable component library.
// Feature code should prefer `import { Button, Card } from '@/components/common'`
// over reaching into individual component folders.

export { default as Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { default as IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';

export { default as Card } from './Card';
export type { CardProps } from './Card';

export { default as Tabs } from './Tabs';
export type { TabsProps, TabItem } from './Tabs';

export { default as Badge } from './Badge';
export type { BadgeProps, BadgeTone } from './Badge';

export { default as Avatar } from './Avatar';
export type { AvatarProps } from './Avatar';

export { default as ProgressBar } from './ProgressBar';
export type { ProgressBarProps } from './ProgressBar';

export { default as Input } from './Input';
export type { InputProps } from './Input';

export { default as Autocomplete } from './Autocomplete';
export type { AutocompleteProps, AutocompleteOption } from './Autocomplete';

export { default as Logo } from './Logo';
export type { LogoProps } from './Logo';

export { default as Modal } from './Modal';
export type { ModalProps } from './Modal';

export { default as ThemeToggle } from './ThemeToggle';
export type { ThemeToggleProps } from './ThemeToggle';

export { default as Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { default as Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

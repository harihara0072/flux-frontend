// src/utils/cn.ts
// Simple className utility function for better readability and maintainability
// No external dependencies - production ready

type ClassValue = string | boolean | null | undefined;

/**
 * Combines class names into a single string, filtering out falsy values
 * @param classes - Variable number of class name arguments
 * @returns Combined class string
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .filter((cls): cls is string => Boolean(cls))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}


// src/components/common/Logo/Logo.tsx
import React from 'react';

export interface LogoProps {
  /** Pixel height of the mark; width scales to match the source aspect ratio. */
  size?: number;
  /** When true, crops to just the scribble mark (no wordmark) — for tight spaces like a mobile header. */
  markOnly?: boolean;
  className?: string;
  /** Accessible label. Pass '' to hide from screen readers when paired with adjacent text. */
  title?: string;
}

/**
 * Flux's hand-drawn "scribble" logo mark + wordmark, recolored to the
 * app's violet accent (originally supplied in emerald green). Strokes
 * reference theme CSS variables so the mark adapts automatically
 * between light and dark mode rather than needing a separate asset.
 */
const Logo: React.FC<LogoProps> = ({ size = 40, markOnly = false, className = '', title = 'Flux' }) => {
  // Full lockup is 400x150. The scribble mark alone occupies roughly
  // the left third (x: 0–170); cropping the viewBox to that range gives
  // a mark-only variant without needing a second SVG asset.
  const viewBox = markOnly ? '0 0 170 150' : '0 0 400 150';
  const sourceWidth = markOnly ? 170 : 400;
  const height = size;
  const width = (size * sourceWidth) / 150;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <style>
          {`
            .flux-scribble-primary {
              stroke: var(--color-violet);
              stroke-width: 4;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
            }
            .flux-scribble-accent {
              stroke: var(--color-violet-soft);
              stroke-width: 3;
              stroke-linecap: round;
              stroke-linejoin: round;
              opacity: 0.8;
              fill: none;
            }
            .flux-scribble-text {
              stroke: var(--color-text-primary);
              stroke-width: 3.5;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
            }
          `}
        </style>
      </defs>
      <g transform="translate(40, 35)">
        <path className="flux-scribble-primary" d="M10 70 C 10 70, 30 80, 50 60 C 70 40, 60 20, 80 20 C 95 20, 110 35, 125 15" />
        <path className="flux-scribble-primary" d="M110 15 L 125 15 L 120 30" />
        <path className="flux-scribble-accent" d="M12 73 C 15 75, 35 85, 55 65 C 75 45, 55 15, 85 18 C 100 19, 115 30, 130 10" />
        <path className="flux-scribble-accent" d="M8 68 C 8 68, 25 75, 45 55 C 65 35, 68 25, 78 23 C 90 21, 105 38, 122 18" />
        <path className="flux-scribble-accent" d="M115 10 L 132 12 L 125 35" />
      </g>
      {!markOnly && (
        <g transform="translate(140, 95)">
          <path className="flux-scribble-text" d="M25 0 C 25 0, 10 5, 10 25 L 10 55 M 0 25 L 20 25" />
          <path className="flux-scribble-text" d="M45 -5 L 45 55" />
          <path className="flux-scribble-text" d="M65 15 L 65 45 C 65 55, 75 55, 85 45 L 85 15 L 85 55" />
          <path className="flux-scribble-text" d="M105 15 L 135 55 M 135 15 L 105 55" />
        </g>
      )}
    </svg>
  );
};

export default Logo;

// src/components/ui/Logo.tsx
import React from 'react';

interface LogoProps {
  width?: string;
  height?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = "400", height = "150", className = "" }) => {
  return (
      <svg
          width={width}
          height={height}
          viewBox="0 0 400 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
      >
          {/* Background fill is unnecessary as the main app background handles it */}
          {/* <rect width="400" height="150" fill="#fcfcfc"/> */}
          <defs>
              <style>
                  {`
              .scribble-primary {
                  stroke: #059669; /* brand-primary */
                  stroke-width: 4;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  fill: none;
              }
              .scribble-accent {
                  stroke: #10b981; /* brand-accent */
                  stroke-width: 3;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  opacity: 0.8;
                  fill: none;
              }
              .scribble-text {
                  stroke: #333333; /* dark-text */
                  stroke-width: 3.5;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  fill: none;
              }
              `}
              </style>
          </defs>

          <g transform="translate(40, 35)">
              <path className="scribble-primary"
                    d="M10 70 C 10 70, 30 80, 50 60 C 70 40, 60 20, 80 20 C 95 20, 110 35, 125 15"/>
              <path className="scribble-primary" d="M110 15 L 125 15 L 120 30"/>

              <path className="scribble-accent"
                    d="M12 73 C 15 75, 35 85, 55 65 C 75 45, 55 15, 85 18 C 100 19, 115 30, 130 10"/>
              <path className="scribble-accent"
                    d="M8 68 C 8 68, 25 75, 45 55 C 65 35, 68 25, 78 23 C 90 21, 105 38, 122 18"/>
              <path className="scribble-accent" d="M115 10 L 132 12 L 125 35"/>
          </g>

          <g transform="translate(140, 95)">
              <path className="scribble-text" d="M25 0 C 25 0, 10 5, 10 25 L 10 55 M 0 25 L 20 25"/>
              <path className="scribble-text" d="M45 -5 L 45 55"/>
              <path className="scribble-text" d="M65 15 L 65 45 C 65 55, 75 55, 85 45 L 85 15 L 85 55"/>
              <path className="scribble-text" d="M105 15 L 135 55 M 135 15 L 105 55"/>
          </g>
      </svg>
  );
};

export default Logo;
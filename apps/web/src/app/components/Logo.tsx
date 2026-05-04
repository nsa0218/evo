import React from 'react';

interface LogoProps {
  size?: number;
  showTagline?: boolean;
  mono?: boolean;
}

const LogoMark: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="evomGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0B1F3A" />
        <stop offset="0.55" stopColor="#1B3766" />
        <stop offset="1" stopColor="#1AA8A1" />
      </linearGradient>
    </defs>
    {/* pin/teardrop outline */}
    <path
      d="M32 4 C46 4 56 14 56 28 C56 42 44 54 32 60 C20 54 8 42 8 28 C8 14 18 4 32 4 Z"
      stroke="url(#evomGrad)"
      strokeWidth="3.5"
      strokeLinejoin="round"
      fill="none"
    />
    {/* house */}
    <path
      d="M18 34 L18 46 L46 46 L46 34 L32 22 Z"
      stroke="url(#evomGrad)"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
    {/* E inside */}
    <path
      d="M24 30 L24 42 M24 30 L30 30 M24 36 L29 36 M24 42 L30 42"
      stroke="url(#evomGrad)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* window */}
    <rect x="34" y="32" width="6" height="6" rx="1" stroke="url(#evomGrad)" strokeWidth="2" fill="none" />
  </svg>
);

const Logo: React.FC<LogoProps> = ({ size = 32, showTagline = false, mono = false }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <LogoMark size={size} />
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size * 0.78,
        letterSpacing: '-0.02em',
        color: mono ? 'currentColor' : 'var(--navy-900)',
      }}>
        <span>evom</span>
        <span style={{
          color: mono ? 'currentColor' : 'var(--teal-500)',
        }}>stay</span>
      </div>
      {showTagline && (
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 9,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--slate-500)',
          marginTop: 4,
        }}>
          eviniz gibi, güvenle kalın
        </div>
      )}
    </div>
  </div>
);

export default Logo;
import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Icon from './Icon';

interface TopBarProps {
  role?: string;
  onRoleChange?: (role: string) => void;
  scrolled?: boolean;
  transparent?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  role = 'guest',
  onRoleChange,
  scrolled = false,
  transparent = false
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const bg = transparent ? 'transparent' : (scrolled ? 'var(--paper)' : 'transparent');
  const border = scrolled ? '1px solid var(--slate-200)' : '1px solid transparent';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: bg,
      backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
      borderBottom: border,
      transition: 'all .25s ease',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '18px 36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Logo size={32} />
        </Link>

        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--slate-700)'
        }}>
          <a style={{ cursor: 'pointer' }}>Stays</a>
          <a style={{ cursor: 'pointer' }}>Experiences</a>
          <a style={{ cursor: 'pointer' }}>Long stays</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn btn-ghost" style={{ fontSize: 14, padding: '8px 14px' }}>
            Become a host
          </button>
          <button className="btn btn-ghost" style={{ padding: 8, borderRadius: 999 }}>
            <Icon name="bell" size={20} />
          </button>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 8px 6px 14px',
              border: '1px solid var(--slate-200)',
              borderRadius: 999,
              background: 'var(--paper)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <Icon name="menu" size={16} />
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: 'var(--slate-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--slate-700)',
              fontSize: 12,
              fontWeight: 600,
            }}>
              {role === 'guest' ? 'G' : role === 'host' ? 'H' : 'A'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
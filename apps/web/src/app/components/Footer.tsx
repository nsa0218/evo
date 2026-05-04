import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

interface FooterProps {
  compact?: boolean;
}

const Footer: React.FC<FooterProps> = ({ compact = false }) => (
  <footer style={{
    background: 'var(--navy-900)',
    color: 'white',
    padding: compact ? '40px 36px' : '64px 36px 48px',
    marginTop: 64,
  }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
        gap: 36
      }}>
        <div>
          <Logo size={28} mono />
          <div style={{
            maxWidth: 280,
            marginTop: 16,
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6
          }}>
            Eviniz gibi, güvenle kalın. A members-only platform for verified hosts and guests.
          </div>
        </div>
        {[
          { h: 'Stay', l: ['Find a stay', 'Long stays', 'Categories', 'Verified hosts'] },
          { h: 'Host', l: ['List your space', 'Hosting tools', 'Insurance', 'Help centre'] },
          { h: 'Company', l: ['About', 'Newsroom', 'Careers', 'Investors'] },
          { h: 'Legal', l: ['Terms', 'Privacy', 'Cookies', 'KVKK'] },
        ].map(c => (
          <div key={c.h}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)'
            }}>
              {c.h}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginTop: 14
            }}>
              {c.l.map(x => (
                <Link
                  key={x}
                  href="#"
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textDecoration: 'none',
                    opacity: 0.85
                  }}
                >
                  {x}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        color: 'rgba(255,255,255,0.55)'
      }}>
        <div>© 2026 evomstay · İstanbul</div>
        <div>EN · USD</div>
      </div>
    </div>
  </footer>
);

export default Footer;
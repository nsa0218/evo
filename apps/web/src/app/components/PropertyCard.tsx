import React, { useState } from 'react';
import Icon from './Icon';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  img: string;
  host?: {
    name: string;
    verified: boolean;
    super: boolean;
  };
  tags?: string[];
}

interface PropertyCardProps {
  p: Property;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ p, size = 'md', onClick }) => {
  const [favored, setFavored] = useState(false);
  const heights = { sm: 220, md: 280, lg: 360 };

  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        height: heights[size],
        background: `center/cover no-repeat url(${p.img})`,
        boxShadow: 'var(--shadow-sm)',
      }}>
        {p.host?.super && (
          <span className="glass-strong" style={{
            position: 'absolute',
            top: 14,
            left: 14,
            padding: '6px 12px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--ink)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Guest favourite
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavored(!favored);
          }}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            borderRadius: 999,
            border: 0,
            cursor: 'pointer',
            background: 'rgba(15, 23, 42, 0.32)',
            backdropFilter: 'blur(8px)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: favored ? '#FF385C' : 'white',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favored ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20s-7-4.5-9-9.5C1.5 6 5 3 8 4.5c1.6.8 2.5 2 4 4 1.5-2 2.4-3.2 4-4 3-1.5 6.5 1.5 5 6-2 5-9 9.5-9 9.5Z" />
          </svg>
        </button>
        {/* dot indicators */}
        <div style={{
          position: 'absolute',
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4
        }}>
          {[0, 1, 2, 3, 4].map(i => (
            <span key={i} style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: i === 0 ? 'white' : 'rgba(255,255,255,0.5)',
            }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 4px 0' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 12
        }}>
          <div style={{
            fontWeight: 600,
            fontSize: 15,
            lineHeight: 1.3,
            letterSpacing: '-0.01em'
          }}>
            {p.title}
          </div>
          <StarRating value={p.rating} size={13} />
        </div>
        <div style={{ color: 'var(--slate-500)', fontSize: 14, marginTop: 4 }}>
          {p.location}
        </div>
        <div style={{ marginTop: 8, fontSize: 14 }}>
          <span style={{ fontWeight: 600 }}>${p.price.toLocaleString()}</span>
          <span style={{ color: 'var(--slate-500)' }}> / night</span>
        </div>
      </div>
    </div>
  );
};

const StarRating: React.FC<{ value: number; size?: number; showNumber?: boolean; count?: number }> = ({
  value = 4.9,
  size = 14,
  showNumber = true,
  count
}) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    color: 'var(--ink)',
    fontSize: 13,
    fontWeight: 600
  }}>
    <span style={{ color: '#111', display: 'inline-flex' }}>
      <Icon name="starFilled" size={size} stroke="#111" />
    </span>
    {showNumber && <span>{value.toFixed(2)}</span>}
    {count != null && (
      <span style={{ color: 'var(--slate-500)', fontWeight: 500 }}>
        ({count})
      </span>
    )}
  </div>
);

export default PropertyCard;
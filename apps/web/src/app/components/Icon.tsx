import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 20, stroke = 'currentColor', strokeWidth = 1.7 }) => {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M15 20c0-2.5 1.5-5 4-5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
    heart: <><path d="M12 20s-7-4.5-9-9.5C1.5 6 5 3 8 4.5c1.6.8 2.5 2 4 4 1.5-2 2.4-3.2 4-4 3-1.5 6.5 1.5 5 6-2 5-9 9.5-9 9.5Z" /></>,
    star: <><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1.1 6.2L12 17l-5.5 3 1.1-6.2L3.2 9.5l6.1-.9z"/></>,
    starFilled: <><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1.1 6.2L12 17l-5.5 3 1.1-6.2L3.2 9.5l6.1-.9z" fill="currentColor" /></>,
    chevronLeft: <><path d="m15 6-6 6 6 6"/></>,
    chevronRight: <><path d="m9 6 6 6-6 6"/></>,
    chevronDown: <><path d="m6 9 6 6 6-6"/></>,
    chevronUp: <><path d="m6 15 6-6 6 6"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <><path d="M5 12h14"/></>,
    close: <><path d="M6 6l12 12M6 18 18 6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    home: <><path d="m3 12 9-8 9 8"/><path d="M5 10v10h14V10"/></>,
    bed: <><path d="M3 8v12M21 14v6M3 14h18M3 14V8h11a4 4 0 0 1 4 4v2"/></>,
    bath: <><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M5 12V6a2 2 0 0 1 4 0M3 19l1 2M21 19l-1 2"/></>,
    wifi: <><path d="M2 9c5-5 15-5 20 0"/><path d="M5 13c4-4 10-4 14 0"/><path d="M8.5 16.5c2-2 5-2 7 0"/><circle cx="12" cy="20" r="0.6" fill="currentColor"/></>,
    parking: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M10 17V7h3.5a2.5 2.5 0 0 1 0 5H10"/></>,
    pool: <><path d="M3 18c2 1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 4 0M3 14c2 1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 4 0"/><path d="M7 14V6a2 2 0 0 1 4 0M13 14V6a2 2 0 0 1 4 0"/></>,
    shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/></>,
    shieldCheck: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1-5V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 4.36 16.96l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    arrowLeft: <><path d="M19 12H5M11 6l-6 6 6 6"/></>,
    arrowUp: <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowDown: <><path d="M12 5v14M5 12l7 7 7-7"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></>,
    camera: <><path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="3.5"/></>,
    arrowUp: <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowDown: <><path d="M12 5v14M5 12l7 7 7-7"/></>,
    pin: <><path d="M12 22s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z"/><circle cx="12" cy="9" r="3"/></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    cards: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></>,
    filter: <><path d="M4 5h16l-6 8v6l-4-2v-4z"/></>,
    upload: <><path d="M12 3v12"/><path d="m6 9 6-6 6 6"/><path d="M5 21h14"/></>,
    download: <><path d="M12 3v12"/><path d="m6 13 6 6 6-6"/><path d="M5 21h14"/></>,
    trending: <><path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/></>,
    dashboard: <><rect x="3" y="3" width="8" height="10" rx="2"/><rect x="13" y="3" width="8" height="6" rx="2"/><rect x="3" y="15" width="8" height="6" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v4h1"/></>,
    check: <><path d="M5 12l5 5 9-12"/></>,
    moon: <><path d="M21 12.8A8 8 0 1 1 11.2 3a6 6 0 0 0 9.8 9.8z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></>,
    send: <><path d="m4 12 16-8-4 16-4-6z"/><path d="m12 14 4-4"/></>,
    paperclip: <><path d="m21 11-9 9a5 5 0 0 1-7-7l9-9a3 3 0 0 1 4 4l-9 9a1 1 0 0 1-2-2l8-8"/></>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M9 14s1 2 3 2 3-2 3-2"/><circle cx="9" cy="10" r=".6" fill="currentColor"/><circle cx="15" cy="10" r=".6" fill="currentColor"/></>,
    creditCard: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    refresh: <><path d="M4 4v6h6"/><path d="M20 20v-6h-6"/><path d="M4 10a8 8 0 0 1 14-3M20 14a8 8 0 0 1-14 3"/></>,
    activity: <><path d="M3 12h4l3-9 4 18 3-9h4"/></>,
    flag: <><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></>,
    options: <><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></>,
    edit: <><path d="M4 20h4l11-11-4-4L4 16z"/><path d="m13 5 4 4"/></>,
    trash: <><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></>,
    play: <><path d="m6 4 14 8-14 8z" fill="currentColor"/></>,
    sliders: <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></>,
    sailboat: <><path d="M3 18c2 1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 4 0"/><path d="M12 3v13M12 16 5 16l7-13z"/></>,
    mountain: <><path d="m3 20 6-10 4 6 3-4 5 8z"/><circle cx="17" cy="6" r="1.5"/></>,
    tree: <><path d="M12 3 6 12h3l-3 5h12l-3-5h3z"/><path d="M12 17v4"/></>,
    castle: <><path d="M3 21V9l3 2V8l3 2V8l3 2V8l3 2v3l3-2v12z"/><path d="M9 21v-4h6v4"/></>,
    desert: <><path d="M3 20h18"/><path d="M5 20c0-3 2-5 5-5s2 5 7 5"/><circle cx="17" cy="7" r="2"/></>,
    snowflake: <><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></>,
    sun2: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></>,
    key: <><circle cx="8" cy="14" r="4"/><path d="m11 11 9-9M16 6l3 3"/></>,
    cross: <><path d="M6 6l12 12M6 18 18 6"/></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || null}
    </svg>
  );
};

export default Icon;
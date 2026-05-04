// evomstay — Admin dashboard (dark, data-rich) + Profile/Reviews + Mobile

const AdminScreen = ({ role, onRoleChange }) => {
  const [animKey, setAnimKey] = React.useState(0);
  React.useEffect(() => { const t = setTimeout(() => setAnimKey(k => k+1), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{height: 980, overflow:'auto', borderRadius: 24, background: '#070B16', color: '#E2E8F0'}}
      data-screen-label="08 Admin Dashboard" className="thin-scroll">
      {/* admin top bar */}
      <header style={{
        position:'sticky', top: 0, zIndex: 30,
        background: 'rgba(11,18,32,0.85)', backdropFilter: 'blur(18px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 32px', display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <div style={{display:'flex', alignItems:'center', gap: 16}}>
          <div style={{display:'inline-flex', alignItems:'center', gap: 10, color:'white'}}>
            <LogoMark size={28}/>
            <span style={{fontFamily:'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing:'-0.02em'}}>evomstay</span>
            <span style={{padding: '2px 8px', borderRadius: 6, background:'rgba(255,255,255,0.08)', fontSize: 10, fontWeight: 700, letterSpacing:'.08em', color:'#7DD3FC'}}>OPS</span>
          </div>
          <div style={{height: 22, width: 1, background:'rgba(255,255,255,0.1)', margin:'0 8px'}}/>
          <span style={{fontSize: 13, color:'rgba(255,255,255,0.6)'}}>Production · İstanbul-1 · 03 May 2026 · 14:22 UTC+3</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap: 8}}>
          <div style={{position:'relative', flex: 1, minWidth: 280}}>
            <input placeholder="Search bookings, hosts, guests, IDs…"
              style={{width:'100%', padding:'9px 14px 9px 36px', borderRadius: 999, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.04)', color:'white', fontFamily:'inherit', fontSize: 13, outline:'none'}}/>
            <span style={{position:'absolute', left: 14, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.4)'}}><Icon name="search" size={14}/></span>
            <span style={{position:'absolute', right: 14, top:'50%', transform:'translateY(-50%)', fontFamily:'var(--font-mono)', fontSize: 10, color:'rgba(255,255,255,0.35)', padding:'2px 6px', border:'1px solid rgba(255,255,255,0.1)', borderRadius: 4}}>⌘K</span>
          </div>
          <div style={{display:'flex', padding: 3, borderRadius: 999, background:'rgba(255,255,255,0.06)', marginLeft: 12}}>
            {['guest','host','admin'].map(r => (
              <button key={r} onClick={() => onRoleChange?.(r)}
                style={{padding:'6px 14px', borderRadius: 999, border: 0, background: role === r ? 'rgba(255,255,255,0.12)' : 'transparent', color: role === r ? 'white' : 'rgba(255,255,255,0.5)', fontFamily:'inherit', fontWeight: 600, fontSize: 12, cursor:'pointer', textTransform:'capitalize'}}>{r}</button>
            ))}
          </div>
          <button style={{padding: 8, border:0, background:'transparent', color:'rgba(255,255,255,0.6)', cursor:'pointer'}}><Icon name="bell" size={18}/></button>
          <Avatar name="Admin Ops" size={30}/>
        </div>
      </header>

      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', minHeight: 'calc(100% - 60px)'}}>
        {/* sidebar */}
        <aside style={{padding: 18, borderRight: '1px solid rgba(255,255,255,0.06)'}}>
          <SideSection h="Overview" items={[
            { i: 'dashboard', t: 'Live ops', active: true },
            { i: 'activity', t: 'Realtime', count: 247 },
            { i: 'trending', t: 'Revenue' },
          ]}/>
          <SideSection h="Trust & safety" items={[
            { i: 'shield', t: 'Verifications', count: 38 },
            { i: 'flag', t: 'Reports', count: 6, hot: true },
            { i: 'eye', t: 'Fraud signals' },
          ]}/>
          <SideSection h="Catalogue" items={[
            { i: 'home', t: 'Listings' },
            { i: 'users', t: 'Hosts' },
            { i: 'user', t: 'Guests' },
            { i: 'cards', t: 'Bookings' },
          ]}/>
          <SideSection h="System" items={[
            { i: 'settings', t: 'Settings' },
            { i: 'logout', t: 'Sign out' },
          ]}/>
        </aside>

        {/* main */}
        <main style={{padding: 28, overflow:'auto'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 22}}>
            <div>
              <h1 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 32, fontWeight: 500, letterSpacing:'-0.02em', color:'white'}}>Live operations</h1>
              <div style={{color:'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 6, display:'inline-flex', alignItems:'center', gap: 8}}>
                <span style={{display:'inline-flex', alignItems:'center', gap: 6}}><span style={{width: 8, height: 8, borderRadius:999, background:'#10B981', boxShadow:'0 0 0 4px rgba(16,185,129,0.18)'}}/> All systems normal</span>
                · last refresh 12s ago
              </div>
            </div>
            <div style={{display:'flex', gap: 8}}>
              <button style={{padding:'8px 14px', borderRadius: 10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'white', fontFamily:'inherit', fontSize: 12, cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 6}}><Icon name="refresh" size={12}/> Auto refresh: 10s</button>
              <button style={{padding:'8px 14px', borderRadius: 10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'white', fontFamily:'inherit', fontSize: 12, cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 6}}><Icon name="download" size={12}/> Export</button>
            </div>
          </div>

          {/* KPI row */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14, marginBottom: 18}}>
            {[
              { l:'GMV today', v:'$842,310', d:'+12.4%', up: true, c: '#0EA5E9' },
              { l:'Bookings · 24h', v:'2,189', d:'+184', up: true, c: '#1AA8A1' },
              { l:'Active stays', v:'14,072', d:'real-time', up: null, c: '#A855F7' },
              { l:'Verified hosts', v:'128,407', d:'+38 today', up: true, c: '#F59E0B' },
            ].map(k => (
              <div key={k.l} style={{padding: 20, borderRadius: 16, background:'#0E1626', border:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div style={{fontSize: 12, color:'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing:'.04em', textTransform:'uppercase'}}>{k.l}</div>
                  <span style={{width: 8, height: 8, borderRadius: 999, background: k.c, boxShadow: `0 0 12px ${k.c}`}}/>
                </div>
                <div style={{fontSize: 26, fontWeight: 700, color:'white', marginTop: 10, fontFamily:'var(--font-display)', letterSpacing:'-0.02em'}}>{k.v}</div>
                <div style={{fontSize: 11, marginTop: 6, color: k.up ? '#10B981' : 'rgba(255,255,255,0.5)'}}>
                  {k.up && '▲ '}{k.d}
                </div>
              </div>
            ))}
          </div>

          {/* charts row */}
          <div style={{display:'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginBottom: 18}}>
            <Panel title="GMV · last 30 days" subtitle="$24.6M total · $820k avg/day">
              <GmvChart key={animKey}/>
            </Panel>
            <Panel title="Geographic breakdown" subtitle="Active stays by region">
              <GeoBreakdown/>
            </Panel>
          </div>

          {/* health rail */}
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap: 14, marginBottom: 18}}>
            <Panel title="Trust & safety queue" subtitle="38 verifications · 6 reports">
              <TrustQueue/>
            </Panel>
            <Panel title="System health" subtitle="api · payments · search">
              <SystemHealth/>
            </Panel>
          </div>

          {/* live activity */}
          <Panel title="Live activity" subtitle="Updates streaming">
            <LiveActivity/>
          </Panel>
        </main>
      </div>
    </div>
  );
};

const SideSection = ({ h, items }) => (
  <div style={{marginBottom: 22}}>
    <div style={{padding: '6px 12px', fontSize: 10, fontWeight: 700, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)'}}>{h}</div>
    {items.map(it => (
      <button key={it.t}
        style={{
          width:'100%', padding: '8px 12px', borderRadius: 10,
          border: 0, fontFamily:'inherit', fontSize: 13, cursor:'pointer', textAlign:'left',
          background: it.active ? 'rgba(0,102,255,0.18)' : 'transparent',
          color: it.active ? '#7DB3FF' : 'rgba(255,255,255,0.7)',
          fontWeight: it.active ? 600 : 500,
          display:'flex', alignItems:'center', gap: 10, marginBottom: 2,
        }}>
        <Icon name={it.i} size={15} stroke="currentColor"/>
        <span style={{flex: 1}}>{it.t}</span>
        {it.count != null && (
          <span style={{padding: '1px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: it.hot ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)', color: it.hot ? '#FCA5A5' : 'rgba(255,255,255,0.7)'}}>{it.count}</span>
        )}
      </button>
    ))}
  </div>
);

const Panel = ({ title, subtitle, children }) => (
  <div style={{padding: 20, borderRadius: 16, background:'#0E1626', border:'1px solid rgba(255,255,255,0.06)'}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 16}}>
      <div>
        <div style={{fontSize: 14, fontWeight: 600, color:'white'}}>{title}</div>
        <div style={{fontSize: 12, color:'rgba(255,255,255,0.5)', marginTop: 4}}>{subtitle}</div>
      </div>
      <button style={{padding: 6, border:0, background:'transparent', color:'rgba(255,255,255,0.5)', cursor:'pointer'}}><Icon name="options" size={16}/></button>
    </div>
    {children}
  </div>
);

const GmvChart = () => {
  const data = [420,460,510,490,560,620,580,600,720,690,710,760,740,820,790,810,860,920,890,940,970,1020,1060,1010,1080,1140,1200,1170,1240,1310];
  const max = Math.max(...data);
  return (
    <svg viewBox="0 0 600 220" style={{width:'100%', height: 220}}>
      <defs>
        <linearGradient id="adminFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0EA5E9" stopOpacity="0.5"/>
          <stop offset="1" stopColor="#0EA5E9" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="adminLine" x1="0" y1="0" x2="600" y2="0">
          <stop offset="0" stopColor="#1AA8A1"/>
          <stop offset="1" stopColor="#0EA5E9"/>
        </linearGradient>
      </defs>
      {[0,1,2,3,4].map(i => (
        <line key={i} x1="0" x2="600" y1={20 + i*40} y2={20+i*40} stroke="rgba(255,255,255,0.05)"/>
      ))}
      {(() => {
        const pts = data.map((v, i) => [i * (600/(data.length-1)), 200 - (v/max)*170]);
        const path = `M ${pts.map(p => p.join(',')).join(' L ')}`;
        const area = `${path} L 600,200 L 0,200 Z`;
        return (<>
          <path d={area} fill="url(#adminFill)" style={{animation:'fadeUp 0.8s ease both'}}/>
          <path d={path} fill="none" stroke="url(#adminLine)" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="2000" strokeDashoffset="2000" style={{animation: 'draw 1.4s ease forwards'}}/>
          <circle cx={pts[pts.length-1][0]-1} cy={pts[pts.length-1][1]} r="5" fill="#0EA5E9" stroke="white" strokeWidth="2"/>
        </>);
      })()}
    </svg>
  );
};

const GeoBreakdown = () => {
  const regions = [
    { n: 'Türkiye', v: 6210, c: '#0EA5E9' },
    { n: 'Greece', v: 2440, c: '#1AA8A1' },
    { n: 'Italy', v: 1980, c: '#A855F7' },
    { n: 'Spain', v: 1670, c: '#F59E0B' },
    { n: 'Other', v: 1772, c: '#475569' },
  ];
  const total = regions.reduce((a, r) => a + r.v, 0);
  let off = 0;
  const seg = regions.map(r => {
    const pct = r.v / total;
    const s = { ...r, pct, off };
    off += pct;
    return s;
  });
  const c = 2 * Math.PI * 70;
  return (
    <div style={{display:'flex', alignItems:'center', gap: 22}}>
      <svg viewBox="0 0 180 180" style={{width: 160, height: 160, flexShrink: 0}}>
        <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="22"/>
        {seg.map(s => (
          <circle key={s.n} cx="90" cy="90" r="70" fill="none" stroke={s.c} strokeWidth="22"
            strokeDasharray={`${s.pct * c} ${c}`} strokeDashoffset={-s.off * c}
            transform="rotate(-90 90 90)"
            style={{ transition: 'stroke-dasharray 1s ease' }}/>
        ))}
        <text x="90" y="86" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="var(--font-display)">14k</text>
        <text x="90" y="104" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">active stays</text>
      </svg>
      <div style={{flex:1, display:'flex', flexDirection:'column', gap: 8}}>
        {regions.map(r => (
          <div key={r.n} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: 12}}>
            <span style={{display:'inline-flex', alignItems:'center', gap: 8, color:'rgba(255,255,255,0.85)'}}>
              <span style={{width: 8, height: 8, borderRadius: 2, background: r.c}}/> {r.n}
            </span>
            <span style={{fontWeight: 600, color:'white', fontFamily:'var(--font-mono)'}}>{r.v.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrustQueue = () => {
  const rows = [
    { id:'#VFY-3814', host:'Murat E.', loc:'Antalya, TR', kind:'ID + Property', risk:'Low',  age:'4m', status:'Auto-passed', sev:'good' },
    { id:'#VFY-3813', host:'Anya P.',  loc:'Athens, GR',  kind:'Bank account',  risk:'Low',  age:'12m', status:'Awaiting', sev:'pending' },
    { id:'#RPT-1027', host:'—',        loc:'İstanbul',    kind:'Listing flagged · photos', risk:'High', age:'18m', status:'Needs review', sev:'high' },
    { id:'#VFY-3812', host:'Lucas D.', loc:'Lisbon, PT',  kind:'Video selfie',  risk:'Med',  age:'27m', status:'Awaiting', sev:'pending' },
    { id:'#RPT-1026', host:'Selin K.', loc:'Bodrum, TR',  kind:'Guest review report',     risk:'Low',  age:'42m', status:'Resolved', sev:'good' },
  ];
  const sevColor = { high: '#F87171', pending: '#FBBF24', good: '#34D399' };
  return (
    <div style={{maxHeight: 280, overflow:'auto'}} className="thin-scroll">
      <table style={{width:'100%', borderCollapse:'collapse', fontSize: 12}}>
        <thead>
          <tr style={{textAlign:'left', color:'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing:'.06em', textTransform:'uppercase', fontWeight: 700}}>
            {['ID','Host','Type','Risk','Age','Status'].map(h => <th key={h} style={{padding:'8px 0', fontWeight: 700}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
              <td style={{padding:'12px 8px 12px 0', fontFamily:'var(--font-mono)', color:'#7DD3FC', fontSize: 11}}>{r.id}</td>
              <td style={{padding:'12px 0', color:'white'}}>
                <div style={{fontWeight: 600}}>{r.host}</div>
                <div style={{fontSize: 11, color:'rgba(255,255,255,0.45)'}}>{r.loc}</div>
              </td>
              <td style={{padding:'12px 0', color:'rgba(255,255,255,0.75)'}}>{r.kind}</td>
              <td style={{padding:'12px 0'}}>
                <span style={{padding:'2px 8px', borderRadius: 999, background: r.risk === 'High' ? 'rgba(248,113,113,0.12)' : r.risk === 'Med' ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.12)', color: r.risk === 'High' ? '#F87171' : r.risk === 'Med' ? '#FBBF24' : '#34D399', fontWeight: 700, fontSize: 10, letterSpacing:'.04em'}}>{r.risk}</span>
              </td>
              <td style={{padding:'12px 0', color:'rgba(255,255,255,0.5)', fontFamily:'var(--font-mono)'}}>{r.age}</td>
              <td style={{padding:'12px 0'}}>
                <span style={{display:'inline-flex', alignItems:'center', gap: 6, color: sevColor[r.sev]}}>
                  <span style={{width: 6, height: 6, borderRadius:999, background: sevColor[r.sev]}}/>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SystemHealth = () => {
  const services = [
    { n: 'API gateway', l: '99.99%', v: 0.99 },
    { n: 'Booking engine', l: '99.97%', v: 0.97 },
    { n: 'Payments · Stripe', l: '100.00%', v: 1.0 },
    { n: 'Search · Algolia', l: '99.94%', v: 0.94, warn: true },
    { n: 'Verification ML', l: '99.99%', v: 0.99 },
  ];
  return (
    <div style={{display:'flex', flexDirection:'column', gap: 14}}>
      {services.map(s => (
        <div key={s.n}>
          <div style={{display:'flex', justifyContent:'space-between', fontSize: 12, marginBottom: 6}}>
            <span style={{color:'rgba(255,255,255,0.85)'}}>{s.n}</span>
            <span style={{fontFamily:'var(--font-mono)', color: s.warn ? '#FBBF24' : '#34D399'}}>{s.l}</span>
          </div>
          <div style={{display:'flex', gap: 2, height: 8}}>
            {Array.from({length: 30}).map((_, i) => {
              const isFail = i === 24 && s.warn;
              return <div key={i} style={{flex: 1, borderRadius: 1.5, background: isFail ? '#FBBF24' : 'rgba(52,211,153,0.7)'}}/>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const LiveActivity = () => {
  const events = [
    { t: '14:22:08', k: 'BOOK', e: 'New 6-night booking · Cliffside Villa · $4,368', who: 'maria@…', sev:'good' },
    { t: '14:22:01', k: 'VFY',  e: 'Host verification approved · Murat E.', who: 'auto-ml', sev:'good' },
    { t: '14:21:54', k: 'PAY',  e: 'Refund issued · EVM-1A22 · $1,240', who: 'ops/anil', sev:'pending' },
    { t: '14:21:42', k: 'RPT',  e: 'Listing reported for misleading photos · #RPT-1027', who: 'guest/jp', sev:'high' },
    { t: '14:21:18', k: 'BOOK', e: 'Booking confirmed · Marina Penthouse · $5,280', who: 'james@…', sev:'good' },
    { t: '14:20:55', k: 'CHAT', e: 'Concierge intervention · response time 92s', who: 'ops/lina', sev:'good' },
  ];
  const kindCol = { BOOK: '#0EA5E9', VFY: '#34D399', PAY: '#A855F7', RPT: '#F87171', CHAT: '#FBBF24' };
  return (
    <div style={{maxHeight: 220, overflow: 'auto', display:'flex', flexDirection:'column', gap: 0}} className="thin-scroll">
      {events.map((e, i) => (
        <div key={i} style={{display:'grid', gridTemplateColumns:'80px 60px 1fr 120px', gap: 14, padding: '10px 0', borderTop: i ? '1px solid rgba(255,255,255,0.05)' : 'none', fontSize: 12, alignItems:'center'}}>
          <span style={{fontFamily:'var(--font-mono)', color:'rgba(255,255,255,0.4)'}}>{e.t}</span>
          <span style={{padding:'2px 8px', borderRadius: 4, fontFamily:'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing:'.04em', background: `${kindCol[e.k]}1F`, color: kindCol[e.k], textAlign:'center'}}>{e.k}</span>
          <span style={{color:'white'}}>{e.e}</span>
          <span style={{fontFamily:'var(--font-mono)', color:'rgba(255,255,255,0.45)', textAlign:'right', fontSize: 11}}>{e.who}</span>
        </div>
      ))}
    </div>
  );
};

// ───────── Profile + Reviews ─────────
const ProfileScreen = ({ role, onRoleChange }) => {
  const reviews = window.EVOM.REVIEWS;
  return (
    <div style={{height: 980, overflow:'auto', borderRadius: 24, background: 'var(--bg)'}}
      data-screen-label="09 Profile + Reviews" className="thin-scroll">
      <TopBar role={role} onRoleChange={onRoleChange} scrolled />
      <div style={{maxWidth: 1200, margin:'0 auto', padding: '32px 36px 64px', display:'grid', gridTemplateColumns:'320px 1fr', gap: 36}}>
        <aside>
          <div className="card" style={{padding: 28, borderRadius: 24, textAlign:'center'}}>
            <div style={{position:'relative', display:'inline-block'}}>
              <Avatar name="Selin K" size={120} verified ring/>
            </div>
            <h2 style={{margin: '18px 0 4px', fontFamily:'var(--font-display)', fontSize: 24, fontWeight: 600, display:'inline-flex', alignItems:'center', gap: 8}}>
              Selin Kaya <VerifiedShield size={20}/>
            </h2>
            <div style={{color:'var(--slate-500)', fontSize: 13}}>Bodrum, Türkiye · Host since 2020</div>

            <div style={{display:'flex', gap: 8, justifyContent:'center', marginTop: 14, flexWrap:'wrap'}}>
              <span className="chip" style={{background:'rgba(232,187,77,0.18)', color:'var(--gold-500)', fontWeight: 700, fontSize: 11, letterSpacing:'.04em'}}>● VERIFIED HOST</span>
              <span className="chip" style={{background:'var(--cta-soft)', color:'var(--cta)', fontWeight: 700, fontSize: 11, letterSpacing:'.04em'}}>TOP 1%</span>
            </div>

            <div style={{borderTop:'1px solid var(--slate-200)', marginTop: 22, paddingTop: 22, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14, textAlign:'left'}}>
              <Stat l="Reviews" v="572"/>
              <Stat l="Rating" v="4.96"/>
              <Stat l="Stays hosted" v="1,402"/>
              <Stat l="Response time" v="<1h"/>
            </div>
          </div>

          <div className="card" style={{padding: 22, borderRadius: 22, marginTop: 16}}>
            <div style={{fontWeight: 700, fontSize: 14, marginBottom: 14}}>Verification</div>
            {[
              ['shieldCheck','Government ID', true],
              ['shieldCheck','Phone number', true],
              ['shieldCheck','Email address', true],
              ['shieldCheck','Property deed', true],
              ['shieldCheck','Bank account', true],
              ['lock','Background check', true],
            ].map(([i, l, ok]) => (
              <div key={l} style={{display:'flex', alignItems:'center', gap: 10, padding: '8px 0', fontSize: 13}}>
                <Icon name={i} size={16} stroke="var(--success)"/>
                <span style={{flex: 1}}>{l}</span>
                <span style={{fontSize: 11, color:'var(--success)', fontWeight: 700}}>VERIFIED</span>
              </div>
            ))}
          </div>
        </aside>

        <div>
          <h1 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 38, fontWeight: 500, letterSpacing:'-0.025em'}}>About Selin</h1>
          <p style={{fontSize: 16, color:'var(--slate-700)', lineHeight: 1.7, marginTop: 14, maxWidth: 700}}>
            I grew up between İstanbul and Bodrum. After a decade designing hotels in Asia I came home to restore
            my grandfather's stone houses on the Aegean. Hosting is how I share that quiet, that light, with people
            who appreciate how a place feels when it has been truly cared for.
          </p>

          {/* rating breakdown */}
          <div className="card" style={{padding: 28, borderRadius: 22, marginTop: 28}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap: 36, alignItems:'center'}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontFamily:'var(--font-display)', fontSize: 64, fontWeight: 600, letterSpacing:'-0.02em', lineHeight: 1}}>4.96</div>
                <div style={{display:'inline-flex', gap: 2, marginTop: 8}}>
                  {[1,2,3,4,5].map(n => <Icon key={n} name="starFilled" size={16} stroke="var(--gold-500)"/>)}
                </div>
                <div style={{color:'var(--slate-500)', fontSize: 13, marginTop: 6}}>572 reviews</div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap: 8}}>
                {[
                  ['Cleanliness', 4.99],
                  ['Accuracy', 4.97],
                  ['Communication', 5.00],
                  ['Location', 4.92],
                  ['Check-in', 4.98],
                  ['Value', 4.90],
                ].map(([l, v]) => (
                  <div key={l} style={{display:'flex', alignItems:'center', gap: 14, fontSize: 13}}>
                    <span style={{flex:'0 0 110px', color:'var(--slate-700)'}}>{l}</span>
                    <span style={{flex: 1, height: 6, background:'var(--slate-100)', borderRadius: 999, overflow:'hidden'}}>
                      <span style={{display:'block', width: `${(v/5)*100}%`, height: '100%', background:'var(--ink)', borderRadius: 999}}/>
                    </span>
                    <span style={{flex:'0 0 36px', textAlign:'right', fontWeight: 700, fontFamily:'var(--font-mono)', fontSize: 12}}>{v.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent reviews */}
          <h3 style={{margin: '36px 0 16px', fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 600}}>Recent reviews</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 18}}>
            {reviews.map((r, i) => (
              <div key={i} className="card" style={{padding: 22, borderRadius: 20}}>
                <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 10}}>
                  <Avatar name={r.name} verified={r.verified} size={40}/>
                  <div>
                    <div style={{display:'flex', alignItems:'center', gap: 6, fontWeight: 600}}>
                      {r.name}{r.verified && <VerifiedShield size={12}/>}
                    </div>
                    <div style={{fontSize: 12, color:'var(--slate-500)'}}>{r.date}</div>
                  </div>
                </div>
                <div style={{display:'flex', gap: 2, marginBottom: 10}}>
                  {[1,2,3,4,5].map(n => <Icon key={n} name="starFilled" size={12} stroke={n <= r.rating ? 'var(--gold-500)' : 'var(--slate-300)'}/>)}
                </div>
                <p style={{margin: 0, fontSize: 14, color:'var(--slate-700)', lineHeight: 1.6}}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ l, v }) => (
  <div>
    <div style={{fontSize: 11, fontWeight: 700, letterSpacing:'.04em', textTransform:'uppercase', color:'var(--slate-500)'}}>{l}</div>
    <div style={{fontSize: 18, fontWeight: 700, marginTop: 4, fontFamily:'var(--font-display)', letterSpacing:'-0.01em'}}>{v}</div>
  </div>
);

window.AdminScreen = AdminScreen;
window.ProfileScreen = ProfileScreen;

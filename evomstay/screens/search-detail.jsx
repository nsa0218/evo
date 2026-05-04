// evomstay — Search results / map view + Property detail + Booking flow

const SearchResultsScreen = ({ onOpenProperty, role, onRoleChange }) => {
  const [hovered, setHovered] = React.useState(null);
  const [activeCat, setActiveCat] = React.useState('Beachfront');
  return (
    <div style={{height: 980, overflow:'auto', borderRadius: 24, background: 'var(--bg)'}}
      data-screen-label="02 Search Results">
      <div style={{position:'sticky', top: 0, zIndex: 30, background: 'var(--paper)', borderBottom: '1px solid var(--slate-200)'}}>
        <TopBar role={role} onRoleChange={onRoleChange} scrolled={true} />
        <div style={{maxWidth: 1500, margin:'0 auto', padding: '8px 36px 0', display:'flex', justifyContent:'center'}}>
          <SearchBar initial="compact" />
        </div>
        <div style={{maxWidth: 1500, margin:'0 auto', padding: '12px 36px 16px'}}>
          <CategoryBar active={activeCat} onChange={setActiveCat} />
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns: '1.4fr 1fr', gap: 0, height: 'calc(100% - 232px)'}}>
        {/* listings */}
        <div style={{padding: '24px 28px 36px', overflow: 'auto'}} className="thin-scroll">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 18}}>
            <div>
              <h2 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 26, fontWeight: 500, letterSpacing:'-0.02em'}}>
                Over 1,200 stays in Bodrum
              </h2>
              <div style={{color:'var(--slate-500)', fontSize: 14, marginTop: 4}}>Jun 12 – 18 · 4 guests · Verified hosts only</div>
            </div>
            <div style={{display:'flex', gap: 8}}>
              <button className="btn btn-outline" style={{padding:'8px 14px', fontSize: 13}}><Icon name="sliders" size={14}/> Sort: Recommended</button>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22}}>
            {window.EVOM.FEATURED.map(p => (
              <div key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onOpenProperty?.(p)}
                style={{
                  transform: hovered === p.id ? 'translateY(-2px)' : 'none',
                  transition: 'transform .18s ease',
                }}>
                <PropertyCard p={p} size="md" />
              </div>
            ))}
          </div>
        </div>

        {/* map */}
        <div style={{position:'relative', background: '#E5EAF1', borderLeft: '1px solid var(--slate-200)'}}>
          <MapView properties={window.EVOM.FEATURED} hovered={hovered} setHovered={setHovered} />
        </div>
      </div>
    </div>
  );
};

const MapView = ({ properties, hovered, setHovered }) => (
  <div style={{position:'absolute', inset: 0, overflow:'hidden'}}>
    <svg viewBox="0 0 600 600" style={{position:'absolute', inset: 0, width: '100%', height: '100%'}}>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(15,23,42,0.05)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="600" height="600" fill="#EAF1F5"/>
      <rect width="600" height="600" fill="url(#grid)"/>
      {/* abstract land masses */}
      <path d="M-20,180 Q 80,140 180,200 T 420,180 Q 520,160 640,210 L 640,640 L -20,640 Z" fill="#DDE4EA"/>
      <path d="M120,80 Q 220,60 300,120 T 520,90 L 520,180 Q 360,200 240,170 T 80,200 Z" fill="#E2E8EE"/>
      <path d="M40,320 Q 160,300 260,360 T 480,360 Q 540,360 620,330 L 620,640 L 40,640 Z" fill="#D6E0E8" opacity="0.6"/>
      {/* sea shimmer */}
      <circle cx="80" cy="80" r="50" fill="white" opacity="0.4"/>
      <circle cx="500" cy="450" r="80" fill="white" opacity="0.3"/>
      {/* roads */}
      <path d="M0,400 Q 200,380 400,420 T 600,400" stroke="white" strokeWidth="3" fill="none"/>
      <path d="M300,0 Q 280,200 320,400 T 300,600" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
    </svg>

    {/* price pins */}
    {properties.map((p, i) => {
      const x = 12 + (i * 11.5) % 78;
      const y = 18 + ((i * 17) % 62);
      const isHover = hovered === p.id;
      return (
        <button key={p.id}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            position:'absolute', left: `${x}%`, top: `${y}%`,
            transform: 'translate(-50%, -50%)',
            padding: '6px 12px', borderRadius: 999,
            background: isHover ? 'var(--ink)' : 'var(--paper)',
            color: isHover ? 'white' : 'var(--ink)',
            border: '1px solid ' + (isHover ? 'var(--ink)' : 'var(--slate-200)'),
            boxShadow: isHover ? '0 8px 24px rgba(15,23,42,0.18)' : 'var(--shadow-sm)',
            cursor:'pointer', fontFamily:'inherit', fontWeight: 700, fontSize: 13,
            transition: 'all .15s ease',
            zIndex: isHover ? 10 : 1,
          }}>
          ${p.price}
        </button>
      );
    })}

    {/* hover preview card */}
    {hovered && (() => {
      const p = properties.find(x => x.id === hovered);
      const i = properties.indexOf(p);
      const x = 12 + (i * 11.5) % 78;
      const y = 18 + ((i * 17) % 62);
      return (
        <div className="glass-strong" style={{
          position:'absolute', left: `${x}%`, top: `calc(${y}% + 28px)`,
          transform:'translateX(-50%)',
          width: 240, padding: 8, borderRadius: 20, boxShadow: 'var(--shadow-xl)', zIndex: 20,
        }}>
          <div style={{height: 120, borderRadius: 14, background: `center/cover url(${p.img})`, marginBottom: 8}}/>
          <div style={{padding: '4px 8px 8px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <div style={{fontWeight: 600, fontSize: 13, lineHeight: 1.3}}>{p.title}</div>
              <StarRating value={p.rating} size={11} showNumber={true} />
            </div>
            <div style={{fontSize: 12, color:'var(--slate-500)', marginTop: 4}}>${p.price} / night</div>
          </div>
        </div>
      );
    })()}

    {/* zoom controls */}
    <div style={{position:'absolute', top: 16, right: 16, display:'flex', flexDirection:'column', gap: 6}}>
      <button style={{width: 36, height: 36, borderRadius: 10, border: '1px solid var(--slate-200)', background:'var(--paper)', boxShadow:'var(--shadow-sm)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center'}}><Icon name="plus" size={14}/></button>
      <button style={{width: 36, height: 36, borderRadius: 10, border: '1px solid var(--slate-200)', background:'var(--paper)', boxShadow:'var(--shadow-sm)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center'}}><Icon name="minus" size={14}/></button>
    </div>
  </div>
);

// ───────── Property detail ─────────
const PropertyDetailScreen = ({ property, onBook, onChat, role, onRoleChange }) => {
  const p = property || window.EVOM.FEATURED[0];
  const g = window.EVOM.DETAIL_GALLERY;
  const reviews = window.EVOM.REVIEWS;

  return (
    <div style={{height: 980, overflow:'auto', borderRadius: 24, background: 'var(--paper)'}} data-screen-label="03 Property Detail" className="thin-scroll">
      <TopBar role={role} onRoleChange={onRoleChange} scrolled />
      <div style={{maxWidth: 1280, margin:'0 auto', padding: '24px 36px 48px'}}>
        {/* breadcrumbs */}
        <div style={{fontSize: 13, color:'var(--slate-500)', marginBottom: 18}}>
          Bodrum &nbsp;›&nbsp; Yalıkavak &nbsp;›&nbsp; Cliffside Villa with Infinity Pool
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 24, marginBottom: 18}}>
          <h1 style={{fontFamily:'var(--font-display)', fontWeight: 500, fontSize: 36, letterSpacing:'-0.025em', margin: 0, lineHeight: 1.05, maxWidth: 740}}>
            {p.title}
          </h1>
          <div style={{display:'flex', gap: 8}}>
            <button className="btn btn-ghost" style={{fontSize: 13, padding:'8px 14px'}}><Icon name="upload" size={14}/> Share</button>
            <button className="btn btn-ghost" style={{fontSize: 13, padding:'8px 14px'}}><Icon name="heart" size={14}/> Save</button>
          </div>
        </div>

        {/* gallery */}
        <div style={{display:'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '230px 230px', gap: 8, borderRadius: 24, overflow: 'hidden', position:'relative'}}>
          <div style={{gridRow:'1 / 3', background: `center/cover url(${g[0]})`}}/>
          <div style={{background: `center/cover url(${g[1]})`}}/>
          <div style={{background: `center/cover url(${g[2]})`}}/>
          <div style={{background: `center/cover url(${g[3]})`}}/>
          <div style={{background: `center/cover url(${g[4]})`, position:'relative'}}>
            <button className="glass-strong" style={{position:'absolute', bottom: 12, right: 12, padding: '8px 14px', borderRadius: 999, border: '1px solid var(--glass-border)', cursor:'pointer', fontFamily:'inherit', fontWeight: 600, fontSize: 13}}>
              <Icon name="grid" size={14}/> Show all 28 photos
            </button>
          </div>
        </div>

        {/* main */}
        <div style={{display:'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56, marginTop: 36}}>
          <div>
            {/* host strip */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', paddingBottom: 28, borderBottom: '1px solid var(--slate-200)'}}>
              <div>
                <h2 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing:'-0.02em'}}>
                  Whole villa hosted by Selin
                </h2>
                <div style={{color:'var(--slate-600)', fontSize: 15, marginTop: 6}}>{p.guests} guests · {p.beds} bedrooms · {p.baths} baths · Private pool</div>
              </div>
              <div style={{position:'relative'}}>
                <Avatar name="Selin K" verified size={56} ring />
              </div>
            </div>

            {/* feature highlights */}
            <div style={{padding: '28px 0', borderBottom: '1px solid var(--slate-200)', display:'flex', flexDirection:'column', gap: 18}}>
              {[
                { i:'shieldCheck', t:'Verified host · 6 years on evomstay', s:'Identity, address, and property all confirmed.' },
                { i:'sparkle', t:'Top 1% of stays', s:'Selin has earned 213 5-star reviews in the last year.' },
                { i:'key', t:'Self check-in', s:'Smart lock with rotating code — sent 24h before arrival.' },
              ].map(f => (
                <div key={f.t} style={{display:'flex', gap: 16}}>
                  <span style={{flexShrink: 0, width: 36, height: 36, borderRadius: 12, background: 'var(--teal-100)', color:'var(--teal-600)', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
                    <Icon name={f.i} size={18} stroke="var(--teal-600)" />
                  </span>
                  <div>
                    <div style={{fontWeight: 600, fontSize: 15}}>{f.t}</div>
                    <div style={{color:'var(--slate-600)', fontSize: 14, marginTop: 2}}>{f.s}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* description */}
            <div style={{padding: '28px 0', borderBottom: '1px solid var(--slate-200)'}}>
              <p style={{fontSize: 16, lineHeight: 1.7, color:'var(--slate-700)', margin: 0}}>
                A serene cliffside retreat overlooking Türkbükü Bay. The villa was rebuilt in 2024 around its original
                stone walls — every room frames the sea. The 18m infinity pool sits flush with the horizon, and the
                terrace seats twelve under a pergola of bougainvillea.
              </p>
              <button style={{marginTop: 14, padding: 0, background:'transparent', border: 0, fontFamily:'inherit', fontSize: 15, fontWeight: 600, textDecoration:'underline', cursor:'pointer'}}>Show more</button>
            </div>

            {/* amenities */}
            <div style={{padding: '28px 0', borderBottom: '1px solid var(--slate-200)'}}>
              <h3 style={{margin: '0 0 18px', fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 600}}>What this place offers</h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14}}>
                {[
                  ['pool','Private infinity pool'],
                  ['wifi','Fibre wifi 1Gbps'],
                  ['parking','Gated parking · 4 cars'],
                  ['bath','Outdoor rain shower'],
                  ['key','Self check-in'],
                  ['sparkle','Concierge on call'],
                ].map(([i, t]) => (
                  <div key={t} style={{display:'flex', alignItems:'center', gap: 12, fontSize: 15}}>
                    <Icon name={i} size={18} /> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* reviews */}
            <div style={{padding: '28px 0'}}>
              <div style={{display:'flex', alignItems:'center', gap: 12, marginBottom: 22}}>
                <Icon name="starFilled" size={20} stroke="var(--ink)" />
                <span style={{fontFamily:'var(--font-display)', fontSize: 24, fontWeight: 600}}>{p.rating}</span>
                <span style={{color:'var(--slate-500)'}}>·</span>
                <span style={{fontWeight: 600}}>{p.reviews} reviews</span>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 28}}>
                {reviews.slice(0, 4).map((r, i) => (
                  <div key={i}>
                    <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 8}}>
                      <Avatar name={r.name} size={36} verified={r.verified} />
                      <div>
                        <div style={{display:'flex', alignItems:'center', gap: 6, fontWeight: 600, fontSize: 14}}>
                          {r.name}
                          {r.verified && <VerifiedShield size={12}/>}
                        </div>
                        <div style={{fontSize: 12, color:'var(--slate-500)'}}>{r.date}</div>
                      </div>
                    </div>
                    <div style={{display:'flex', gap: 2, marginBottom: 6}}>
                      {[1,2,3,4,5].map(n => <Icon key={n} name="starFilled" size={11} stroke={n <= r.rating ? 'var(--ink)' : 'var(--slate-300)'} />)}
                    </div>
                    <p style={{margin: 0, fontSize: 14, color:'var(--slate-700)', lineHeight: 1.6}}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* booking sidebar */}
          <div>
            <div className="card" style={{padding: 28, borderRadius: 24, position:'sticky', top: 24, boxShadow:'var(--shadow-md)'}}>
              <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 18}}>
                <div><span style={{fontSize: 26, fontWeight: 700}}>${p.price}</span><span style={{color:'var(--slate-500)', fontSize: 15}}> / night</span></div>
                <StarRating value={p.rating} count={p.reviews} />
              </div>
              <div style={{border:'1px solid var(--slate-200)', borderRadius: 14, overflow:'hidden', marginBottom: 12}}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom: '1px solid var(--slate-200)'}}>
                  <div style={{padding: 12, borderRight:'1px solid var(--slate-200)'}}>
                    <div style={{fontSize: 10, fontWeight: 700, letterSpacing:'.06em', textTransform:'uppercase'}}>Check in</div>
                    <div style={{fontSize: 14, marginTop: 4}}>Jun 12, 2026</div>
                  </div>
                  <div style={{padding: 12}}>
                    <div style={{fontSize: 10, fontWeight: 700, letterSpacing:'.06em', textTransform:'uppercase'}}>Check out</div>
                    <div style={{fontSize: 14, marginTop: 4}}>Jun 18, 2026</div>
                  </div>
                </div>
                <div style={{padding: 12}}>
                  <div style={{fontSize: 10, fontWeight: 700, letterSpacing:'.06em', textTransform:'uppercase'}}>Guests</div>
                  <div style={{fontSize: 14, marginTop: 4}}>4 guests</div>
                </div>
              </div>
              <button onClick={onBook} className="btn btn-primary" style={{width:'100%', height: 52, fontSize: 15}}>Reserve</button>
              <div style={{textAlign:'center', fontSize: 13, color:'var(--slate-500)', margin:'10px 0 18px'}}>You won't be charged yet</div>
              <div style={{display:'flex', flexDirection:'column', gap: 12, fontSize: 14}}>
                <div style={{display:'flex', justifyContent:'space-between'}}><span style={{textDecoration:'underline'}}>${p.price} × 6 nights</span><span>${(p.price*6).toLocaleString()}</span></div>
                <div style={{display:'flex', justifyContent:'space-between'}}><span style={{textDecoration:'underline'}}>Cleaning fee</span><span>$120</span></div>
                <div style={{display:'flex', justifyContent:'space-between'}}><span style={{textDecoration:'underline'}}>evomstay service</span><span>$384</span></div>
                <div style={{display:'flex', justifyContent:'space-between', paddingTop: 12, borderTop:'1px solid var(--slate-200)', fontWeight: 700, fontSize: 15}}>
                  <span>Total before taxes</span><span>${(p.price*6 + 120 + 384).toLocaleString()}</span>
                </div>
              </div>
              <button onClick={onChat} className="btn btn-outline" style={{width:'100%', marginTop: 16, fontSize: 14}}>
                <Icon name="chat" size={14}/> Message Selin
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

window.SearchResultsScreen = SearchResultsScreen;
window.PropertyDetailScreen = PropertyDetailScreen;

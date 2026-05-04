// evomstay — Login + Registration screens
// Role selection lives inside registration (and as a soft toggle on login).

import React from 'react'
import { Logo, Icon, Avatar, VerifiedShield } from '../components/icons'

const AuthShell = ({ children, side = 'left' }) => (
  <div style={{
    height: '100%', minHeight: 980, width: '100%',
    display: 'grid',
    gridTemplateColumns: side === 'left' ? '520px 1fr' : '1fr 520px',
    background: 'var(--paper)',
    fontFamily: 'var(--font-sans)',
    overflow: 'hidden',
  }}>
    {side === 'left' && <AuthForm>{children}</AuthForm>}
    <AuthArt />
    {side === 'right' && <AuthForm>{children}</AuthForm>}
  </div>
);

const AuthForm = ({ children }) => (
  <div style={{
    display:'flex', flexDirection:'column',
    padding: '36px 56px',
    background: 'var(--paper)',
    borderRight: '1px solid var(--slate-200)',
    overflowY: 'auto',
  }}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <Logo size={30} />
      <a style={{fontSize: 13, color:'var(--slate-500)', cursor:'pointer'}}>← Back to home</a>
    </div>
    <div style={{flex: 1, display:'flex', flexDirection:'column', justifyContent:'center', padding: '28px 0'}}>
      {children}
    </div>
    <div style={{fontSize: 11.5, color:'var(--slate-500)', textAlign:'center', lineHeight: 1.6}}>
      By continuing you agree to our <a style={{color:'var(--ink)', textDecoration:'underline'}}>Terms</a> and <a style={{color:'var(--ink)', textDecoration:'underline'}}>Privacy Policy</a>.
      <div style={{marginTop: 4}}>© 2025 evomstay · Istanbul · Türkiye</div>
    </div>
  </div>
);

// — Decorative right side — brand gradient, blurred orbs, testimonial card
const AuthArt = () => (
  <div style={{
    position:'relative',
    background: 'var(--grad-brand)',
    overflow:'hidden',
    color: 'white',
  }}>
    {/* blurred orbs */}
    <div style={{position:'absolute', top:-120, right:-80, width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(122,216,209,0.55), transparent 70%)', filter:'blur(40px)'}}/>
    <div style={{position:'absolute', bottom:-140, left:-100, width:520, height:520, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.55), transparent 70%)', filter:'blur(50px)'}}/>
    <div style={{position:'absolute', top:'40%', left:'30%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,187,77,0.25), transparent 70%)', filter:'blur(40px)'}}/>

    {/* fine grid texture */}
    <div style={{position:'absolute', inset: 0, opacity: 0.08,
      backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
      backgroundSize: '48px 48px'}}/>

    <div style={{position:'relative', height:'100%', padding: '48px 56px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      {/* top — verified seal */}
      <div style={{display:'inline-flex', alignItems:'center', gap: 10, padding:'8px 14px 8px 8px', borderRadius: 999, background:'rgba(255,255,255,0.12)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.2)', alignSelf:'flex-start', fontSize: 12.5}}>
        <VerifiedShield size={20}/>
        <span style={{letterSpacing:'0.02em'}}>Members-only · Verified hosts only</span>
      </div>

      {/* center — headline */}
      <div>
        <div style={{fontFamily:'var(--font-display)', fontSize: 56, fontWeight: 500, lineHeight: 1.05, letterSpacing:'-0.03em', textWrap:'balance'}}>
          Stay safely,<br/>
          <span style={{fontStyle:'italic', color:'#7AD8D1'}}>just like home.</span>
        </div>
        <div style={{marginTop: 18, fontSize: 15, color:'rgba(255,255,255,0.78)', maxWidth: 380, lineHeight: 1.55}}>
          Hand-picked stays in Türkiye and beyond. Identity-checked hosts. Insured properties. In-app encrypted payments.
        </div>
      </div>

      {/* bottom — testimonial */}
      <div style={{
        background:'rgba(255,255,255,0.10)',
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.18)',
        borderRadius: 20, padding: 20,
      }}>
        <div style={{display:'flex', gap: 12, alignItems:'center'}}>
          <Avatar name="Elif Yılmaz" size={40}/>
          <div>
            <div style={{fontSize: 13.5, fontWeight: 600}}>Elif Yılmaz</div>
            <div style={{fontSize: 11.5, color:'rgba(255,255,255,0.7)'}}>Verified guest · Bodrum stay</div>
          </div>
          <div style={{marginLeft:'auto', display:'flex', gap: 2, color:'#F2D277'}}>
            {[1,2,3,4,5].map(i => <Icon key={i} name="starFilled" size={13} stroke="#F2D277"/>)}
          </div>
        </div>
        <div style={{marginTop: 12, fontSize: 13.5, lineHeight: 1.55, color:'rgba(255,255,255,0.92)'}}>
          “The verification process gave me total peace of mind. The host's identity was confirmed, the property exactly as listed. We'll book through evomstay every time.”
        </div>
      </div>
    </div>
  </div>
);

// ——— Form primitives ———

const Field = ({ label, children, hint, error }) => (
  <label style={{display:'block', marginBottom: 14}}>
    <div style={{fontSize: 12.5, fontWeight: 600, color:'var(--slate-700)', marginBottom: 6}}>{label}</div>
    {children}
    {hint && !error && <div style={{fontSize: 11.5, color:'var(--slate-500)', marginTop: 5}}>{hint}</div>}
    {error && <div style={{fontSize: 11.5, color:'var(--danger)', marginTop: 5}}>{error}</div>}
  </label>
);

const Input = ({ icon, ...props }) => (
  <div style={{position:'relative'}}>
    {icon && <div style={{position:'absolute', left: 14, top:'50%', transform:'translateY(-50%)', color:'var(--slate-400)', pointerEvents:'none'}}><Icon name={icon} size={16}/></div>}
    <input {...props} style={{
      width:'100%', height: 44, padding: icon ? '0 14px 0 40px' : '0 14px',
      border:'1px solid var(--slate-200)', borderRadius: 12,
      background:'var(--paper)', color:'var(--ink)',
      fontFamily:'inherit', fontSize: 14, outline: 'none',
      transition:'border-color .15s, box-shadow .15s',
      ...props.style,
    }}
    onFocus={(e)=>{ e.target.style.borderColor = 'var(--cta)'; e.target.style.boxShadow = '0 0 0 4px var(--cta-soft)'; props.onFocus?.(e); }}
    onBlur={(e)=>{ e.target.style.borderColor = 'var(--slate-200)'; e.target.style.boxShadow = 'none'; props.onBlur?.(e); }}
    />
  </div>
);

const Divider = ({ label }) => (
  <div style={{display:'flex', alignItems:'center', gap: 12, margin:'18px 0', color:'var(--slate-400)', fontSize: 12}}>
    <div style={{flex:1, height:1, background:'var(--slate-200)'}}/>
    <span>{label}</span>
    <div style={{flex:1, height:1, background:'var(--slate-200)'}}/>
  </div>
);

const SocialBtn = ({ provider, label }) => {
  const ico = {
    google: <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>,
    apple: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"/></svg>,
    email: <Icon name="mail" size={15}/>,
  }[provider];
  return (
    <button className="btn btn-outline" style={{flex: 1, justifyContent:'center', padding:'11px 14px', fontSize: 13.5, fontWeight: 500, borderRadius: 12, gap: 10}}>
      {ico}<span>{label}</span>
    </button>
  );
};

// ——— LOGIN ———
const LoginScreen = ({ role = 'guest', onRoleChange }) => {
  const [remember, setRemember] = React.useState(true);
  return (
    <AuthShell side="left">
      <div style={{maxWidth: 380}}>
        <div style={{fontFamily:'var(--font-display)', fontSize: 38, fontWeight: 500, letterSpacing:'-0.025em', lineHeight: 1.05}}>
          Welcome back.
        </div>
        <div style={{color:'var(--slate-600)', fontSize: 14.5, marginTop: 8, marginBottom: 28}}>
          Sign in to your evomstay account.
        </div>

        <div style={{display:'flex', gap: 10, marginBottom: 18}}>
          <SocialBtn provider="google" label="Continue with Google"/>
        </div>
        <div style={{display:'flex', gap: 10, marginBottom: 6}}>
          <SocialBtn provider="apple" label="Apple"/>
          <SocialBtn provider="email" label="Magic link"/>
        </div>

        <Divider label="or sign in with email"/>

        <Field label="Email">
          <Input icon="mail" type="email" placeholder="you@example.com" defaultValue="elif.yilmaz@gmail.com"/>
        </Field>
        <Field label="Password">
          <Input icon="lock" type="password" placeholder="••••••••••••" defaultValue="••••••••••••"/>
        </Field>

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 18}}>
          <label style={{display:'inline-flex', alignItems:'center', gap: 8, fontSize: 13, color:'var(--slate-700)', cursor:'pointer'}}>
            <span style={{
              width: 16, height: 16, borderRadius: 5,
              border: '1px solid var(--slate-300)',
              background: remember ? 'var(--cta)' : 'transparent',
              borderColor: remember ? 'var(--cta)' : 'var(--slate-300)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
            }} onClick={()=>setRemember(!remember)}>
              {remember && <Icon name="check" size={11} stroke="white" strokeWidth={3}/>}
            </span>
            Keep me signed in
          </label>
          <a style={{fontSize: 13, color:'var(--cta)', cursor:'pointer', fontWeight: 500}}>Forgot password?</a>
        </div>

        <button className="btn btn-primary" style={{width:'100%', height: 48, fontSize: 14.5, borderRadius: 12}}>
          Sign in <Icon name="arrowRight" size={16} stroke="white"/>
        </button>

        <div style={{marginTop: 18, padding:'14px 16px', borderRadius: 12, background:'var(--slate-50)', border:'1px solid var(--slate-200)', display:'flex', gap: 12, alignItems:'flex-start'}}>
          <div style={{marginTop: 1, color:'var(--teal-600)'}}><Icon name="shieldCheck" size={18}/></div>
          <div style={{fontSize: 12.5, color:'var(--slate-700)', lineHeight: 1.5}}>
            <b style={{color:'var(--ink)'}}>Two-factor enabled.</b> We'll send a 6-digit code to your registered phone after sign-in.
          </div>
        </div>

        <div style={{marginTop: 22, fontSize: 13.5, color:'var(--slate-600)', textAlign:'center'}}>
          New to evomstay? <a style={{color:'var(--cta)', fontWeight: 600, cursor:'pointer'}}>Create an account →</a>
        </div>
      </div>
    </AuthShell>
  );
};

// ——— REGISTRATION ———
// Multi-step layout in one frame: 1) role 2) account 3) verify
const RoleCard = ({ value, current, onPick, title, body, icon, badge }) => {
  const active = value === current;
  return (
    <button onClick={()=>onPick(value)} style={{
      textAlign:'left', padding: 16, borderRadius: 16,
      border: active ? '2px solid var(--cta)' : '1px solid var(--slate-200)',
      background: active ? 'var(--cta-soft)' : 'var(--paper)',
      cursor:'pointer', display:'flex', gap: 12, alignItems:'flex-start',
      transition:'all .15s', fontFamily:'inherit',
      boxShadow: active ? '0 0 0 4px rgba(0,102,255,0.08)' : 'none',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: active ? 'var(--cta)' : 'var(--slate-100)',
        color: active ? 'white' : 'var(--slate-700)',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
      }}>
        <Icon name={icon} size={18} stroke="currentColor"/>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{display:'flex', alignItems:'center', gap: 8}}>
          <div style={{fontWeight: 600, fontSize: 14.5, color:'var(--ink)'}}>{title}</div>
          {badge && <span style={{fontSize: 10, fontWeight: 700, letterSpacing:'0.05em', padding:'2px 7px', borderRadius: 999, background:'var(--gold-300)', color:'var(--navy-900)'}}>{badge}</span>}
        </div>
        <div style={{fontSize: 12.5, color:'var(--slate-600)', marginTop: 4, lineHeight: 1.5}}>{body}</div>
      </div>
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        border: active ? 'none' : '1.5px solid var(--slate-300)',
        background: active ? 'var(--cta)' : 'transparent',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
      }}>
        {active && <Icon name="check" size={11} stroke="white" strokeWidth={3}/>}
      </div>
    </button>
  );
};

const RegisterScreen = () => {
  const [step, setStep] = React.useState(1);
  const [role, setRole] = React.useState('guest');

  return (
    <AuthShell side="right">
      <div style={{maxWidth: 420}}>
        {/* progress */}
        <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 22, fontSize: 12, color:'var(--slate-500)'}}>
          {[1,2,3].map(n => (
            <React.Fragment key={n}>
              <div style={{
                width: 24, height: 24, borderRadius: 999,
                background: n <= step ? 'var(--cta)' : 'var(--slate-100)',
                color: n <= step ? 'white' : 'var(--slate-500)',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                fontSize: 11.5, fontWeight: 700,
              }}>
                {n < step ? <Icon name="check" size={11} stroke="white" strokeWidth={3}/> : n}
              </div>
              {n < 3 && <div style={{flex:1, height: 2, background: n < step ? 'var(--cta)' : 'var(--slate-200)', borderRadius: 1}}/>}
            </React.Fragment>
          ))}
        </div>

        <div style={{fontFamily:'var(--font-display)', fontSize: 34, fontWeight: 500, letterSpacing:'-0.025em', lineHeight: 1.1}}>
          {step === 1 && 'How will you use evomstay?'}
          {step === 2 && 'Create your account.'}
          {step === 3 && 'Verify your identity.'}
        </div>
        <div style={{color:'var(--slate-600)', fontSize: 14, marginTop: 8, marginBottom: 22}}>
          {step === 1 && 'Choose your primary role. You can switch anytime, or be both.'}
          {step === 2 && `As a ${role}, we'll need a few details to get you started.`}
          {step === 3 && 'A government-issued ID keeps the community safe. Your data is encrypted and never shared with hosts.'}
        </div>

        {/* STEP 1 — role */}
        {step === 1 && (
          <div style={{display:'flex', flexDirection:'column', gap: 10}}>
            <RoleCard value="guest" current={role} onPick={setRole}
              icon="user"
              title="I'm a guest"
              body="Discover and book stays. Earn loyalty points on every trip."/>
            <RoleCard value="host" current={role} onPick={setRole}
              icon="home"
              title="I'm a host"
              body="List your property, set your rules, get paid securely. 8% platform fee."
              badge="VERIFIED"/>
            <RoleCard value="both" current={role} onPick={setRole}
              icon="sparkle"
              title="Both"
              body="Travel and earn. Switch between roles in your dashboard."/>

            <div style={{marginTop: 8, padding: 14, borderRadius: 12, background:'var(--slate-50)', border:'1px solid var(--slate-200)', display:'flex', gap: 10, alignItems:'flex-start'}}>
              <div style={{color:'var(--teal-600)', marginTop: 2}}><Icon name="info" size={16}/></div>
              <div style={{fontSize: 12.5, color:'var(--slate-600)', lineHeight: 1.5}}>
                Hosts complete an extra <b style={{color:'var(--ink)'}}>verification step</b> (ID + property documents) before listings go live — typically reviewed within 24 hours.
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — account */}
        {step === 2 && (
          <div>
            <div style={{display:'flex', gap: 10, marginBottom: 12}}>
              <SocialBtn provider="google" label="Sign up with Google"/>
            </div>
            <Divider label="or use your email"/>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
              <Field label="First name"><Input placeholder="Elif"/></Field>
              <Field label="Last name"><Input placeholder="Yılmaz"/></Field>
            </div>
            <Field label="Email"><Input icon="mail" type="email" placeholder="you@example.com"/></Field>
            <Field label="Phone" hint="We'll send a verification code by SMS.">
              <div style={{display:'flex', gap: 8}}>
                <select style={{height: 44, padding:'0 10px', borderRadius: 12, border:'1px solid var(--slate-200)', background:'var(--paper)', fontFamily:'inherit', fontSize: 14}}>
                  <option>🇹🇷 +90</option>
                  <option>🇬🇧 +44</option>
                  <option>🇺🇸 +1</option>
                </select>
                <div style={{flex: 1}}><Input placeholder="555 123 4567"/></div>
              </div>
            </Field>
            <Field label="Password" hint="At least 10 characters with a number and a symbol.">
              <Input icon="lock" type="password" placeholder="Create a strong password"/>
            </Field>
          </div>
        )}

        {/* STEP 3 — verify */}
        {step === 3 && (
          <div>
            {/* OTP */}
            <div style={{padding: 18, borderRadius: 16, background:'var(--slate-50)', border:'1px solid var(--slate-200)', marginBottom: 16}}>
              <div style={{fontSize: 13, fontWeight: 600, color:'var(--ink)', marginBottom: 4}}>Verify phone</div>
              <div style={{fontSize: 12.5, color:'var(--slate-600)', marginBottom: 12}}>Code sent to +90 555 ••• 4567 · <a style={{color:'var(--cta)', cursor:'pointer'}}>Resend</a></div>
              <div style={{display:'flex', gap: 8}}>
                {['4','9','2','7','1','3'].map((d, i) => (
                  <div key={i} style={{
                    width: 44, height: 52, borderRadius: 10,
                    border: i < 4 ? '1.5px solid var(--cta)' : '1px solid var(--slate-200)',
                    background: i < 4 ? 'var(--cta-soft)' : 'var(--paper)',
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-mono)', fontSize: 20, fontWeight: 600, color:'var(--ink)',
                  }}>{i < 4 ? d : ''}</div>
                ))}
              </div>
            </div>

            {/* ID upload */}
            <div style={{padding: 18, borderRadius: 16, border:'1.5px dashed var(--slate-300)', display:'flex', gap: 14, alignItems:'center', marginBottom: 16}}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background:'var(--grad-brand)', color:'white',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                flexShrink: 0,
              }}>
                <Icon name="shieldCheck" size={24} stroke="white"/>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 600, fontSize: 14, color:'var(--ink)'}}>Upload government ID</div>
                <div style={{fontSize: 12, color:'var(--slate-600)', marginTop: 2, lineHeight: 1.5}}>Passport, national ID, or driver's license. Encrypted, never shared.</div>
              </div>
              <button className="btn btn-outline" style={{padding:'9px 14px', fontSize: 13, borderRadius: 10}}>Upload</button>
            </div>

            {/* selfie */}
            <div style={{padding: 14, borderRadius: 12, background:'var(--paper)', border:'1px solid var(--slate-200)', display:'flex', gap: 12, alignItems:'center'}}>
              <div style={{
                width: 38, height: 38, borderRadius: 999,
                background:'var(--teal-100)', color:'var(--teal-600)',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon name="camera" size={16} stroke="currentColor"/>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 13, fontWeight: 600}}>Quick selfie check</div>
                <div style={{fontSize: 11.5, color:'var(--slate-500)'}}>Confirms it's really you. Takes ~10 seconds.</div>
              </div>
              <span className="chip" style={{background:'var(--teal-100)', color:'var(--teal-600)', fontSize: 11.5, fontWeight: 600}}>Optional</span>
            </div>

            <label style={{display:'flex', gap: 10, alignItems:'flex-start', marginTop: 18, fontSize: 12.5, color:'var(--slate-700)', cursor:'pointer', lineHeight: 1.5}}>
              <span style={{
                width: 16, height: 16, borderRadius: 5, marginTop: 2, flexShrink: 0,
                background:'var(--cta)', display:'inline-flex', alignItems:'center', justifyContent:'center',
              }}><Icon name="check" size={10} stroke="white" strokeWidth={3}/></span>
              I agree to evomstay's <a style={{color:'var(--ink)', textDecoration:'underline'}}>Community Standards</a> and consent to identity verification.
            </label>
          </div>
        )}

        {/* nav buttons */}
        <div style={{display:'flex', gap: 10, marginTop: 22}}>
          {step > 1 && (
            <button className="btn btn-outline" style={{flex:'0 0 auto', height: 46, borderRadius: 12, padding:'0 18px'}} onClick={()=>setStep(step-1)}>
              <Icon name="arrowLeft" size={15}/> Back
            </button>
          )}
          <button className="btn btn-primary" style={{flex: 1, height: 46, borderRadius: 12, fontSize: 14.5}} onClick={()=>setStep(Math.min(3, step+1))}>
            {step === 3 ? 'Submit for review' : 'Continue'} <Icon name="arrowRight" size={15} stroke="white"/>
          </button>
        </div>

        <div style={{marginTop: 18, fontSize: 13, color:'var(--slate-600)', textAlign:'center'}}>
          Already have an account? <a style={{color:'var(--cta)', fontWeight: 600, cursor:'pointer'}}>Sign in →</a>
        </div>
      </div>
    </AuthShell>
  );
};

export { LoginScreen, RegisterScreen }
export default LoginScreen

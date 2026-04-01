import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   SINGAPOREWEDDINGVENUES.NET — V14 SingaporeBrides Redesign
   Coral Pink + Pure White + Blush editorial palette
   ═══════════════════════════════════════════════════════════ */

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

:root {
  /* ── SingaporeBrides-Inspired Palette ── */
  --white:          #FFFFFF;
  --blush:          #FFF0ED;
  --blush-light:    #FFF8F5;
  --blush-pale:     #FFFBFA;

  --coral:          #E8837C;
  --coral-light:    #F2A9A4;
  --coral-pale:     #FADBD8;
  --coral-deep:     #D4625A;
  --coral-rich:     #C0504A;

  --warm-grey:      #6B6B6B;
  --grey:           #999999;
  --grey-light:     #D0D0D0;
  --grey-pale:      #EEEEEE;
  --grey-ghost:     #F7F7F7;

  --charcoal:       #333333;
  --charcoal-light: #555555;
  --dark:           #1E1E1E;

  --sage:           #A8C5A0;
  --sage-light:     #D4E4D0;
  --sky:            #8CB4D4;
  --gold-soft:      #D4B88C;

  /* Functional */
  --success:        #7FB77E;
  --warning:        #E5C07B;
  --error:          #D47070;

  /* Shadows */
  --shadow-sm:      0 1px 4px rgba(0,0,0,0.05);
  --shadow-md:      0 4px 16px rgba(0,0,0,0.07);
  --shadow-lg:      0 8px 32px rgba(0,0,0,0.09);
  --shadow-xl:      0 16px 48px rgba(0,0,0,0.11);
  --shadow-coral:   0 4px 20px rgba(232,131,124,0.18);

  /* Typography */
  --font-heading:   'Cormorant Garamond', Georgia, serif;
  --font-body:      'DM Sans', -apple-system, sans-serif;

  /* Spacing & Shape */
  --section-gap:    80px;
  --card-radius:    10px;
  --btn-radius:     6px;
  --pill-radius:    999px;

  /* Transitions */
  --ease:           cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --fast:           180ms;
  --base:           320ms;
  --slow:           550ms;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  color: var(--charcoal);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}

/* ── Scroll Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.04); }
}
@keyframes heroZoom {
  0%   { transform: scale(1); }
  100% { transform: scale(1.06); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes coraldot {
  0%, 100% { opacity: 0.3; }
  50%      { opacity: 0.8; }
}
@keyframes progressBar {
  from { width: 0%; }
  to   { width: 100%; }
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Coral shimmer on hover */
.card-shimmer {
  position: relative;
  overflow: hidden;
}
.card-shimmer::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--coral-light), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s var(--ease);
}
.card-shimmer:hover::after {
  transform: translateX(100%);
}
`;

/* ═══════════════════ VENUE DATA ═══════════════════ */
const VENUES = [
  { id:"raffles-hotel", name:"Raffles Hotel Singapore", category:"hotel", location:"City Hall", capacity:{min:30,max:500}, cuisine:["International","Chinese"], setting:"both", solemnisation:true, features:["Heritage icon since 1887","Grand ballroom with 7m ceilings","Tropical courtyard gardens"], description:"Singapore's most storied luxury hotel offers timeless elegance for weddings of every scale.", rating:4.9, featured:true },
  { id:"fullerton-hotel", name:"The Fullerton Hotel", category:"hotel", location:"Marina Bay", capacity:{min:20,max:400}, cuisine:["International","Chinese"], setting:"both", solemnisation:true, features:["Neoclassical heritage building","Marina Bay waterfront views","Pillarless ballroom"], description:"A magnificent neoclassical landmark overlooking Marina Bay transforms postal heritage into a breathtaking wedding backdrop.", rating:4.8, featured:true },
  { id:"capella-singapore", name:"Capella Singapore", category:"hotel", location:"Sentosa Island", capacity:{min:20,max:280}, cuisine:["International","Chinese","Modern European"], setting:"both", solemnisation:true, features:["Sentosa island resort","Foster + Partners design","Ultra-private and exclusive"], description:"Amid 30 acres of Sentosa rainforest, Capella blends colonial grandeur with contemporary luxury.", rating:4.9, featured:true },
  { id:"marina-bay-sands", name:"Marina Bay Sands", category:"hotel", location:"Marina Bay", capacity:{min:50,max:1200}, cuisine:["International","Chinese","Western"], setting:"both", solemnisation:true, features:["Iconic Singapore landmark","Multiple ballrooms","SkyPark ceremonies"], description:"The world's most photographed hotel offers unparalleled scale and spectacle for grand celebrations.", rating:4.7, featured:true },
  { id:"1-arden", name:"1-Arden", category:"rooftop", location:"Marina Bay", capacity:{min:30,max:200}, cuisine:["Modern Asian","Western"], setting:"both", solemnisation:true, features:["51st floor food forest","360° Marina Bay views","Singapore's highest restaurant"], description:"Say 'I do' at Singapore's highest food forest with sweeping 360-degree views of the Marina Bay skyline.", rating:4.8, featured:true },
  { id:"1-altitude", name:"1-Altitude", category:"rooftop", location:"Raffles Place", capacity:{min:50,max:350}, cuisine:["International","Western"], setting:"both", solemnisation:true, features:["World's highest alfresco bar","Panoramic city views","Three distinct levels"], description:"At 282 metres above sea level, celebrate your love at the pinnacle of Singapore's skyline.", rating:4.7, featured:true },
  { id:"oumi", name:"Oumi", category:"restaurant", location:"Tanjong Pagar", capacity:{min:20,max:80}, cuisine:["Modern Japanese"], setting:"indoor", solemnisation:false, features:["Omakase wedding menus","Intimate luxury dining","Japanese zen aesthetics"], description:"An intimate modern Japanese sanctuary for couples seeking refined omakase-style wedding celebrations.", rating:4.8, featured:false },
  { id:"the-clifford-pier", name:"The Clifford Pier", category:"heritage", location:"Fullerton Bay", capacity:{min:30,max:250}, cuisine:["Modern Asian","International"], setting:"both", solemnisation:true, features:["Heritage waterfront pier","Marina Bay views","Art Deco architecture"], description:"This beautifully restored landing point on Marina Bay offers dramatic Art Deco grandeur.", rating:4.7, featured:true },
  { id:"national-gallery", name:"National Gallery Singapore", category:"heritage", location:"City Hall", capacity:{min:50,max:400}, cuisine:["International","Western"], setting:"both", solemnisation:true, features:["Former Supreme Court","World-class art museum","Rooftop terrace"], description:"Two national monuments house Southeast Asia's largest art collection — and your unforgettable celebration.", rating:4.8, featured:false },
  { id:"chijmes", name:"CHIJMES", category:"heritage", location:"City Hall", capacity:{min:30,max:300}, cuisine:["International","Asian"], setting:"both", solemnisation:true, features:["Gothic chapel","Beautiful courtyard","Heritage dining hall"], description:"A stunning 19th-century convent chapel and courtyard that creates fairytale wedding moments in the city centre.", rating:4.6, featured:true },
  { id:"one-farrer", name:"One Farrer Hotel", category:"hotel", location:"Farrer Park", capacity:{min:30,max:500}, cuisine:["International","Chinese"], setting:"both", solemnisation:true, features:["Urban resort concept","Lush Sky Gardens","Multiple event spaces"], description:"An urban resort with lush gardens, versatile ballrooms, and a dedicated wedding planning team.", rating:4.5, featured:false },
  { id:"shangrila-singapore", name:"Shangri-La Singapore", category:"hotel", location:"Orange Grove Road", capacity:{min:30,max:600}, cuisine:["International","Chinese","Asian"], setting:"both", solemnisation:true, features:["15 acres of gardens","Iconic Island Ballroom","Valley Wing luxury"], description:"Set amidst 15 acres of tropical gardens, this legendary property blends natural beauty with grand-scale celebrations.", rating:4.8, featured:true },
  { id:"ritz-carlton", name:"The Ritz-Carlton Millenia", category:"hotel", location:"Marina Bay", capacity:{min:30,max:500}, cuisine:["International","Chinese","Western"], setting:"both", solemnisation:true, features:["Marina Bay panorama","Modern art collection","Grand Ballroom"], description:"Contemporary luxury with panoramic Marina Bay views and one of Asia's finest modern art collections.", rating:4.8, featured:false },
  { id:"mandarin-oriental", name:"Mandarin Oriental Singapore", category:"hotel", location:"Marina Bay", capacity:{min:20,max:400}, cuisine:["International","Chinese"], setting:"both", solemnisation:true, features:["Fan-shaped architecture","Marina Bay frontage","Intimate and grand options"], description:"An iconic fan-shaped landmark on Marina Bay offering both intimate and grand wedding celebrations.", rating:4.7, featured:false },
  { id:"andaz-singapore", name:"Andaz Singapore", category:"hotel", location:"Bugis", capacity:{min:20,max:300}, cuisine:["International","Asian","Western"], setting:"both", solemnisation:true, features:["Hyatt lifestyle brand","Rooftop pool bar","Local neighbourhood vibe"], description:"A vibrant lifestyle hotel that blends Singapore's cultural tapestry with contemporary design.", rating:4.6, featured:false },
  { id:"sol-and-luna", name:"Sol & Luna", category:"restaurant", location:"Dempsey Hill", capacity:{min:20,max:120}, cuisine:["Modern European","Mediterranean"], setting:"both", solemnisation:true, features:["Dempsey Hill charm","Garden dining","Mediterranean warmth"], description:"Nestled in Dempsey Hill's lush greenery, Sol & Luna offers Mediterranean warmth for intimate celebrations.", rating:4.5, featured:false },
  { id:"flower-dome", name:"Flower Dome, Gardens by the Bay", category:"garden", location:"Marina Bay", capacity:{min:100,max:500}, cuisine:["Varies by caterer"], setting:"indoor", solemnisation:true, features:["World's largest greenhouse","Stunning floral displays","Iconic Supertree backdrop"], description:"The world's largest glass greenhouse transforms into a magical garden wonderland for grand celebrations.", rating:4.8, featured:true },
  { id:"hortpark", name:"HortPark", category:"garden", location:"Southern Ridges", capacity:{min:30,max:200}, cuisine:["Varies by caterer"], setting:"outdoor", solemnisation:true, features:["Lush garden setting","Southern Ridges connection","Open-air ceremonies"], description:"A gardening hub along the Southern Ridges offering lush, open-air ceremony spaces amid tropical blooms.", rating:4.4, featured:false },
  { id:"fort-canning", name:"Fort Canning Hotel", category:"heritage", location:"Fort Canning", capacity:{min:20,max:200}, cuisine:["International","Asian"], setting:"both", solemnisation:true, features:["Heritage hilltop setting","Lush park surrounds","Colonial-era charm"], description:"A heritage gem atop Fort Canning Hill, surrounded by centuries-old trees and romantic park pathways.", rating:4.5, featured:false },
  { id:"pan-pacific", name:"Pan Pacific Singapore", category:"hotel", location:"Marina Bay", capacity:{min:30,max:600}, cuisine:["International","Chinese"], setting:"both", solemnisation:true, features:["Marina Bay views","Pacific Ballroom","Skyline terrace"], description:"Modern luxury overlooking Marina Bay with one of Singapore's most versatile ballroom configurations.", rating:4.6, featured:false },
];

const CATEGORIES = [
  { id:"all", label:"All Venues", icon:"✨" },
  { id:"hotel", label:"Hotels & Resorts", icon:"🏨" },
  { id:"rooftop", label:"Rooftops", icon:"🌆" },
  { id:"garden", label:"Gardens", icon:"🌿" },
  { id:"heritage", label:"Heritage", icon:"🏛️" },
  { id:"restaurant", label:"Restaurants", icon:"🍽️" },
];

const GRADIENTS = {
  hotel:"linear-gradient(135deg, #F2D7D5 0%, #E8837C 100%)",
  rooftop:"linear-gradient(135deg, #D6EAF8 0%, #85929E 100%)",
  garden:"linear-gradient(135deg, #D5F5E3 0%, #82E0AA 100%)",
  heritage:"linear-gradient(135deg, #F9E79F 0%, #D4AC0D 100%)",
  restaurant:"linear-gradient(135deg, #FADBD8 0%, #E8837C 100%)",
  beachfront:"linear-gradient(135deg, #D1F2EB 0%, #48C9B0 100%)",
  ballroom:"linear-gradient(135deg, #E8DAEF 0%, #AF7AC5 100%)",
};

const HERO_SLIDES = [
  { title:"Discover Your Dream\nWedding Venue", subtitle:"Singapore's most comprehensive venue guide with AI-powered planning tools", cta:"Explore Venues", gradient:"linear-gradient(135deg, #E8837C 0%, #F2A9A4 40%, #FFF0ED 100%)" },
  { title:"Rooftop Romance\nAbove the City", subtitle:"Say 'I do' with panoramic skyline views at Singapore's most breathtaking heights", cta:"View Rooftops", gradient:"linear-gradient(135deg, #85929E 0%, #AEB6BF 40%, #D6EAF8 100%)" },
  { title:"Garden Celebrations\nAmid Tropical Beauty", subtitle:"Exchange vows surrounded by lush greenery and stunning floral displays", cta:"Explore Gardens", gradient:"linear-gradient(135deg, #82E0AA 0%, #A9DFBF 40%, #D5F5E3 100%)" },
  { title:"Heritage Elegance\nTimeless Settings", subtitle:"Celebrate in Singapore's most iconic historical landmarks and restored buildings", cta:"View Heritage", gradient:"linear-gradient(135deg, #D4AC0D 0%, #F0E68C 40%, #FFF8DC 100%)" },
];

const BLOG_POSTS = [
  { id:1, title:"8 Stunning Rooftop Wedding Venues You Need to See", category:"Venues", excerpt:"From 1-Arden's 51st floor food forest to 1-Altitude's world-famous sky bar — discover Singapore's most breathtaking rooftop celebrations." },
  { id:2, title:"Your Complete Guide to Chinese Tea Ceremony Etiquette", category:"Traditions", excerpt:"Everything you need to know about this cherished Chinese wedding tradition, from preparation to the perfect tea set." },
  { id:3, title:"How to Plan a Garden Solemnisation in Singapore", category:"Planning", excerpt:"ROM-licensed outdoor venues, weather contingency plans, and decor ideas for your dream garden wedding." },
  { id:4, title:"2026 Wedding Trends Every Singapore Bride Should Know", category:"Trends", excerpt:"Sustainability, AI wedding planning, micro-weddings, and the return of maximalist florals." },
];

const REAL_WEDDINGS = [
  { couple:"Sarah & James", venue:"1-Arden", guests:120, style:"Modern Rooftop" },
  { couple:"Wei Lin & Darren", venue:"Raffles Hotel", guests:350, style:"Grand Heritage" },
  { couple:"Priya & Vikram", venue:"Capella Singapore", guests:80, style:"Intimate Tropical" },
];

/* ═══════════════════ HOOKS ═══════════════════ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════ COMPONENTS ═══════════════════ */

/* ── Navigation ── */
function Nav({ activePage, setActivePage, scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pages = [
    { id:"home", label:"Home" },
    { id:"venues", label:"Venues" },
    { id:"ai-tools", label:"AI Tools" },
    { id:"real-weddings", label:"Real Weddings" },
    { id:"blog", label:"Blog" },
  ];
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
      backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
      borderBottom: scrolled ? '1px solid #eee' : '1px solid transparent',
      transition:'all 0.3s ease',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
    }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
        {/* Logo */}
        <div style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:8 }} onClick={() => setActivePage('home')}>
          <span style={{ fontFamily:'var(--font-heading)', fontSize:22, fontWeight:600, color:'var(--coral)', letterSpacing:'-0.02em' }}>SWV</span>
          <span style={{ fontFamily:'var(--font-body)', fontSize:11, color:'var(--warm-grey)', letterSpacing:'0.06em', textTransform:'uppercase', fontWeight:500 }}>Singapore Wedding Venues</span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display:'flex', alignItems:'center', gap:32 }} className="desktop-nav">
          {pages.map(p => (
            <button key={p.id} onClick={() => setActivePage(p.id)} style={{
              background:'none', border:'none', cursor:'pointer',
              fontFamily:'var(--font-body)', fontSize:14, fontWeight: activePage === p.id ? 600 : 500,
              color: activePage === p.id ? 'var(--coral)' : 'var(--charcoal)',
              letterSpacing:'0.02em', padding:'4px 0',
              borderBottom: activePage === p.id ? '2px solid var(--coral)' : '2px solid transparent',
              transition:'all 0.25s ease',
            }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <button onClick={() => setActivePage('venues')} style={{
            background:'var(--coral)', color:'var(--white)', border:'none', cursor:'pointer',
            padding:'10px 22px', borderRadius:'var(--btn-radius)',
            fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, letterSpacing:'0.03em',
            transition:'all 0.2s ease',
          }}
            onMouseEnter={e => { e.target.style.background='var(--coral-deep)'; e.target.style.transform='translateY(-1px)'; e.target.style.boxShadow='var(--shadow-coral)'; }}
            onMouseLeave={e => { e.target.style.background='var(--coral)'; e.target.style.transform='translateY(0)'; e.target.style.boxShadow='none'; }}
          >
            Find My Venue
          </button>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            background:'none', border:'none', cursor:'pointer', padding:8,
            display:'none',
          }} className="hamburger-btn">
            <div style={{ width:20, height:2, background:'var(--charcoal)', marginBottom:5, transition:'0.3s' }} />
            <div style={{ width:20, height:2, background:'var(--charcoal)', marginBottom:5, transition:'0.3s' }} />
            <div style={{ width:20, height:2, background:'var(--charcoal)', transition:'0.3s' }} />
          </button>
        </div>
      </div>

      {/* Coral accent line */}
      <div style={{ height:2, background:'linear-gradient(90deg, var(--coral), var(--coral-light), var(--coral))', opacity: scrolled ? 1 : 0, transition:'opacity 0.3s' }} />
    </nav>
  );
}

/* ── Hero Carousel ── */
function HeroCarousel({ setActivePage }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % HERO_SLIDES.length);
      setProgress(0);
    }, 6000);
    const tick = setInterval(() => setProgress(p => Math.min(p + 1.67, 100)), 100);
    return () => { clearInterval(interval); clearInterval(tick); };
  }, [current]);

  const slide = HERO_SLIDES[current];
  return (
    <section style={{
      position:'relative', height:'70vh', minHeight:480, maxHeight:680,
      background: slide.gradient,
      display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'hidden', transition:'background 1s ease',
    }}>
      {/* Decorative circles */}
      <div style={{ position:'absolute', top:'-10%', right:'-5%', width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,0.08)', animation:'float 8s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'rgba(255,255,255,0.05)', animation:'float 10s ease-in-out infinite 2s' }} />
      <div style={{ position:'absolute', top:'30%', left:'20%', width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.06)', animation:'float 7s ease-in-out infinite 1s' }} />

      {/* Content */}
      <div style={{ position:'relative', zIndex:2, textAlign:'center', maxWidth:700, padding:'0 24px' }}>
        <h1 key={current} style={{
          fontFamily:'var(--font-heading)', fontWeight:300, fontSize:'clamp(2rem, 5vw, 3.5rem)',
          color:'var(--white)', lineHeight:1.15, letterSpacing:'-0.02em',
          whiteSpace:'pre-line', textShadow:'0 2px 20px rgba(0,0,0,0.08)',
          animation:'fadeUp 0.8s ease forwards',
        }}>
          {slide.title}
        </h1>
        <p key={`sub-${current}`} style={{
          fontFamily:'var(--font-body)', fontSize:'clamp(0.9rem, 2vw, 1.1rem)',
          color:'rgba(255,255,255,0.9)', marginTop:20, lineHeight:1.6, maxWidth:550, margin:'20px auto 0',
          animation:'fadeUp 0.8s ease 0.2s both',
        }}>
          {slide.subtitle}
        </p>
        <button onClick={() => setActivePage('venues')} style={{
          marginTop:32, padding:'14px 36px', background:'var(--white)', color:'var(--coral)',
          border:'none', borderRadius:'var(--btn-radius)', cursor:'pointer',
          fontFamily:'var(--font-body)', fontSize:15, fontWeight:600, letterSpacing:'0.03em',
          boxShadow:'0 4px 20px rgba(0,0,0,0.1)', transition:'all 0.3s ease',
          animation:'fadeUp 0.8s ease 0.4s both',
        }}
          onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 8px 30px rgba(0,0,0,0.15)'; }}
          onMouseLeave={e => { e.target.style.transform='translateY(0)'; e.target.style.boxShadow='0 4px 20px rgba(0,0,0,0.1)'; }}
        >
          {slide.cta} →
        </button>
      </div>

      {/* Dots + Progress */}
      <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', gap:10 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); setProgress(0); }} style={{
              width: i === current ? 28 : 8, height:8, borderRadius:4,
              background: i === current ? 'var(--white)' : 'rgba(255,255,255,0.4)',
              border:'none', cursor:'pointer', transition:'all 0.4s ease',
            }} />
          ))}
        </div>
        <div style={{ width:120, height:2, background:'rgba(255,255,255,0.2)', borderRadius:1, overflow:'hidden' }}>
          <div style={{ height:'100%', background:'var(--white)', width:`${progress}%`, transition:'width 0.1s linear' }} />
        </div>
      </div>
    </section>
  );
}

/* ── Quick Search Strip ── */
function QuickSearch({ setActivePage, setSearchFilters }) {
  const [guests, setGuests] = useState('');
  const [style, setStyle] = useState('');
  return (
    <section style={{ background:'var(--blush)', padding:'28px 24px', borderBottom:'1px solid var(--coral-pale)' }}>
      <div style={{ maxWidth:900, margin:'0 auto', display:'flex', flexWrap:'wrap', gap:12, alignItems:'center', justifyContent:'center' }}>
        <input value={guests} onChange={e => setGuests(e.target.value)} placeholder="Guest count" type="number" style={{
          flex:'1 1 140px', padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--coral-pale)',
          fontFamily:'var(--font-body)', fontSize:14, outline:'none', background:'var(--white)',
          transition:'border-color 0.2s',
        }}
          onFocus={e => e.target.style.borderColor='var(--coral)'}
          onBlur={e => e.target.style.borderColor='var(--coral-pale)'}
        />
        <select value={style} onChange={e => setStyle(e.target.value)} style={{
          flex:'1 1 160px', padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--coral-pale)',
          fontFamily:'var(--font-body)', fontSize:14, outline:'none', background:'var(--white)',
          color: style ? 'var(--charcoal)' : 'var(--grey)', appearance:'none', cursor:'pointer',
        }}>
          <option value="">Venue style</option>
          <option value="hotel">Hotel & Resort</option>
          <option value="rooftop">Rooftop</option>
          <option value="garden">Garden & Outdoor</option>
          <option value="heritage">Heritage</option>
          <option value="restaurant">Restaurant</option>
        </select>
        <select style={{
          flex:'1 1 160px', padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--coral-pale)',
          fontFamily:'var(--font-body)', fontSize:14, outline:'none', background:'var(--white)', color:'var(--grey)',
        }}>
          <option>Location</option>
          <option>Marina Bay</option>
          <option>City Hall</option>
          <option>Sentosa</option>
          <option>Orchard</option>
          <option>Dempsey Hill</option>
        </select>
        <button onClick={() => { setActivePage('venues'); }} style={{
          padding:'12px 32px', background:'var(--coral)', color:'var(--white)', border:'none',
          borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)',
          fontSize:14, fontWeight:600, letterSpacing:'0.03em', transition:'all 0.2s ease',
          whiteSpace:'nowrap',
        }}
          onMouseEnter={e => { e.target.style.background='var(--coral-deep)'; }}
          onMouseLeave={e => { e.target.style.background='var(--coral)'; }}
        >
          Search Venues
        </button>
      </div>
    </section>
  );
}

/* ── Venue Card ── */
function VenueCard({ venue, onClick, delay = 0 }) {
  const ref = useReveal();
  const grad = GRADIENTS[venue.category] || GRADIENTS.hotel;
  return (
    <div ref={ref} className="reveal card-shimmer" onClick={onClick} style={{
      background:'var(--white)', borderRadius:'var(--card-radius)', overflow:'hidden',
      boxShadow:'var(--shadow-sm)', cursor:'pointer',
      transition:'all 0.35s ease', transitionDelay:`${delay}ms`,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
    >
      {/* Image placeholder */}
      <div style={{
        aspectRatio:'4/3', background:grad, position:'relative', overflow:'hidden',
        display:'flex', alignItems:'flex-end', justifyContent:'flex-start', padding:16,
      }}>
        {/* Category badge */}
        <span style={{
          position:'absolute', top:12, left:12, background:'var(--white)', color:'var(--coral)',
          padding:'4px 12px', borderRadius:'var(--pill-radius)', fontFamily:'var(--font-body)',
          fontSize:11, fontWeight:600, letterSpacing:'0.05em', textTransform:'uppercase',
        }}>
          {CATEGORIES.find(c => c.id === venue.category)?.icon} {venue.category}
        </span>
        {/* Rating */}
        <span style={{
          position:'absolute', top:12, right:12, background:'rgba(255,255,255,0.9)', color:'var(--charcoal)',
          padding:'4px 10px', borderRadius:'var(--pill-radius)', fontFamily:'var(--font-body)',
          fontSize:12, fontWeight:600,
        }}>
          ★ {venue.rating}
        </span>
        {/* Venue name overlay */}
        <span style={{
          fontFamily:'var(--font-heading)', fontSize:20, fontWeight:500, color:'var(--white)',
          textShadow:'0 2px 12px rgba(0,0,0,0.2)', lineHeight:1.2,
        }}>
          {venue.name}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding:'16px 18px 18px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--warm-grey)' }}>📍 {venue.location}</span>
          <span style={{ color:'var(--grey-light)' }}>·</span>
          <span style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--warm-grey)' }}>👥 {venue.capacity.min}–{venue.capacity.max}</span>
          {venue.solemnisation && <>
            <span style={{ color:'var(--grey-light)' }}>·</span>
            <span style={{ fontFamily:'var(--font-body)', fontSize:11, color:'var(--sage)', fontWeight:600 }}>ROM ✓</span>
          </>}
        </div>
        <p style={{
          fontFamily:'var(--font-body)', fontSize:13, color:'var(--warm-grey)', lineHeight:1.5,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>
          {venue.description}
        </p>
        <button style={{
          marginTop:14, padding:'8px 20px', background:'transparent', color:'var(--coral)',
          border:'1.5px solid var(--coral)', borderRadius:'var(--btn-radius)', cursor:'pointer',
          fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, letterSpacing:'0.02em',
          transition:'all 0.2s ease', width:'100%',
        }}
          onMouseEnter={e => { e.target.style.background='var(--coral)'; e.target.style.color='var(--white)'; }}
          onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.color='var(--coral)'; }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

/* ── Venue Detail Modal ── */
function VenueDetail({ venue, onClose }) {
  if (!venue) return null;
  const grad = GRADIENTS[venue.category] || GRADIENTS.hotel;
  return (
    <div style={{ position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={onClose}>
      <div style={{ background:'var(--white)', borderRadius:16, maxWidth:700, width:'100%', maxHeight:'85vh', overflow:'auto', animation:'fadeUp 0.4s ease' }} onClick={e => e.stopPropagation()}>
        <div style={{ height:240, background:grad, position:'relative', display:'flex', alignItems:'flex-end', padding:28, borderRadius:'16px 16px 0 0' }}>
          <button onClick={onClose} style={{ position:'absolute', top:16, right:16, width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          <div>
            <span style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.8)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{venue.category}</span>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:32, fontWeight:400, color:'var(--white)', marginTop:4, textShadow:'0 2px 12px rgba(0,0,0,0.15)' }}>{venue.name}</h2>
          </div>
        </div>
        <div style={{ padding:28 }}>
          {/* Stats grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:16, marginBottom:24 }}>
            {[
              { label:'Location', value:venue.location },
              { label:'Capacity', value:`${venue.capacity.min}–${venue.capacity.max} guests` },
              { label:'Setting', value:venue.setting },
              { label:'Rating', value:`★ ${venue.rating} / 5.0` },
            ].map(s => (
              <div key={s.label} style={{ background:'var(--blush-light)', padding:'14px 16px', borderRadius:8 }}>
                <div style={{ fontFamily:'var(--font-body)', fontSize:11, color:'var(--grey)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>{s.label}</div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--charcoal)', fontWeight:500 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', lineHeight:1.7, marginBottom:20 }}>{venue.description}</p>
          <h3 style={{ fontFamily:'var(--font-heading)', fontSize:22, fontWeight:500, color:'var(--charcoal)', marginBottom:12 }}>Key Features</h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
            {venue.features.map((f, i) => (
              <span key={i} style={{ background:'var(--blush)', color:'var(--coral-deep)', padding:'6px 14px', borderRadius:'var(--pill-radius)', fontFamily:'var(--font-body)', fontSize:13, fontWeight:500 }}>{f}</span>
            ))}
          </div>
          <h3 style={{ fontFamily:'var(--font-heading)', fontSize:22, fontWeight:500, color:'var(--charcoal)', marginBottom:12 }}>Cuisine</h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--warm-grey)', marginBottom:24 }}>{venue.cuisine.join(' · ')}</p>
          <button style={{
            width:'100%', padding:'14px', background:'var(--coral)', color:'var(--white)', border:'none',
            borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
            transition:'all 0.2s', letterSpacing:'0.02em',
          }}
            onMouseEnter={e => e.target.style.background='var(--coral-deep)'}
            onMouseLeave={e => e.target.style.background='var(--coral)'}
          >
            Enquire About This Venue
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ PAGE SECTIONS ═══════════════════ */

/* ── Homepage ── */
function HomePage({ setActivePage }) {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const featuredVenues = VENUES.filter(v => v.featured).slice(0, 6);
  const ref1 = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();
  const ref4 = useReveal();

  return (
    <>
      <HeroCarousel setActivePage={setActivePage} />
      <QuickSearch setActivePage={setActivePage} />

      {/* Featured Venues */}
      <section style={{ background:'var(--white)', padding:'60px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div ref={ref1} className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, color:'var(--coral)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Curated For You</span>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight:400, color:'var(--charcoal)', marginTop:8 }}>Featured Wedding Venues</h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', marginTop:12, maxWidth:500, margin:'12px auto 0' }}>
              Discover Singapore's most sought-after wedding venues, handpicked by our editorial team
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
            {featuredVenues.map((v, i) => (
              <VenueCard key={v.id} venue={v} delay={i * 80} onClick={() => setSelectedVenue(v)} />
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:40 }}>
            <button onClick={() => setActivePage('venues')} style={{
              padding:'14px 40px', background:'transparent', color:'var(--coral)', border:'2px solid var(--coral)',
              borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:15,
              fontWeight:600, letterSpacing:'0.03em', transition:'all 0.25s ease',
            }}
              onMouseEnter={e => { e.target.style.background='var(--coral)'; e.target.style.color='var(--white)'; }}
              onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.color='var(--coral)'; }}
            >
              View All {VENUES.length} Venues →
            </button>
          </div>
        </div>
      </section>

      {/* AI Tools Promo */}
      <section style={{ background:'var(--blush)', padding:'60px 24px' }}>
        <div ref={ref2} className="reveal" style={{ maxWidth:1000, margin:'0 auto', textAlign:'center' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, color:'var(--coral)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Powered by AI</span>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight:400, color:'var(--charcoal)', marginTop:8 }}>Smart Wedding Planning Tools</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', marginTop:12, maxWidth:550, margin:'12px auto 0' }}>
            Let our AI-powered tools help you find the perfect venue, plan your budget, and create your dream timeline
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:20, marginTop:40 }}>
            {[
              { icon:'💍', title:'Venue Matchmaker', desc:'Tell us your style and we\'ll find your perfect match' },
              { icon:'💰', title:'Budget Calculator', desc:'AI-powered Singapore wedding cost breakdown' },
              { icon:'📅', title:'Timeline Generator', desc:'Custom day-of schedule with local customs' },
              { icon:'⚖️', title:'Venue Comparison', desc:'Side-by-side venue comparison with AI insights' },
            ].map((tool, i) => (
              <div key={i} onClick={() => setActivePage('ai-tools')} style={{
                background:'var(--white)', padding:28, borderRadius:'var(--card-radius)',
                textAlign:'center', cursor:'pointer', boxShadow:'var(--shadow-sm)',
                transition:'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
              >
                <div style={{ fontSize:32, marginBottom:12 }}>{tool.icon}</div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:20, fontWeight:500, color:'var(--charcoal)', marginBottom:8 }}>{tool.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--warm-grey)', lineHeight:1.5 }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Weddings Preview */}
      <section style={{ background:'var(--white)', padding:'60px 24px' }}>
        <div ref={ref3} className="reveal" style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, color:'var(--coral)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Inspiration</span>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight:400, color:'var(--charcoal)', marginTop:8 }}>Real Wedding Stories</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20 }}>
            {REAL_WEDDINGS.map((w, i) => (
              <div key={i} style={{
                background:'var(--blush-light)', padding:24, borderRadius:'var(--card-radius)',
                border:'1px solid var(--coral-pale)', transition:'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--coral-light)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--coral-pale)'; e.currentTarget.style.boxShadow='none'; }}
              >
                <span style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'var(--coral)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{w.style}</span>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:24, fontWeight:500, color:'var(--charcoal)', marginTop:6 }}>{w.couple}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--warm-grey)', marginTop:8 }}>at {w.venue} · {w.guests} guests</p>
                <button style={{
                  marginTop:16, padding:'8px 20px', background:'transparent', color:'var(--coral)',
                  border:'1.5px solid var(--coral)', borderRadius:'var(--btn-radius)', cursor:'pointer',
                  fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, transition:'all 0.2s',
                }}
                  onMouseEnter={e => { e.target.style.background='var(--coral)'; e.target.style.color='var(--white)'; }}
                  onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.color='var(--coral)'; }}
                >
                  Read Their Story →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section style={{ background:'var(--blush-pale)', padding:'60px 24px' }}>
        <div ref={ref4} className="reveal" style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, color:'var(--coral)', letterSpacing:'0.08em', textTransform:'uppercase' }}>From The Blog</span>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight:400, color:'var(--charcoal)', marginTop:8 }}>Wedding Guides & Inspiration</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20 }}>
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <div key={post.id} style={{
                background:'var(--white)', padding:24, borderRadius:'var(--card-radius)',
                boxShadow:'var(--shadow-sm)', transition:'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
              >
                <span style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'var(--coral)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{post.category}</span>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:20, fontWeight:500, color:'var(--charcoal)', marginTop:8, lineHeight:1.3 }}>{post.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--warm-grey)', marginTop:10, lineHeight:1.6 }}>{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background:'var(--coral)', padding:'48px 24px' }}>
        <div style={{ maxWidth:600, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:28, fontWeight:400, color:'var(--white)' }}>Stay Inspired</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.85)', marginTop:8 }}>
            Get the latest venue deals, wedding trends, and planning tips delivered to your inbox
          </p>
          <div style={{ display:'flex', gap:10, marginTop:24, maxWidth:440, margin:'24px auto 0' }}>
            <input placeholder="Your email address" style={{
              flex:1, padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'none',
              fontFamily:'var(--font-body)', fontSize:14, outline:'none',
            }} />
            <button style={{
              padding:'12px 24px', background:'var(--white)', color:'var(--coral)', border:'none',
              borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)',
              fontSize:14, fontWeight:600, whiteSpace:'nowrap',
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <VenueDetail venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
    </>
  );
}

/* ── Venues Directory ── */
function VenuesPage() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  let filtered = filter === 'all' ? VENUES : VENUES.filter(v => v.category === filter);
  if (searchTerm) filtered = filtered.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.location.toLowerCase().includes(searchTerm.toLowerCase()));
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (sort === 'capacity') filtered.sort((a, b) => b.capacity.max - a.capacity.max);
  if (sort === 'featured') filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section style={{ paddingTop:80, background:'var(--white)', minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ background:'var(--blush)', padding:'40px 24px 32px', borderBottom:'1px solid var(--coral-pale)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', textAlign:'center' }}>
          <h1 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2rem, 4vw, 2.8rem)', fontWeight:300, color:'var(--charcoal)' }}>Wedding Venue Directory</h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', marginTop:8 }}>
            Explore {VENUES.length} carefully curated venues across Singapore
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'24px 24px 0' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16, justifyContent:'center' }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)} style={{
              padding:'8px 18px', borderRadius:'var(--pill-radius)', border:'none', cursor:'pointer',
              fontFamily:'var(--font-body)', fontSize:13, fontWeight: filter === c.id ? 600 : 500,
              background: filter === c.id ? 'var(--coral)' : 'var(--grey-ghost)',
              color: filter === c.id ? 'var(--white)' : 'var(--charcoal)',
              transition:'all 0.2s ease',
            }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search venues..." style={{
            flex:'1 1 200px', padding:'10px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--grey-pale)',
            fontFamily:'var(--font-body)', fontSize:14, outline:'none', maxWidth:300,
          }}
            onFocus={e => e.target.style.borderColor='var(--coral)'}
            onBlur={e => e.target.style.borderColor='var(--grey-pale)'}
          />
          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            padding:'10px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--grey-pale)',
            fontFamily:'var(--font-body)', fontSize:13, outline:'none', background:'var(--white)', cursor:'pointer',
          }}>
            <option value="featured">Featured First</option>
            <option value="name">A–Z</option>
            <option value="rating">Highest Rated</option>
            <option value="capacity">Largest Capacity</option>
          </select>
          <span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--grey)' }}>{filtered.length} venues</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(310px, 1fr))', gap:24 }}>
          {filtered.map((v, i) => (
            <VenueCard key={v.id} venue={v} delay={i * 60} onClick={() => setSelectedVenue(v)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:16, color:'var(--grey)' }}>No venues match your filters. Try broadening your search.</p>
          </div>
        )}
      </div>
      <VenueDetail venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
    </section>
  );
}

/* ── AI Tools Hub ── */
function AIToolsPage() {
  const [activeTool, setActiveTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [inputs, setInputs] = useState({ guests:'', style:'', budget:'50000', date:'', venue1:'', venue2:'' });

  const callClaude = async (system, user) => {
    setLoading(true); setResult('');
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system, messages:[{role:"user",content:user}] })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || 'No response received.');
    } catch { setResult('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const tools = [
    { id:'matchmaker', icon:'💍', title:'AI Venue Matchmaker', desc:'Tell us your preferences and we\'ll recommend the perfect venues', color:'var(--coral)' },
    { id:'budget', icon:'💰', title:'Budget Calculator', desc:'Get an AI-powered cost breakdown for your Singapore wedding', color:'var(--sage)' },
    { id:'timeline', icon:'📅', title:'Timeline Generator', desc:'Create a custom day-of schedule with Singapore wedding customs', color:'var(--sky)' },
    { id:'compare', icon:'⚖️', title:'Venue Comparison', desc:'Compare two venues side-by-side with AI analysis', color:'var(--gold-soft)' },
  ];

  return (
    <section style={{ paddingTop:80, background:'var(--white)', minHeight:'100vh' }}>
      <div style={{ background:'var(--blush)', padding:'40px 24px 32px', borderBottom:'1px solid var(--coral-pale)', textAlign:'center' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2rem, 4vw, 2.8rem)', fontWeight:300, color:'var(--charcoal)' }}>AI Wedding Planning Tools</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', marginTop:8 }}>Powered by Claude AI — get personalised recommendations in seconds</p>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'40px 24px 60px' }}>
        {!activeTool ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:20 }}>
            {tools.map(t => (
              <div key={t.id} onClick={() => { setActiveTool(t.id); setResult(''); }} style={{
                background:'var(--white)', padding:28, borderRadius:'var(--card-radius)', textAlign:'center',
                cursor:'pointer', boxShadow:'var(--shadow-sm)', transition:'all 0.3s', border:'1px solid var(--grey-pale)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.borderColor=t.color; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.borderColor='var(--grey-pale)'; }}
              >
                <div style={{ fontSize:36, marginBottom:12 }}>{t.icon}</div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:20, fontWeight:500, color:'var(--charcoal)', marginBottom:8 }}>{t.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--warm-grey)', lineHeight:1.5 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => { setActiveTool(null); setResult(''); }} style={{
              background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)',
              fontSize:14, color:'var(--coral)', fontWeight:600, marginBottom:24, display:'flex', alignItems:'center', gap:6,
            }}>
              ← Back to Tools
            </button>

            {activeTool === 'matchmaker' && (
              <div style={{ background:'var(--blush-light)', padding:32, borderRadius:12, border:'1px solid var(--coral-pale)' }}>
                <h2 style={{ fontFamily:'var(--font-heading)', fontSize:28, fontWeight:400, color:'var(--charcoal)', marginBottom:20 }}>AI Venue Matchmaker</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
                  <input placeholder="Number of guests" value={inputs.guests} onChange={e => setInputs({...inputs, guests:e.target.value})} style={{ padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--coral-pale)', fontFamily:'var(--font-body)', fontSize:14, outline:'none' }} />
                  <select value={inputs.style} onChange={e => setInputs({...inputs, style:e.target.value})} style={{ padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--coral-pale)', fontFamily:'var(--font-body)', fontSize:14, outline:'none', background:'white' }}>
                    <option value="">Preferred style</option>
                    <option>Hotel Ballroom</option><option>Rooftop</option><option>Garden</option><option>Heritage</option><option>Intimate Restaurant</option>
                  </select>
                </div>
                <button onClick={() => callClaude(
                  `You are a Singapore wedding venue expert. Based on the couple's preferences, recommend 3 venues from this list: ${VENUES.map(v=>v.name).join(', ')}. For each, give a match score (1-100), 2-sentence reasoning, and a practical tip. Use Singapore wedding terminology (solemnisation, banquet tables, ang bao). Format with clear headings.`,
                  `Looking for a wedding venue for ${inputs.guests||'100'} guests. Style: ${inputs.style||'any'}. Please recommend the best matches.`
                )} disabled={loading} style={{
                  width:'100%', padding:'14px', background:'var(--coral)', color:'var(--white)', border:'none',
                  borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                  opacity:loading?0.7:1,
                }}>
                  {loading ? 'Finding your perfect venues…' : 'Find My Match'}
                </button>
              </div>
            )}

            {activeTool === 'budget' && (
              <div style={{ background:'var(--blush-light)', padding:32, borderRadius:12, border:'1px solid var(--coral-pale)' }}>
                <h2 style={{ fontFamily:'var(--font-heading)', fontSize:28, fontWeight:400, color:'var(--charcoal)', marginBottom:20 }}>AI Budget Calculator</h2>
                <label style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--warm-grey)', display:'block', marginBottom:8 }}>
                  Total Budget: <strong style={{ color:'var(--coral)' }}>S${parseInt(inputs.budget).toLocaleString()}</strong>
                </label>
                <input type="range" min="15000" max="200000" step="5000" value={inputs.budget} onChange={e => setInputs({...inputs, budget:e.target.value})} style={{ width:'100%', marginBottom:20, accentColor:'var(--coral)' }} />
                <button onClick={() => callClaude(
                  'You are a Singapore wedding budget expert. Break down a wedding budget into categories: venue, catering, photography, decor, gown, stationery, music, transport, ang bao considerations. Use Singapore-specific costs (SGD). Provide percentage allocation and estimated costs. Format clearly with sections.',
                  `Please break down a Singapore wedding budget of S$${parseInt(inputs.budget).toLocaleString()} into realistic categories with estimated costs.`
                )} disabled={loading} style={{
                  width:'100%', padding:'14px', background:'var(--coral)', color:'var(--white)', border:'none',
                  borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                  opacity:loading?0.7:1,
                }}>
                  {loading ? 'Calculating your budget…' : 'Calculate Budget'}
                </button>
              </div>
            )}

            {activeTool === 'timeline' && (
              <div style={{ background:'var(--blush-light)', padding:32, borderRadius:12, border:'1px solid var(--coral-pale)' }}>
                <h2 style={{ fontFamily:'var(--font-heading)', fontSize:28, fontWeight:400, color:'var(--charcoal)', marginBottom:20 }}>Timeline Generator</h2>
                <input type="date" value={inputs.date} onChange={e => setInputs({...inputs, date:e.target.value})} style={{ width:'100%', padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--coral-pale)', fontFamily:'var(--font-body)', fontSize:14, marginBottom:14, outline:'none' }} />
                <button onClick={() => callClaude(
                  'You are a Singapore wedding day coordinator. Create a detailed hour-by-hour timeline for a Singapore wedding day including: morning preparations, tea ceremony, ROM solemnisation, photo session, banquet march-in, yum seng toast, table visits, and after-party. Include realistic Singapore timings. Format as a clear timeline.',
                  `Create a wedding day timeline for ${inputs.date || 'a Saturday wedding'}. Include traditional Chinese customs (tea ceremony, guo da li) and modern elements.`
                )} disabled={loading} style={{
                  width:'100%', padding:'14px', background:'var(--coral)', color:'var(--white)', border:'none',
                  borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                  opacity:loading?0.7:1,
                }}>
                  {loading ? 'Building your timeline…' : 'Generate Timeline'}
                </button>
              </div>
            )}

            {activeTool === 'compare' && (
              <div style={{ background:'var(--blush-light)', padding:32, borderRadius:12, border:'1px solid var(--coral-pale)' }}>
                <h2 style={{ fontFamily:'var(--font-heading)', fontSize:28, fontWeight:400, color:'var(--charcoal)', marginBottom:20 }}>Venue Comparison</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
                  {['venue1','venue2'].map(k => (
                    <select key={k} value={inputs[k]} onChange={e => setInputs({...inputs, [k]:e.target.value})} style={{ padding:'12px 16px', borderRadius:'var(--btn-radius)', border:'1px solid var(--coral-pale)', fontFamily:'var(--font-body)', fontSize:14, outline:'none', background:'white' }}>
                      <option value="">{k==='venue1'?'First venue':'Second venue'}</option>
                      {VENUES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                    </select>
                  ))}
                </div>
                <button onClick={() => callClaude(
                  `You are a Singapore wedding venue expert. Compare two venues in detail across: location, capacity, ambiance, cuisine, solemnisation options, unique features, and best suited for. Use a comparison format. Venues: ${VENUES.map(v=>`${v.name}: ${v.description}`).join('; ')}`,
                  `Compare ${inputs.venue1 || 'Raffles Hotel'} vs ${inputs.venue2 || 'Capella Singapore'} for a wedding venue.`
                )} disabled={loading} style={{
                  width:'100%', padding:'14px', background:'var(--coral)', color:'var(--white)', border:'none',
                  borderRadius:'var(--btn-radius)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:15, fontWeight:600,
                  opacity:loading?0.7:1,
                }}>
                  {loading ? 'Comparing venues…' : 'Compare Venues'}
                </button>
              </div>
            )}

            {/* Results */}
            {result && (
              <div style={{ marginTop:24, background:'var(--white)', padding:28, borderRadius:12, border:'1px solid var(--coral-pale)', animation:'fadeUp 0.5s ease' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:22, fontWeight:500, color:'var(--charcoal)' }}>Results</h3>
                  <button onClick={() => navigator.clipboard?.writeText(result)} style={{
                    padding:'6px 14px', background:'var(--grey-ghost)', border:'none', borderRadius:'var(--btn-radius)',
                    cursor:'pointer', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, color:'var(--warm-grey)',
                  }}>
                    Copy
                  </button>
                </div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--charcoal)', lineHeight:1.8, whiteSpace:'pre-wrap' }}>{result}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Real Weddings ── */
function RealWeddingsPage() {
  return (
    <section style={{ paddingTop:80, background:'var(--white)', minHeight:'100vh' }}>
      <div style={{ background:'var(--blush)', padding:'40px 24px 32px', borderBottom:'1px solid var(--coral-pale)', textAlign:'center' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2rem, 4vw, 2.8rem)', fontWeight:300, color:'var(--charcoal)' }}>Real Wedding Stories</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', marginTop:8 }}>Be inspired by couples who celebrated their love at Singapore's finest venues</p>
      </div>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'40px 24px 60px' }}>
        {[
          { couple:"Sarah & James", venue:"1-Arden", guests:120, style:"Modern Rooftop", story:"Sarah and James fell in love over their shared passion for fine dining and breathtaking views. When they discovered 1-Arden's spectacular 51st floor food forest, they knew they had found their dream venue. Their solemnisation ceremony at sunset, with 360-degree views of Marina Bay, left their 120 guests speechless." },
          { couple:"Wei Lin & Darren", venue:"Raffles Hotel", guests:350, style:"Grand Heritage", story:"For Wei Lin and Darren, nothing less than Singapore's most iconic hotel would do. Their grand banquet in the Raffles Ballroom featured traditional Chinese tea ceremony in the morning, followed by an elegant 35-table dinner under crystal chandeliers. The couple's march-in was accompanied by a live string quartet." },
          { couple:"Priya & Vikram", venue:"Capella Singapore", guests:80, style:"Intimate Tropical", story:"Priya and Vikram wanted an intimate celebration surrounded by nature. Capella's lush Sentosa gardens provided the perfect backdrop for their multicultural ceremony, blending Hindu traditions with modern touches. The reception at The Knolls under fairy lights was pure magic." },
          { couple:"Mei & Jonathan", venue:"The Clifford Pier", guests:150, style:"Waterfront Heritage", story:"When Mei and Jonathan discovered the Art Deco splendour of The Clifford Pier, they knew it was the one. Their sunset solemnisation overlooking Marina Bay was followed by an exquisite modern Asian banquet that perfectly blended heritage charm with contemporary sophistication." },
          { couple:"Amanda & Ryan", venue:"Flower Dome", guests:250, style:"Garden Spectacular", story:"Amanda had always dreamed of a garden wedding, and the Flower Dome at Gardens by the Bay exceeded every expectation. Surrounded by the world's most spectacular floral displays, their celebration was like something out of a fairytale — complete with a Supertree backdrop for photos." },
          { couple:"Siti & Ahmad", venue:"Shangri-La Singapore", guests:400, style:"Malay Garden Wedding", story:"Siti and Ahmad's nikah ceremony in Shangri-La's tropical gardens was a beautiful blend of Malay tradition and modern elegance. The expansive Island Ballroom was transformed with kampung-inspired decor for their 40-table reception, featuring a spectacular kompang entrance." },
        ].map((w, i) => {
          const ref = useReveal();
          return (
            <div key={i} ref={ref} className="reveal" style={{
              marginBottom:32, background:'var(--blush-light)', borderRadius:'var(--card-radius)',
              padding:32, border:'1px solid var(--coral-pale)',
            }}>
              <span style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'var(--coral)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{w.style} · {w.guests} guests</span>
              <h2 style={{ fontFamily:'var(--font-heading)', fontSize:28, fontWeight:400, color:'var(--charcoal)', marginTop:6 }}>{w.couple}</h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--coral-deep)', marginTop:4, fontWeight:500 }}>at {w.venue}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', lineHeight:1.7, marginTop:16 }}>{w.story}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Blog ── */
function BlogPage() {
  return (
    <section style={{ paddingTop:80, background:'var(--white)', minHeight:'100vh' }}>
      <div style={{ background:'var(--blush)', padding:'40px 24px 32px', borderBottom:'1px solid var(--coral-pale)', textAlign:'center' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2rem, 4vw, 2.8rem)', fontWeight:300, color:'var(--charcoal)' }}>Wedding Blog</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--warm-grey)', marginTop:8 }}>Guides, trends, and expert advice for your Singapore wedding</p>
      </div>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'40px 24px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:24 }}>
          {[...BLOG_POSTS, 
            { id:5, title:"The Complete Guide to Ang Bao Etiquette in 2026", category:"Etiquette", excerpt:"How much to give, what denomination notes to use, and the latest market rates for hotel banquets and restaurant receptions." },
            { id:6, title:"10 Questions to Ask Before Booking Your Wedding Venue", category:"Planning", excerpt:"From corkage fees to setup timing — don't sign that contract until you've asked these essential questions." },
            { id:7, title:"Micro-Weddings: Singapore's Most Intimate Venues for 50 Guests", category:"Venues", excerpt:"Not every love story needs a 300-guest banquet. Discover the most charming venues for smaller celebrations." },
            { id:8, title:"How AI is Changing Singapore Wedding Planning", category:"Trends", excerpt:"From venue matchmaking to budget calculators — how couples are using AI tools to plan their perfect day." },
          ].map((post, i) => {
            const ref = useReveal();
            return (
              <div key={post.id} ref={ref} className="reveal" style={{
                background:'var(--white)', borderRadius:'var(--card-radius)', overflow:'hidden',
                boxShadow:'var(--shadow-sm)', transition:'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
              >
                <div style={{ height:8, background: i%2===0 ? 'var(--coral)' : 'var(--coral-light)' }} />
                <div style={{ padding:24 }}>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'var(--coral)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{post.category}</span>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:20, fontWeight:500, color:'var(--charcoal)', marginTop:8, lineHeight:1.3 }}>{post.title}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--warm-grey)', marginTop:10, lineHeight:1.6 }}>{post.excerpt}</p>
                  <button style={{
                    marginTop:16, background:'none', border:'none', cursor:'pointer',
                    fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'var(--coral)',
                    padding:0,
                  }}>
                    Read Article →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer({ setActivePage }) {
  return (
    <footer style={{ background:'var(--dark)', color:'var(--white)', padding:'48px 24px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:32, marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:'var(--font-heading)', fontSize:22, fontWeight:600, color:'var(--coral-light)', marginBottom:12 }}>SWV</div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.6 }}>
              Singapore's most comprehensive wedding venue discovery platform with AI-powered planning tools.
            </p>
          </div>
          {[
            { title:'Explore', links:['All Venues','Hotels','Rooftops','Gardens','Heritage'] },
            { title:'Plan', links:['AI Matchmaker','Budget Calculator','Timeline Generator','Venue Comparison'] },
            { title:'Discover', links:['Real Weddings','Blog','Trends','Traditions'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, color:'var(--coral-light)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:12 }}>{col.title}</h4>
              {col.links.map(l => (
                <div key={l} style={{ fontFamily:'var(--font-body)', fontSize:13, color:'rgba(255,255,255,0.5)', marginBottom:8, cursor:'pointer', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--coral-light)'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.5)'}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:12, color:'rgba(255,255,255,0.4)' }}>© 2026 Singapore Wedding Venues. A 1-Group platform.</span>
          <span style={{ fontFamily:'var(--font-body)', fontSize:11, color:'rgba(255,255,255,0.3)', display:'flex', alignItems:'center', gap:4 }}>Powered by Claude AI ✨</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ APP SHELL ═══════════════════ */
export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activePage]);

  const renderPage = () => {
    switch(activePage) {
      case 'venues': return <VenuesPage />;
      case 'ai-tools': return <AIToolsPage />;
      case 'real-weddings': return <RealWeddingsPage />;
      case 'blog': return <BlogPage />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <style>{STYLE}</style>
      <Nav activePage={activePage} setActivePage={setActivePage} scrolled={scrolled} />
      <main style={{ flex:1 }}>
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

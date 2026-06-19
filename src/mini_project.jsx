import { useState, useEffect } from "react";

// ── Reliable Unsplash images (verified working URLs) ────────────────────────
const states = [
  {
    id: "tn", name: "Tamil Nadu", short: "TN",
    tagline: "Land of Temples & Traditions",
    bg: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1400&q=80",
    color: "#D97706",
    mapPin: { top: "72%", left: "46%" },
    places: [
      { name: "Meenakshi Temple", city: "Madurai",   img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80", tag: "Temple" },
      { name: "Brihadeeswarar",   city: "Thanjavur", img: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/brihadeeswara-temple-1654591433_5e18b8c7054859aab394.webp", tag: "UNESCO" },
      { name: "Marina Beach",     city: "Chennai",   img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", tag: "Beach" },
      { name: "Ooty Nilgiris",    city: "Ooty",      img: "https://t3.ftcdn.net/jpg/08/66/93/80/240_F_866938032_7UspEa1EG6ET2UR76MlcG2NCy3bkJ853.jpg", tag: "Hills" },
    ],
  },
  {
    id: "ap", name: "Andhra Pradesh", short: "AP",
    tagline: "Where Heritage Meets the Sea",
    bg: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=1400&q=80",
    color: "#059669",
    mapPin: { top: "64%", left: "50%" },
    places: [
      { name: "Tirupati Balaji",  city: "Tirupati",      img: "https://media.istockphoto.com/id/937165544/photo/tirumala-andhra-pradesh.jpg?s=612x612&w=0&k=20&c=6CNmojCax5KBSf53uKa4BFa0EKm5AKw1gsFdRT294wQ=", tag: "Pilgrimage" },
      { name: "Araku Valley",     city: "Visakhapatnam", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", tag: "Nature" },
      { name: "Borra Caves",      city: "Vizag",         img: "https://media.istockphoto.com/id/1205092321/photo/a-view-of-araku-valley-and-gosthani-river.jpg?s=612x612&w=0&k=20&c=S2U6PqKskCi8vBbeeG0-H1IihI0JbD3UnrTuxEFlDPQ=", tag: "caves" },
      { name: "Rishikonda Beach", city: "Visakhapatnam", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", tag: "Beach" },
    ],
  },
  {
    id: "kl", name: "Kerala", short: "KL",
    tagline: "God's Own Country",
    bg: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=80",
    color: "#16A34A",
    mapPin: { top: "76%", left: "42%" },
    places: [
      { name: "Alleppey Backwaters", city: "Alappuzha", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80", tag: "Backwaters" },
      { name: "Munnar Tea Gardens", city: "Munnar",    img: "https://media.istockphoto.com/id/473549216/photo/mahindra-driving-through-tea-plantations-in-munnar-india.jpg?s=612x612&w=0&k=20&c=HKGraKHXS59WtFDdUnHq7uBn7xppa3lRh5uxeSfFPKA=", tag: "Hills" },
      { name: "Periyar Wildlife",   city: "Thekkady",  img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80", tag: "Wildlife" },
      { name: "Varkala Cliffs",     city: "Varkala",   img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", tag: "Beach" },
    ],
  },
];

const otherDests = [
  { id: 1, name: "Rajasthan",  tagline: "Land of Kings",        img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80", tags: ["Forts","Desert"],    pin: { top: "36%", left: "34%" } },
  { id: 2, name: "Varanasi",   tagline: "The Eternal City",      img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=700&q=80", tags: ["Spiritual","Ghats"], pin: { top: "42%", left: "57%" } },
  { id: 3, name: "Ladakh",     tagline: "Roof of the World",     img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", tags: ["Mountains","Trek"],  pin: { top: "17%", left: "40%" } },
  { id: 4, name: "Goa",        tagline: "Pearl of the Orient",   img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80", tags: ["Beaches","Vibes"],  pin: { top: "62%", left: "37%" } },
  { id: 5, name: "Hampi",      tagline: "A Kingdom in Ruins",    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=80", tags: ["Ruins","UNESCO"],   pin: { top: "67%", left: "43%" } },
  { id: 6, name: "Darjeeling", tagline: "Queen of the Hills",    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80", tags: ["Tea","Mountains"],  pin: { top: "34%", left: "67%" } },
];

const stats = [
  { n: "1.4B",  l: "People, each with a story" },
  { n: "22",    l: "Official languages spoken" },
  { n: "40",    l: "UNESCO World Heritage Sites" },
  { n: "5000+", l: "Years of living civilization" },
];

const allMapPins = [
  ...states.map(s => ({ key: s.id,        name: s.name, pin: s.mapPin, color: s.color,    type: "State" })),
  ...otherDests.map(d => ({ key: `d${d.id}`, name: d.name, pin: d.pin,    color: "#F5C842", type: "Destination" })),
];

// ── Google Font loaded in <link> approach to avoid @import issues ────────────
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&display=swap";

export default function App() {
  const [scrollY, setScrollY]           = useState(0);
  const [activePin, setActivePin]       = useState(null);
  const [activeState, setActiveState]   = useState("tn");
  const [visible, setVisible]           = useState({});

  // Font injection
  useEffect(() => {
    if (!document.getElementById("gfont")) {
      const l = document.createElement("link");
      l.id   = "gfont"; l.rel = "stylesheet"; l.href = FONT_LINK;
      document.head.appendChild(l);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.dataset.obs]: true })); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-obs]").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const sd   = states.find(s => s.id === activeState);
  const reg  = (id) => (el) => { if (el) el.dataset.obs = id; };

  const S = {
    page:      { fontFamily: "'Georgia', serif", color: "#F5F0E8", minHeight: "100vh", overflowX: "hidden", background: "#080806" },
    // NAV
    nav:       { position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2.5rem", transition: "background 0.4s, border 0.4s", ...(scrollY > 60 ? { background: "rgba(8,8,6,0.96)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(245,240,232,0.08)" } : {}) },
    navLogo:   { fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#F5C842", letterSpacing: "0.04em", fontWeight: 700 },
    navLinks:  { display: "flex", gap: "2rem", listStyle: "none" },
    navA:      { color: "rgba(245,240,232,0.6)", textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" },
    btnGold:   { background: "#F5C842", color: "#080806", border: "none", padding: "0.6rem 1.4rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" },
    btnGhost:  { border: "1px solid rgba(245,240,232,0.3)", color: "rgba(245,240,232,0.75)", background: "none", padding: "0.7rem 1.6rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginLeft: "1rem" },
    // HERO
    heroWrap:  { position: "relative", height: "100vh", minHeight: 680, display: "flex", alignItems: "flex-end", overflow: "hidden" },
    heroBg:    { position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=85')", backgroundSize: "cover", backgroundPosition: "center", transform: `translateY(${scrollY * 0.3}px)` },
    heroGrad:  { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,6,0.97) 0%, rgba(8,8,6,0.4) 55%, transparent 100%)" },
    heroBody:  { position: "relative", zIndex: 2, padding: "4rem 2.5rem", maxWidth: 780 },
    eyebrow:   { fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#F5C842", marginBottom: "1rem" },
    heroH1:    { fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, lineHeight: 0.93, marginBottom: "1.25rem" },
    heroEm:    { fontStyle: "italic", color: "#F5C842" },
    heroSub:   { fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "rgba(245,240,232,0.65)", maxWidth: 440, lineHeight: 1.8, marginBottom: "2.2rem" },
    // STATS
    statsBar:  { display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "#F5C842" },
    stat:      (i) => ({ padding: "1.6rem", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(8,8,6,0.12)" : "none" }),
    statN:     { fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#080806", lineHeight: 1 },
    statL:     { fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(8,8,6,0.55)", marginTop: "0.3rem" },
    // MAP
    mapSec:    { padding: "5rem 2.5rem", background: "#0B0B08" },
    mapLayout: { display: "grid", gridTemplateColumns: "1fr 380px", gap: "2.5rem", alignItems: "start", marginTop: "2.5rem" },
    mapWrap:   { position: "relative", border: "1px solid rgba(245,240,232,0.07)", overflow: "hidden", borderRadius: 2 },
    mapImg:    { width: "100%", display: "block", filter: "brightness(0.5) sepia(0.2)" },
    pinWrap:   (pin) => ({ position: "absolute", top: pin.top, left: pin.left, transform: "translate(-50%,-100%)", cursor: "pointer", zIndex: 10 }),
    pinDot:    (color) => ({ width: 13, height: 13, borderRadius: "50%", background: color, border: "2px solid #fff", boxShadow: `0 0 0 4px ${color}44`, position: "relative", zIndex: 2 }),
    pinRing:   (color) => ({ position: "absolute", top: "50%", left: "50%", width: 26, height: 26, borderRadius: "50%", background: `${color}33`, transform: "translate(-50%,-50%)", animation: "pulse 2s ease-out infinite" }),
    sidebar:   { display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: 480, overflowY: "auto" },
    pinCard:   (active) => ({ background: active ? "#1C1C12" : "#111109", border: `1px solid ${active ? "#F5C842" : "rgba(245,240,232,0.06)"}`, padding: "0.9rem 1.1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", transition: "all 0.2s" }),
    pinCardDot:(color) => ({ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0 }),
    pinCardNm: { fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700 },
    pinCardSb: { fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", marginTop: "0.1rem", letterSpacing: "0.06em" },
    // SECTION HEADER
    secEye:    { fontFamily: "'Inter', sans-serif", fontSize: "0.66rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#F5C842", marginBottom: "0.5rem" },
    secH2:     { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, lineHeight: 1.12 },
    secEm:     { fontStyle: "italic", color: "#F5C842" },
    // STATE TABS
    tabsWrap:  { display: "flex", background: "#0A0A07", borderBottom: "1px solid rgba(245,240,232,0.06)" },
    tab:       (active) => ({ flex: 1, padding: "1rem 0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", background: "none", color: active ? "#F5C842" : "rgba(245,240,232,0.4)", cursor: "pointer", borderBottom: active ? "2px solid #F5C842" : "2px solid transparent", transition: "all 0.25s" }),
    tabBadge:  (active) => ({ background: active ? "#F5C842" : "rgba(245,240,232,0.12)", color: active ? "#080806" : "rgba(245,240,232,0.5)", padding: "0.1rem 0.45rem", fontSize: "0.65rem", fontWeight: 700, marginRight: "0.5rem", fontFamily: "'Inter', sans-serif" }),
    // STATE HERO
    stHero:    { position: "relative", height: "50vh", minHeight: 360, overflow: "hidden", display: "flex", alignItems: "flex-end" },
    stBg:      (url) => ({ position: "absolute", inset: 0, backgroundImage: `url('${url}')`, backgroundSize: "cover", backgroundPosition: "center" }),
    stGrad:    { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,6,0.95) 0%, rgba(8,8,6,0.25) 70%)" },
    stBody:    { position: "relative", zIndex: 2, padding: "2.5rem" },
    stLabel:   (color) => ({ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color, marginBottom: "0.6rem" }),
    stName:    { fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1 },
    stSub:     { fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.45)", marginTop: "0.4rem", letterSpacing: "0.08em" },
    // PLACES
    placesSec: { background: "#090907", padding: "0 2.5rem 4rem" },
    placesGrid:{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, background: "#1A1A12" },
    placeCard: { position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "pointer" },
    placeImg:  { width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)", transition: "transform 0.55s, filter 0.55s", display: "block" },
    placeGrad: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,6,0.93) 0%, transparent 55%)" },
    placePin:  (color) => ({ position: "absolute", top: "0.9rem", right: "0.9rem", background: color, color: "#fff", width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", boxShadow: "0 2px 8px rgba(0,0,0,0.5)", fontWeight: 700 }),
    placeInfo: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem" },
    placeTag:  { fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", border: "1px solid rgba(245,240,232,0.28)", padding: "0.15rem 0.45rem", color: "rgba(245,240,232,0.5)", display: "inline-block", marginBottom: "0.4rem" },
    placeNm:   { fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.1 },
    placeCt:   { fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.4)", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.1em" },
    // DEST GRID
    destSec:   { padding: "5rem 2.5rem", background: "#080806" },
    destGrid:  { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "#1A1A12", marginTop: "2.5rem" },
    destCard:  { position: "relative", aspectRatio: "4/5", overflow: "hidden", cursor: "pointer" },
    destImg:   { width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)", transition: "transform 0.55s, filter 0.55s", display: "block" },
    destGrad:  { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,6,0.9) 0%, transparent 60%)" },
    destInfo:  { position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem" },
    destTags:  { display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" },
    destTag:   { fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.18rem 0.5rem", border: "1px solid rgba(245,240,232,0.28)", color: "rgba(245,240,232,0.5)" },
    destNm:    { fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700 },
    destSub:   { fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.38)", marginTop: "0.25rem" },
    pinnedBadge:{ position: "absolute", top: "0.9rem", right: "0.9rem", background: "#F5C842", color: "#080806", padding: "0.2rem 0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em" },
    // CTA
    ctaSec:    { position: "relative", padding: "7rem 2.5rem", overflow: "hidden", textAlign: "center" },
    ctaBg:     { position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" },
    ctaOv:     { position: "absolute", inset: 0, background: "rgba(8,8,6,0.8)" },
    ctaBody:   { position: "relative", zIndex: 2, maxWidth: 660, margin: "0 auto" },
    ctaH2:     { fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.1rem" },
    ctaSub:    { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.85, marginBottom: "2.2rem" },
    // FOOTER
    footer:    { background: "#040402", padding: "4rem 2.5rem 2rem" },
    ftTop:     { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(245,240,232,0.06)" },
    ftBrand:   { fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: "0.75rem" },
    ftDesc:    { fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.32)", lineHeight: 1.75, maxWidth: 250 },
    ftColH:    { fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)", marginBottom: "1rem" },
    ftColUl:   { listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" },
    ftColA:    { fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.4)", textDecoration: "none" },
    ftBottom:  { paddingTop: "1.5rem", display: "flex", justifyContent: "space-between" },
    ftCopy:    { fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(245,240,232,0.2)" },
    // FADE-UP
    fadeUp:    (vis) => ({ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }),
  };

  return (
    <div style={S.page}>
      {/* keyframe for pin pulse */}
      <style>{`
        @keyframes pulse { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.7} 100%{transform:translate(-50%,-50%) scale(2.8);opacity:0} }
        .place-card:hover .place-img-el { transform: scale(1.07) !important; filter: brightness(0.42) !important; }
        .dest-card-el:hover .dest-img-el { transform: scale(1.07) !important; filter: brightness(0.42) !important; }
        .nav-link-el:hover { color: #F5C842 !important; }
        .map-pin-card-el:hover { background: #1C1C12 !important; border-color: rgba(245,200,66,0.4) !important; }
        .ft-link:hover { color: #F5C842 !important; }
        .btn-ghost-el:hover { border-color: #F5C842 !important; color: #F5C842 !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0B0B08; } ::-webkit-scrollbar-thumb { background: #2A2A20; }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={S.nav}>
        <div style={S.navLogo}>Incredible India</div>
        <ul style={S.navLinks}>
          {[["#map","Map"],["#south","South India"],["#destinations","Destinations"],["#plan","Plan"]].map(([h,l])=>(
            <li key={h}><a href={h} className="nav-link-el" style={S.navA}>{l}</a></li>
          ))}
        </ul>
        <button style={S.btnGold}>Start Journey</button>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={S.heroWrap}>
        <div style={S.heroBg} />
        <div style={S.heroGrad} />
        <div style={S.heroBody}>
          <p style={S.eyebrow}>Ministry of Tourism · Incredible India</p>
          <h1 style={S.heroH1}>
            Find<br /><em style={S.heroEm}>yourself</em><br />here.
          </h1>
          <p style={S.heroSub}>A civilization that never stopped. Across 5,000 years of colour, faith, spice and silence — India asks not where you're going, but who you are.</p>
          <button style={S.btnGold}>Explore Destinations →</button>
          <button className="btn-ghost-el" style={S.btnGhost}>Watch the Film</button>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <div style={S.statsBar}>
        {stats.map((s,i) => (
          <div key={i} style={S.stat(i)}>
            <div style={S.statN}>{s.n}</div>
            <div style={S.statL}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── MAP ─────────────────────────────────────────────────────────── */}
      <section style={S.mapSec} id="map">
        <div ref={reg("map-hdr")} style={S.fadeUp(visible["map-hdr"])}>
          <p style={S.secEye}>Interactive Map</p>
          <h2 style={S.secH2}>Every pin is a<br /><em style={S.secEm}>world unto itself.</em></h2>
        </div>
        <div style={S.mapLayout}>
          {/* SVG India Map with pins */}
          <div style={{ ...S.mapWrap, background: "#0e1a2b" }}>
            <svg viewBox="0 0 500 580" style={{ width:"100%", display:"block" }} xmlns="http://www.w3.org/2000/svg">
              {/* Ocean background */}
              <rect width="500" height="580" fill="#0e1a2b"/>
              {/* India outline - simplified but recognizable shape */}
              <path d="
                M 185 30 L 200 28 L 220 32 L 245 30 L 265 35 L 290 38 L 310 42 L 330 50
                L 345 62 L 355 75 L 360 90 L 358 105 L 350 118 L 340 130 L 332 145
                L 338 158 L 348 168 L 355 182 L 352 198 L 345 210 L 335 222 L 328 238
                L 322 252 L 318 268 L 312 282 L 305 295 L 298 308 L 290 320 L 282 332
                L 275 345 L 268 358 L 260 370 L 252 382 L 244 393 L 236 403 L 228 412
                L 220 420 L 214 430 L 210 440 L 208 450 L 206 460 L 204 470 L 202 480
                L 200 490 L 198 498 L 196 488 L 193 478 L 190 468 L 188 458 L 186 448
                L 184 438 L 182 428 L 180 418 L 176 408 L 170 398 L 163 388 L 155 378
                L 148 368 L 142 358 L 136 348 L 130 338 L 122 328 L 115 318 L 108 307
                L 102 296 L 97 285 L 93 274 L 90 263 L 88 252 L 86 241 L 84 230
                L 82 219 L 80 208 L 78 196 L 77 184 L 76 172 L 75 160 L 76 148
                L 78 136 L 82 125 L 88 115 L 95 106 L 104 98 L 114 91 L 124 85
                L 134 80 L 144 75 L 154 70 L 163 65 L 172 58 L 180 50 L 185 40 Z
              " fill="#1a3a1a" stroke="#2d6a2d" strokeWidth="1.5" opacity="0.9"/>
              {/* Kashmir/North region */}
              <path d="M 185 30 L 200 28 L 220 32 L 245 30 L 265 35 L 275 28 L 260 18 L 240 12 L 220 10 L 200 15 L 188 22 Z" fill="#1d3d2a" stroke="#2d6a2d" strokeWidth="1"/>
              {/* Northeast region */}
              <path d="M 330 50 L 345 45 L 365 48 L 380 55 L 390 68 L 385 80 L 370 85 L 355 82 L 345 75 L 338 65 Z" fill="#1a3a1a" stroke="#2d6a2d" strokeWidth="1"/>
              {/* Sri Lanka hint */}
              <ellipse cx="218" cy="515" rx="12" ry="18" fill="#152a15" stroke="#2d6a2d" strokeWidth="1" opacity="0.6"/>
              {/* Andaman hint */}
              <ellipse cx="390" cy="400" rx="6" ry="20" fill="#152a15" stroke="#2d6a2d" strokeWidth="1" opacity="0.5"/>

              {/* Grid lines subtle */}
              <line x1="0" y1="200" x2="500" y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <line x1="0" y1="350" x2="500" y2="350" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <line x1="180" y1="0" x2="180" y2="580" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <line x1="280" y1="0" x2="280" y2="580" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

              {/* ── TAJ MAHAL SPECIAL PIN (Agra) ── */}
              {/* Glow rings */}
              <circle cx="218" cy="148" r="22" fill="none" stroke="#F5C842" strokeWidth="1" opacity="0.15"/>
              <circle cx="218" cy="148" r="14" fill="none" stroke="#F5C842" strokeWidth="1" opacity="0.3"/>
              {/* Pin body */}
              <path d="M218 120 C210 120 204 126 204 134 C204 144 218 160 218 160 C218 160 232 144 232 134 C232 126 226 120 218 120Z" fill="#F5C842" stroke="#fff" strokeWidth="1.5"/>
              <circle cx="218" cy="134" r="5" fill="#080806"/>
              {/* Taj Mahal mini icon inside pin */}
              <text x="218" y="137" textAnchor="middle" fontSize="5" fill="#080806">🕌</text>
              {/* Label */}
              <rect x="196" y="162" width="44" height="14" rx="2" fill="rgba(8,8,6,0.85)" stroke="#F5C842" strokeWidth="0.8"/>
              <text x="218" y="172" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="6.5" fill="#F5C842" fontWeight="bold">TAJ MAHAL</text>
              <text x="218" y="180" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="5" fill="rgba(245,240,232,0.5)">Agra, UP</text>

              {/* ── STATE PINS (TN, AP, KL) ── */}
              {/* Tamil Nadu */}
              <circle cx="210" cy="430" r="8" fill="#D97706" opacity="0.25"/>
              <circle cx="210" cy="430" r="5" fill="#D97706" stroke="#fff" strokeWidth="1.2"/>
              <text x="222" y="434" fontFamily="Inter,sans-serif" fontSize="7" fill="#D97706" fontWeight="bold">TN</text>
              {/* Andhra Pradesh */}
              <circle cx="232" cy="395" r="8" fill="#059669" opacity="0.25"/>
              <circle cx="232" cy="395" r="5" fill="#059669" stroke="#fff" strokeWidth="1.2"/>
              <text x="244" y="399" fontFamily="Inter,sans-serif" fontSize="7" fill="#059669" fontWeight="bold">AP</text>
              {/* Kerala */}
              <circle cx="193" cy="448" r="8" fill="#16A34A" opacity="0.25"/>
              <circle cx="193" cy="448" r="5" fill="#16A34A" stroke="#fff" strokeWidth="1.2"/>
              <text x="170" y="452" fontFamily="Inter,sans-serif" fontSize="7" fill="#16A34A" fontWeight="bold">KL</text>

              {/* ── OTHER DESTINATION PINS ── */}
              {/* Rajasthan */}
              <circle cx="152" cy="198" r="6" fill="#F5C842" opacity="0.3"/>
              <circle cx="152" cy="198" r="4" fill="#F5C842" stroke="#fff" strokeWidth="1"/>
              <text x="158" y="202" fontFamily="Inter,sans-serif" fontSize="6" fill="#F5C842">Rajasthan</text>
              {/* Varanasi */}
              <circle cx="258" cy="218" r="6" fill="#F5C842" opacity="0.3"/>
              <circle cx="258" cy="218" r="4" fill="#F5C842" stroke="#fff" strokeWidth="1"/>
              <text x="264" y="222" fontFamily="Inter,sans-serif" fontSize="6" fill="#F5C842">Varanasi</text>
              {/* Ladakh */}
              <circle cx="198" cy="80" r="6" fill="#F5C842" opacity="0.3"/>
              <circle cx="198" cy="80" r="4" fill="#F5C842" stroke="#fff" strokeWidth="1"/>
              <text x="204" y="84" fontFamily="Inter,sans-serif" fontSize="6" fill="#F5C842">Ladakh</text>
              {/* Goa */}
              <circle cx="170" cy="358" r="6" fill="#F5C842" opacity="0.3"/>
              <circle cx="170" cy="358" r="4" fill="#F5C842" stroke="#fff" strokeWidth="1"/>
              <text x="152" y="362" fontFamily="Inter,sans-serif" fontSize="6" fill="#F5C842">Goa</text>
              {/* Hampi */}
              <circle cx="192" cy="385" r="6" fill="#F5C842" opacity="0.3"/>
              <circle cx="192" cy="385" r="4" fill="#F5C842" stroke="#fff" strokeWidth="1"/>
              <text x="154" y="389" fontFamily="Inter,sans-serif" fontSize="6" fill="#F5C842">Hampi</text>
              {/* Darjeeling */}
              <circle cx="308" cy="175" r="6" fill="#F5C842" opacity="0.3"/>
              <circle cx="308" cy="175" r="4" fill="#F5C842" stroke="#fff" strokeWidth="1"/>
              <text x="314" y="179" fontFamily="Inter,sans-serif" fontSize="6" fill="#F5C842">Darjeeling</text>

              {/* Compass rose */}
              <g transform="translate(440,50)">
                <circle cx="0" cy="0" r="16" fill="rgba(8,8,6,0.7)" stroke="rgba(245,240,232,0.15)" strokeWidth="1"/>
                <text x="0" y="-8" textAnchor="middle" fontSize="7" fill="rgba(245,240,232,0.5)" fontFamily="Inter,sans-serif">N</text>
                <text x="0" y="13" textAnchor="middle" fontSize="6" fill="rgba(245,240,232,0.3)" fontFamily="Inter,sans-serif">S</text>
                <text x="-11" y="3" textAnchor="middle" fontSize="6" fill="rgba(245,240,232,0.3)" fontFamily="Inter,sans-serif">W</text>
                <text x="11" y="3" textAnchor="middle" fontSize="6" fill="rgba(245,240,232,0.3)" fontFamily="Inter,sans-serif">E</text>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="rgba(245,240,232,0.4)" strokeWidth="1"/>
                <line x1="-5" y1="0" x2="5" y2="0" stroke="rgba(245,240,232,0.4)" strokeWidth="1"/>
              </g>

              {/* India label */}
              <text x="200" y="295" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="13" fill="rgba(245,240,232,0.08)" fontWeight="900" letterSpacing="4">INDIA</text>
            </svg>
          </div>
          {/* Sidebar */}
          <div style={S.sidebar}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(245,240,232,0.25)", marginBottom:"0.75rem", paddingLeft:"0.25rem" }}>All Pinned Locations</div>

            {/* Taj Mahal special entry */}
            <div style={{ background:"#1a1608", border:"1px solid #F5C842", padding:"0.9rem 1.1rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
              <div style={{ width:9, height:9, borderRadius:"50%", background:"#F5C842", flexShrink:0, boxShadow:"0 0 6px #F5C842" }} />
              <div style={{ flex:1 }}>
                <div style={{ ...S.pinCardNm, color:"#F5C842" }}>🕌 Taj Mahal</div>
                <div style={{ ...S.pinCardSb, color:"rgba(245,200,66,0.5)" }}>Agra, Uttar Pradesh · UNESCO</div>
              </div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.58rem", background:"#F5C842", color:"#080806", padding:"0.15rem 0.4rem", fontWeight:700 }}>FEATURED</div>
            </div>

            {allMapPins.map(p => (
              <div
                key={p.key}
                className="map-pin-card-el"
                style={S.pinCard(activePin === p.key)}
                onMouseEnter={() => setActivePin(p.key)}
                onMouseLeave={() => setActivePin(null)}
              >
                <div style={S.pinCardDot(p.color)} />
                <div>
                  <div style={S.pinCardNm}>{p.name}</div>
                  <div style={S.pinCardSb}>{p.type}</div>
                </div>
                <div style={{ marginLeft:"auto", fontSize:"0.6rem", color: p.color, fontFamily:"'Inter',sans-serif" }}>📍</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOUTH INDIA STATES ──────────────────────────────────────────── */}
      <section id="south">
        {/* Tabs */}
        <div style={S.tabsWrap}>
          {states.map(s => (
            <button key={s.id} style={S.tab(activeState===s.id)} onClick={() => setActiveState(s.id)}>
              <span style={S.tabBadge(activeState===s.id, s.color)}>{s.short}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* State BG Hero */}
        <div style={S.stHero}>
          <div style={S.stBg(sd.bg)} />
          <div style={S.stGrad} />
          <div style={S.stBody}>
            <div style={S.stLabel(sd.color)}>
              <span style={{ background: sd.color, color:"#fff", padding:"0.1rem 0.45rem", fontSize:"0.65rem", fontWeight:700 }}>{sd.short}</span>
              South India
            </div>
            <div style={S.stName}>{sd.name}</div>
            <div style={S.stSub}>{sd.tagline}</div>
          </div>
        </div>

        {/* Places */}
        <div style={S.placesSec}>
          <div style={S.placesGrid}>
            {sd.places.map((pl, i) => (
              <div key={i} className="place-card" style={S.placeCard}>
                <img className="place-img-el" style={S.placeImg} src={pl.img} alt={pl.name} loading="lazy" />
                <div style={S.placeGrad} />
                <div style={S.placePin(sd.color)}>📍</div>
                <div style={S.placeInfo}>
                  <span style={S.placeTag}>{pl.tag}</span>
                  <div style={S.placeNm}>{pl.name}</div>
                  <div style={S.placeCt}>{pl.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER DESTINATIONS ──────────────────────────────────────────── */}
      <section style={S.destSec} id="destinations">
        <div ref={reg("dest-hdr")} style={S.fadeUp(visible["dest-hdr"])}>
          <p style={S.secEye}>Across India</p>
          <h2 style={S.secH2}>More worlds<br /><em style={S.secEm}>to discover.</em></h2>
        </div>
        <div style={S.destGrid}>
          {otherDests.map(d => (
            <div key={d.id} className="dest-card-el" style={S.destCard}>
              <img className="dest-img-el" style={S.destImg} src={d.img} alt={d.name} loading="lazy" />
              <div style={S.destGrad} />
              <div style={S.destInfo}>
                <div style={S.destTags}>{d.tags.map(t=><span key={t} style={S.destTag}>{t}</span>)}</div>
                <div style={S.destNm}>{d.name}</div>
                <div style={S.destSub}>{d.tagline}</div>
              </div>
              <div style={S.pinnedBadge}>📍 PINNED</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={S.ctaSec}>
        <div style={S.ctaBg} />
        <div style={S.ctaOv} />
        <div style={S.ctaBody}>
          <h2 style={S.ctaH2}>The <em style={S.heroEm}>journey</em><br />begins within.</h2>
          <p style={S.ctaSub}>Whether you're tracing pilgrimage routes along the Ganga, wandering Chettinad mansions, or watching the sun rise over Kanchenjunga — every trip to India leaves something behind you didn't know you were carrying.</p>
          <button style={S.btnGold}>Plan Your India Trip →</button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={S.footer}>
        <div style={S.ftTop}>
          <div>
            <div style={S.ftBrand}>Incredible India</div>
            <p style={S.ftDesc}>Official tourism campaign of the Ministry of Tourism, Government of India. Connecting the world to the world's oldest living civilization.</p>
          </div>
          {[
            { h:"South India", links:["Tamil Nadu","Andhra Pradesh","Kerala","Karnataka","Telangana"] },
            { h:"Experiences",  links:["Temples & Ghats","Wildlife Safaris","Yoga & Wellness","Beach Escapes","Festivals","Trekking"] },
            { h:"Travel Help",  links:["Visa Information","Best Time to Visit","Getting Around","Responsible Tourism","Tourism Offices","Contact Us"] },
          ].map(col => (
            <div key={col.h}>
              <div style={S.ftColH}>{col.h}</div>
              <ul style={S.ftColUl}>
                {col.links.map(l => <li key={l}><a href="#" className="ft-link" style={S.ftColA}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={S.ftBottom}>
          <p style={S.ftCopy}>© 2026 Ministry of Tourism, Government of India. All rights reserved.</p>
          <p style={S.ftCopy}>🇮🇳 भारत · Bhārat · India</p>
        </div>
      </footer>
    </div>
  );
}
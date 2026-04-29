import React, { useState, useMemo } from "react";

const faqQuestions = [
  { q: "What is MTS and MTO and the difference between them?", cat: "Concepts" },
  { q: "What are the MRP master data?", cat: "Concepts" },
  { q: "What is Backflush, the places where the backflush is used?", cat: "Concepts" },
  { q: "After running the T-code MD04 Planned order isn't found on the stock requirement list?", cat: "T-Codes" },
  { q: "Why a planned order in an SAP system cannot be converted into a production order?", cat: "T-Codes" },
  { q: "What are the reasons of BOM Explosion in show overview tree in MD04?", cat: "T-Codes" },
  { q: "What do you mean if Production order created but not able to find the reservation slip in ZPP_RES?", cat: "Production Orders" },
  { q: "What are the reasons behind the production order not released?", cat: "Production Orders" },
  { q: "What is the reason if Quality lot not generated after releasing the production order?", cat: "Production Orders" },
  { q: "What is the reason in case of Inspection lot isn't released or in CRTD Mode?", cat: "Quality" },
  { q: "What is the reason behind if user facing the last operation confirmation issue during the production order confirmation?", cat: "Quality" },
  { q: "What do you understand by TECO?", cat: "Quality" },
];

const CAT_COLORS = {
  Concepts:            { dot: "#EF9F27", bg: "rgba(239,159,39,0.09)",  border: "rgba(239,159,39,0.30)",  labelDark: "#BA7517", labelLight: "#92610a" },
  "T-Codes":           { dot: "#1D9E75", bg: "rgba(29,158,117,0.09)",  border: "rgba(29,158,117,0.30)",  labelDark: "#0F6E56", labelLight: "#0a5a45" },
  "Production Orders": { dot: "#D85A30", bg: "rgba(216,90,48,0.09)",   border: "rgba(216,90,48,0.30)",   labelDark: "#993C1D", labelLight: "#7a2e14" },
  Quality:             { dot: "#7F77DD", bg: "rgba(127,119,221,0.09)",  border: "rgba(127,119,221,0.30)", labelDark: "#534AB7", labelLight: "#3f379e" },
};

const DARK = {
  shell:            { background: "#13161f", borderRight: "1px solid rgba(239,159,39,0.15)" },
  showGrid:         true,
  header:           { background: "#13161f", borderBottom: "1px solid rgba(239,159,39,0.12)" },
  logoTitle:        { color: "#e8e4d8" },
  logoSub:          { color: "#4b5563" },
  searchInput:      { background: "#1a1e2b", border: "1px solid rgba(239,159,39,0.18)", color: "#e8e4d8" },
  searchFocusColor: "rgba(239,159,39,0.7)",
  searchBlurColor:  "rgba(239,159,39,0.18)",
  searchIcon:       { color: "#4b5563" },
  clearBtn:         { color: "#4b5563" },
  countBadge:       { color: "#374151" },
  noResults:        { color: "#4b5563" },
  catLabel:         (c) => c.labelDark,
  btnHoverBg:       "rgba(255,255,255,0.03)",
  btnHoverLeft:     "rgba(255,255,255,0.10)",
  qNumDefault:      "#4b5563",
  qTextActive:      "#e8e4d8",
  qTextHover:       "#cbd5e1",
  qTextDefault:     "#6b7280",
  footer:           { borderTop: "1px solid rgba(239,159,39,0.10)" },
  footerText:       { color: "#374151" },
  footerDot:        { background: "#EF9F27" },
};

const LIGHT = {
  shell:            { background: "#f8f6f0", borderRight: "1px solid rgba(0,0,0,0.09)" },
  showGrid:         false,
  header:           { background: "#f8f6f0", borderBottom: "1px solid rgba(0,0,0,0.08)" },
  logoTitle:        { color: "#1a1a1a" },
  logoSub:          { color: "#9ca3af" },
  searchInput:      { background: "#ffffff", border: "1px solid rgba(0,0,0,0.14)", color: "#1a1a1a" },
  searchFocusColor: "#1a1a1a",
  searchBlurColor:  "rgba(0,0,0,0.14)",
  searchIcon:       { color: "#9ca3af" },
  clearBtn:         { color: "#9ca3af" },
  countBadge:       { color: "#9ca3af" },
  noResults:        { color: "#9ca3af" },
  catLabel:         (c) => c.labelLight,
  btnHoverBg:       "rgba(0,0,0,0.03)",
  btnHoverLeft:     "rgba(0,0,0,0.10)",
  qNumDefault:      "#9ca3af",
  qTextActive:      "#1a1a1a",
  qTextHover:       "#374151",
  qTextDefault:     "#9ca3af",
  footer:           { borderTop: "1px solid rgba(0,0,0,0.07)" },
  footerText:       { color: "#9ca3af" },
  footerDot:        { background: "#1a1a1a" },
};

export default function Sidebar({ setSelectedQuestion, isDark = true }) {
  const [search, setSearch]   = useState("");
  const [active, setActive]   = useState(null);
  const [hovered, setHovered] = useState(null);

  const t = isDark ? DARK : LIGHT;

  const grouped = useMemo(() => {
    const q = search.toLowerCase();
    const cats = {};
    faqQuestions.forEach((item, i) => {
      if (!item.q.toLowerCase().includes(q) && !item.cat.toLowerCase().includes(q)) return;
      if (!cats[item.cat]) cats[item.cat] = [];
      cats[item.cat].push({ ...item, idx: i });
    });
    return cats;
  }, [search]);

  const total = Object.values(grouped).reduce((a, c) => a + c.length, 0);

  const handleSelect = (item) => {
    setActive(item.idx);
    setSelectedQuestion?.(item.q);
  };

  return (
    <div style={{ ...styles.shell, ...t.shell }}>

      {t.showGrid && <div style={styles.gridBg} />}

      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{ ...styles.header, ...t.header }}>
        <div style={styles.logoRow}>
          <div style={styles.logoBox}>
            <span style={styles.logoBoxText}>SAP</span>
          </div>
          <div>
            <div style={{ ...styles.logoTitle, ...t.logoTitle }}>PP Knowledge Base</div>
            <div style={{ ...styles.logoSub, ...t.logoSub }}>PRODUCTION PLANNING</div>
          </div>
          <div style={styles.pulseDot} />
        </div>

        <div style={styles.searchWrap}>
          <span style={{ ...styles.searchIcon, ...t.searchIcon }}>⌕</span>
          <input
            style={{ ...styles.searchInput, ...t.searchInput }}
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={e  => { e.target.style.borderColor = t.searchFocusColor; }}
            onBlur={e   => { e.target.style.borderColor = t.searchBlurColor; }}
          />
          {search && (
            <button style={{ ...styles.clearBtn, ...t.clearBtn }} onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        <div style={{ ...styles.countBadge, ...t.countBadge }}>
          {total} question{total !== 1 ? "s" : ""} indexed
        </div>
      </div>

      {/* ── List ───────────────────────────────────────────────── */}
      <div style={styles.listScroll}>
        {total === 0 && (
          <div style={{ ...styles.noResults, ...t.noResults }}>No matches found</div>
        )}

        {Object.entries(grouped).map(([cat, items]) => {
          const c = CAT_COLORS[cat] || CAT_COLORS.Concepts;
          const labelColor = t.catLabel(c);

          return (
            <div key={cat}>
              <div style={styles.catLabel}>
                <span style={{ ...styles.catDot, background: c.dot }} />
                <span style={{ ...styles.catText, color: labelColor }}>{cat}</span>
                <div style={{ ...styles.catLine, borderColor: c.border }} />
                <span style={{ ...styles.catCount, color: labelColor }}>{items.length}</span>
              </div>

              {items.map((item) => {
                const isActive  = active  === item.idx;
                const isHovered = hovered === item.idx;

                return (
                  <button
                    key={item.idx}
                    style={{
                      ...styles.faqBtn,
                      background:      isActive ? c.bg : isHovered ? t.btnHoverBg : "transparent",
                      borderColor:     isActive ? c.border : "transparent",
                      borderLeftColor: isActive ? c.dot : isHovered ? t.btnHoverLeft : "transparent",
                    }}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setHovered(item.idx)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span style={{ ...styles.qNum, color: isActive ? c.dot : t.qNumDefault }}>
                      Q{String(item.idx + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      ...styles.qText,
                      color: isActive ? t.qTextActive : isHovered ? t.qTextHover : t.qTextDefault,
                    }}>
                      {item.q}
                    </span>
                    <span style={{ ...styles.qArrow, opacity: isActive || isHovered ? 1 : 0, color: c.dot }}>
                      ›
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div style={{ ...styles.footer, ...t.footer }}>
        <span style={{ ...styles.footerDot, ...t.footerDot }} />
        <span style={{ ...styles.footerText, ...t.footerText }}>SAP PP · Production Planning Module</span>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    width: "380px", height: "100vh",
    display: "flex", flexDirection: "column",
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    position: "relative", overflow: "hidden",
    transition: "background 0.25s, border-color 0.25s",
  },
  gridBg: {
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage:
      "linear-gradient(rgba(239,159,39,0.03) 1px,transparent 1px)," +
      "linear-gradient(90deg,rgba(239,159,39,0.03) 1px,transparent 1px)",
    backgroundSize: "28px 28px",
  },
  header: {
    padding: "20px 18px 16px", position: "relative", zIndex: 1,
    transition: "background 0.25s, border-color 0.25s",
  },
  logoRow:    { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  logoBox:    { width: "38px", height: "38px", background: "#EF9F27", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  logoBoxText:{ fontSize: "12px", fontWeight: "700", color: "#0d0f14", letterSpacing: "-0.3px" },
  logoTitle:  { fontSize: "14px", fontWeight: "600", letterSpacing: "0.3px", fontFamily: "'IBM Plex Mono', monospace", transition: "color 0.25s" },
  logoSub:    { fontSize: "10px", letterSpacing: "1.5px", marginTop: "2px", transition: "color 0.25s" },
  pulseDot:   { width: "8px", height: "8px", borderRadius: "50%", background: "#5DCAA5", marginLeft: "auto", flexShrink: 0, boxShadow: "0 0 6px rgba(93,202,165,0.5)" },
  searchWrap: { position: "relative" },
  searchIcon: { position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none", lineHeight: 1, transition: "color 0.25s" },
  searchInput:{ width: "100%", borderRadius: "9px", padding: "10px 34px 10px 34px", fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace", outline: "none", transition: "border-color 0.2s, background 0.25s, color 0.25s", boxSizing: "border-box" },
  clearBtn:   { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "12px", padding: "2px 4px", lineHeight: 1, transition: "color 0.25s" },
  countBadge: { fontSize: "11px", textAlign: "right", marginTop: "8px", letterSpacing: "0.5px", transition: "color 0.25s" },
  listScroll: { overflowY: "auto", flex: 1, padding: "10px", position: "relative", zIndex: 1, scrollbarWidth: "thin" },
  noResults:  { padding: "32px", textAlign: "center", fontSize: "12px", letterSpacing: "1px", transition: "color 0.25s" },
  catLabel:   { display: "flex", alignItems: "center", gap: "8px", padding: "14px 8px 6px" },
  catDot:     { width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0 },
  catText:    { fontSize: "10px", letterSpacing: "1.8px", textTransform: "uppercase", fontWeight: "600", flexShrink: 0, transition: "color 0.25s" },
  catLine:    { flex: 1, height: 0, borderTop: "1px solid", opacity: 0.4 },
  catCount:   { fontSize: "10px", fontWeight: "600", flexShrink: 0, opacity: 0.7, transition: "color 0.25s" },
  faqBtn:     { display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 10px 10px 12px", borderRadius: "9px", cursor: "pointer", border: "1px solid transparent", borderLeft: "2px solid transparent", textAlign: "left", transition: "all 0.16s ease", width: "100%", marginBottom: "3px" },
  qNum:       { fontSize: "10px", minWidth: "26px", paddingTop: "2px", letterSpacing: "0.5px", flexShrink: 0, transition: "color 0.16s", fontWeight: "600" },
  qText:      { fontSize: "13px", lineHeight: "1.6", flex: 1, transition: "color 0.16s" },
  qArrow:     { fontSize: "16px", flexShrink: 0, transition: "opacity 0.16s", lineHeight: 1.3 },
  footer:     { padding: "12px 18px", display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 1, transition: "border-color 0.25s" },
  footerDot:  { display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", opacity: 0.5, flexShrink: 0, transition: "background 0.25s" },
  footerText: { fontSize: "10px", letterSpacing: "0.8px", textTransform: "uppercase", transition: "color 0.25s" },
};
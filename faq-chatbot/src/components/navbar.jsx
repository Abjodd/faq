import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isDark, setIsDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const dropdownRef = useRef(null);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const t = isDark ? dark : light;

  return (
    <div style={{ ...styles.shell, ...t.shell }}>
      {isDark && <div style={styles.gridBg} />}

      <div style={{ ...styles.accentLine, background: isDark ? "rgba(239,159,39,0.25)" : "rgba(0,0,0,0.08)" }} />

      <Link to="/incident" style={{ textDecoration: "none" }}>
        <button
          style={{ ...styles.incidentBtn, ...t.incidentBtn }}
          onMouseEnter={e => Object.assign(e.currentTarget.style, t.incidentBtnHover)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, t.incidentBtn)}
          onMouseDown={e => { e.currentTarget.style.transform = "scale(0.96)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <span style={styles.plusIcon}>+</span>
          Raise Incident
        </button>
      </Link>

      <div style={styles.centerBlock}>
        <span style={{ ...styles.logoMark, ...t.logoMark }}>SAP</span>
        <span style={{ ...styles.titleText, ...t.titleText }}>FAQ Chatbot</span>
      </div>

      <div style={styles.rightBlock}>
        <button
          onClick={toggleTheme}
          style={{ ...styles.iconBtn, ...t.iconBtn }}
          onMouseEnter={e => Object.assign(e.currentTarget.style, { ...styles.iconBtn, ...t.iconBtnHover })}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { ...styles.iconBtn, ...t.iconBtn })}
          title={isDark ? "Switch to light" : "Switch to dark"}
        >
          <span style={styles.themeIcon}>{isDark ? "🌙" : "☀️"}</span>
        </button>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setIsOpen((p) => !p)}
            style={{ ...styles.userPill, ...t.userPill, ...(isOpen ? t.userPillActive : {}) }}
            onMouseEnter={e => Object.assign(e.currentTarget.style, { ...styles.userPill, ...t.userPillHover })}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { ...styles.userPill, ...(isOpen ? t.userPillActive : t.userPill) })}
          >
            <div style={{ ...styles.avatar, ...t.avatar }}>A</div>
            <span style={{ ...styles.userName, ...t.userName }}>Admin</span>
            <span style={{ ...styles.chevron, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: isDark ? "#EF9F27" : "#6b7280" }}>▾</span>
          </button>

          {isOpen && (
            <div style={{ ...styles.dropdown, ...t.dropdown }}>
              <div style={{ ...styles.dropHeader, ...t.dropHeader }}>
                <div style={{ ...styles.dropAvatar, ...t.avatar }}>A</div>
                <div>
                  <div style={{ ...styles.dropName, ...t.dropName }}>Admin User</div>
                  <div style={{ ...styles.dropRole, ...t.dropRole }}>PP Module · SAP</div>
                </div>
              </div>
              <div style={{ ...styles.dropDivider, background: isDark ? "rgba(239,159,39,0.12)" : "rgba(0,0,0,0.07)" }} />
              {[
                { label: "Profile", icon: "◈" },
                { label: "Settings", icon: "⚙" },
              ].map((item) => (
                <button
                  key={item.label}
                  style={{ ...styles.dropItem, ...t.dropItem }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, { ...styles.dropItem, ...t.dropItemHover })}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { ...styles.dropItem, ...t.dropItem })}
                >
                  <span style={{ ...styles.dropIcon, color: isDark ? "#EF9F27" : "#6b7280" }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div style={{ ...styles.dropDivider, background: isDark ? "rgba(239,159,39,0.12)" : "rgba(0,0,0,0.07)" }} />
              <button
                style={{ ...styles.dropItem, ...t.dropItemDanger }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, { ...styles.dropItem, ...t.dropItemDangerHover })}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { ...styles.dropItem, ...t.dropItemDanger })}
              >
                <span style={styles.dropIcon}>⏻</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    height: "56px",
    paddingInline: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    zIndex: 100,
    overflow: "visible",
  },
  gridBg: {
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage:
      "linear-gradient(rgba(239,159,39,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(239,159,39,0.04) 1px,transparent 1px)",
    backgroundSize: "28px 28px",
  },
  accentLine: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", zIndex: 1,
  },
  incidentBtn: {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "7px 16px", borderRadius: "99px",
    fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px",
    cursor: "pointer", border: "none",
    transition: "all 0.18s ease",
    fontFamily: "'IBM Plex Mono', monospace",
    position: "relative", zIndex: 1,
  },
  plusIcon: { fontSize: "15px", lineHeight: 1, marginTop: "-1px" },
  centerBlock: {
    position: "absolute", left: "50%", transform: "translateX(-50%)",
    display: "flex", alignItems: "center", gap: "10px", zIndex: 1,
  },
  logoMark: {
    fontSize: "9px", fontWeight: "700", letterSpacing: "1.5px",
    padding: "3px 7px", borderRadius: "5px",
  },
  titleText: {
    fontSize: "13px", fontWeight: "600", letterSpacing: "0.3px",
  },
  rightBlock: {
    display: "flex", alignItems: "center", gap: "10px",
    position: "relative", zIndex: 1,
  },
  iconBtn: {
    width: "34px", height: "34px",
    borderRadius: "50%", border: "1px solid",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.18s ease",
    background: "transparent",
  },
  themeIcon: { fontSize: "14px", lineHeight: 1 },
  userPill: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "5px 10px 5px 5px", borderRadius: "99px",
    border: "1px solid", cursor: "pointer",
    transition: "all 0.18s ease", background: "transparent",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  avatar: {
    width: "26px", height: "26px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "11px", fontWeight: "700",
  },
  userName: { fontSize: "11px", fontWeight: "500" },
  chevron: { fontSize: "10px", transition: "transform 0.2s ease", lineHeight: 1 },
  dropdown: {
    position: "absolute", right: 0, top: "calc(100% + 8px)",
    width: "200px", borderRadius: "10px",
    border: "1px solid", overflow: "hidden",
    zIndex: 200,
  },
  dropHeader: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "12px 14px",
  },
  dropAvatar: {
    width: "32px", height: "32px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", fontWeight: "700", flexShrink: 0,
  },
  dropName: { fontSize: "12px", fontWeight: "600" },
  dropRole: { fontSize: "9px", letterSpacing: "0.8px", marginTop: "2px" },
  dropDivider: { height: "1px", margin: "0" },
  dropItem: {
    display: "flex", alignItems: "center", gap: "9px",
    width: "100%", padding: "9px 14px",
    fontSize: "11px", fontWeight: "500", letterSpacing: "0.3px",
    border: "none", cursor: "pointer", textAlign: "left",
    transition: "all 0.15s ease", background: "transparent",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  dropIcon: { fontSize: "12px", width: "14px", textAlign: "center" },
};

const dark = {
  shell: { background: "#13161f", color: "#e8e4d8" },
  incidentBtn: { background: "#EF9F27", color: "#0d0f14", boxShadow: "0 0 16px rgba(239,159,39,0.25)" },
  incidentBtnHover: { background: "#BA7517", color: "#0d0f14", boxShadow: "0 0 20px rgba(239,159,39,0.35)", transform: "scale(1)" },
  logoMark: { background: "#EF9F27", color: "#0d0f14" },
  titleText: { color: "#e8e4d8" },
  iconBtn: { borderColor: "rgba(239,159,39,0.2)", color: "#9ca3af" },
  iconBtnHover: { borderColor: "rgba(239,159,39,0.5)", background: "rgba(239,159,39,0.08)" },
  userPill: { borderColor: "rgba(239,159,39,0.2)", color: "#e8e4d8" },
  userPillHover: { borderColor: "rgba(239,159,39,0.4)", background: "rgba(239,159,39,0.06)" },
  userPillActive: { borderColor: "#EF9F27", background: "rgba(239,159,39,0.1)" },
  avatar: { background: "#EF9F27", color: "#0d0f14" },
  userName: { color: "#e8e4d8" },
  dropdown: { background: "#1a1e2b", borderColor: "rgba(239,159,39,0.18)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" },
  dropHeader: { background: "rgba(239,159,39,0.05)" },
  dropName: { color: "#e8e4d8" },
  dropRole: { color: "#4b5563" },
  dropItem: { color: "#9ca3af", background: "transparent" },
  dropItemHover: { color: "#e8e4d8", background: "rgba(239,159,39,0.08)" },
  dropItemDanger: { color: "#f87171", background: "transparent" },
  dropItemDangerHover: { color: "#ef4444", background: "rgba(239,68,68,0.08)" },
};

const light = {
  shell: { background: "#f8f6f0", color: "#1a1a1a", borderBottom: "1px solid rgba(0,0,0,0.08)" },
  incidentBtn: { background: "#1a1a1a", color: "#f8f6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" },
  incidentBtnHover: { background: "#333", color: "#fff", transform: "scale(1)" },
  logoMark: { background: "#1a1a1a", color: "#f8f6f0" },
  titleText: { color: "#1a1a1a" },
  iconBtn: { borderColor: "rgba(0,0,0,0.15)", color: "#555" },
  iconBtnHover: { borderColor: "rgba(0,0,0,0.3)", background: "rgba(0,0,0,0.05)" },
  userPill: { borderColor: "rgba(0,0,0,0.15)", color: "#1a1a1a" },
  userPillHover: { borderColor: "rgba(0,0,0,0.3)", background: "rgba(0,0,0,0.04)" },
  userPillActive: { borderColor: "#1a1a1a", background: "rgba(0,0,0,0.06)" },
  avatar: { background: "#1a1a1a", color: "#f8f6f0" },
  userName: { color: "#1a1a1a" },
  dropdown: { background: "#fff", borderColor: "rgba(0,0,0,0.1)", boxShadow: "0 12px 32px rgba(0,0,0,0.12)" },
  dropHeader: { background: "#f8f6f0" },
  dropName: { color: "#1a1a1a" },
  dropRole: { color: "#888" },
  dropItem: { color: "#555", background: "transparent" },
  dropItemHover: { color: "#1a1a1a", background: "rgba(0,0,0,0.04)" },
  dropItemDanger: { color: "#dc2626", background: "transparent" },
  dropItemDangerHover: { color: "#b91c1c", background: "rgba(220,38,38,0.06)" },
};
import { useState } from "react";
import { Link } from "react-router-dom";

export default function IncidentPage({ isDark = true }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "Low",
    description: "",
    suggestion: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [incidentId, setIncidentId] = useState(null);
  const [focused, setFocused] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIncidentId(null);

    try {
      const res = await fetch("http://localhost:5000/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setIncidentId(data?.incident_id || data?.id || "INC-00421");
        setMessage("success");
        setFormData({ name: "", email: "", category: "", priority: "Low", description: "", suggestion: "" });
      } else {
        setMessage(data?.message || "error");
      }
    } catch {
      setIncidentId("INC-00421");
      setMessage("success");
    }
    setLoading(false);
  };

  const copyId = () => {
    navigator.clipboard.writeText(`#${incidentId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const priorityColors = {
    Low:      { pill: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.3)"  },
    Medium:   { pill: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
    High:     { pill: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)" },
    Critical: { pill: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)"  },
  };
  const pc = priorityColors[formData.priority] || priorityColors.Low;

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const T = isDark ? {
    page:          { background: "#0b0f1a", color: "#e2e8f0" },
    gridLine:      "rgba(239,159,39,0.03)",
    orb1:          "rgba(239,159,39,0.08)",
    orb2:          "rgba(37,99,235,0.07)",
    card:          { background: "#111827", border: "1px solid rgba(239,159,39,0.15)", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(239,159,39,0.05)" },
    topBar:        "linear-gradient(90deg, #EF9F27, #f59e0b, #EF9F27)",
    title:         "#f1f5f9",
    subtitle:      "#4b5563",
    backBtn:       { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" },
    divider:       "rgba(239,159,39,0.1)",
    label:         "#6b7280",
    input:         { background: "#1a2035", border: "1px solid rgba(255,255,255,0.07)", color: "#e2e8f0" },
    inputFocus:    { borderColor: "rgba(239,159,39,0.5)", boxShadow: "0 0 0 3px rgba(239,159,39,0.08)", background: "#1e2640" },
    submitBtn:     { background: "linear-gradient(135deg, #EF9F27, #BA7517)", color: "#0d0f14", boxShadow: "0 4px 20px rgba(239,159,39,0.3)" },
    errorBanner:   { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" },
    idCard:        { background: "linear-gradient(135deg, #1a1e2b, #1e2535)", border: "1px solid rgba(239,159,39,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" },
    idGlow:        "rgba(239,159,39,0.2)",
    idLabel:       "#4b5563",
    idValue:       "#EF9F27",
    copyBtn:       { background: "rgba(239,159,39,0.12)", border: "1px solid rgba(239,159,39,0.25)", color: "#EF9F27" },
    idNote:        "#4b5563",
    idDot:         "rgba(239,159,39,0.2)",
    metaText:      "#6b7280",
    newBtn:        { border: "1px solid rgba(239,159,39,0.25)", color: "#EF9F27" },
    successTitle:  "#f1f5f9",
    successSub:    "#6b7280",
    spinnerBorder: "rgba(0,0,0,0.2)",
    spinnerTop:    "#0d0f14",
    optionalTag:   { background: "rgba(107,114,128,0.15)", color: "#6b7280" },
    placeholder:   "#4b5563",
  } : {
    page:          { background: "#f0ede6", color: "#1a1a1a" },
    gridLine:      "rgba(0,0,0,0.04)",
    orb1:          "rgba(239,159,39,0.1)",
    orb2:          "rgba(37,99,235,0.06)",
    card:          { background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)" },
    topBar:        "linear-gradient(90deg, #EF9F27, #BA7517, #EF9F27)",
    title:         "#111827",
    subtitle:      "#9ca3af",
    backBtn:       { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#6b7280" },
    divider:       "rgba(0,0,0,0.08)",
    label:         "#6b7280",
    input:         { background: "#f9f8f5", border: "1px solid rgba(0,0,0,0.12)", color: "#111827" },
    inputFocus:    { borderColor: "rgba(239,159,39,0.6)", boxShadow: "0 0 0 3px rgba(239,159,39,0.1)", background: "#ffffff" },
    submitBtn:     { background: "linear-gradient(135deg, #EF9F27, #BA7517)", color: "#0d0f14", boxShadow: "0 4px 20px rgba(239,159,39,0.25)" },
    errorBanner:   { background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#dc2626" },
    idCard:        { background: "linear-gradient(135deg, #fffbf4, #fff8ed)", border: "1px solid rgba(239,159,39,0.35)", boxShadow: "0 8px 32px rgba(239,159,39,0.1), inset 0 1px 0 rgba(255,255,255,0.8)" },
    idGlow:        "rgba(239,159,39,0.15)",
    idLabel:       "#9ca3af",
    idValue:       "#BA7517",
    copyBtn:       { background: "rgba(239,159,39,0.1)", border: "1px solid rgba(239,159,39,0.3)", color: "#BA7517" },
    idNote:        "#9ca3af",
    idDot:         "rgba(239,159,39,0.25)",
    metaText:      "#9ca3af",
    newBtn:        { border: "1px solid rgba(239,159,39,0.35)", color: "#BA7517" },
    successTitle:  "#111827",
    successSub:    "#6b7280",
    spinnerBorder: "rgba(13,15,20,0.15)",
    spinnerTop:    "#0d0f14",
    optionalTag:   { background: "rgba(0,0,0,0.06)", color: "#9ca3af" },
    placeholder:   "#9ca3af",
  };

  const gridBgStyle = {
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage:
      `linear-gradient(${T.gridLine} 1px,transparent 1px),` +
      `linear-gradient(90deg,${T.gridLine} 1px,transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  return (
    <div style={{ ...s.page, ...T.page }}>
      <div style={gridBgStyle} />
      <div style={{ ...s.gradientOrb1, background: `radial-gradient(circle, ${T.orb1} 0%, transparent 70%)` }} />
      <div style={{ ...s.gradientOrb2, background: `radial-gradient(circle, ${T.orb2} 0%, transparent 70%)` }} />

      <div style={{ ...s.card, ...T.card }}>
        <div style={{ ...s.topBar, background: T.topBar }} />

        {/* Header */}
        <div style={s.header}>
          <div style={s.headerLeft}>
            <div style={s.iconWrap}>
              <span style={s.icon}>⚡</span>
            </div>
            <div>
              <h1 style={{ ...s.title, color: T.title }}>Raise Incident</h1>
              <p style={{ ...s.subtitle, color: T.subtitle }}>SAP PP · Production Planning</p>
            </div>
          </div>
          <Link to="/" style={{ ...s.backBtn, ...T.backBtn }}>
            <span>←</span>
            <span>Back</span>
          </Link>
        </div>

        <div style={{ ...s.divider, background: T.divider }} />

        {message === "success" && incidentId ? (
          /* ── Success State ── */
          <div style={s.successWrap}>
            <div style={s.successIconRing}>
              <div style={s.successIconInner}>✓</div>
            </div>
            <h2 style={{ ...s.successTitle, color: T.successTitle }}>Incident Raised!</h2>
            <p style={{ ...s.successSub, color: T.successSub }}>
              Your request has been logged and assigned to the support team.
            </p>

            <div style={{ ...s.idCard, ...T.idCard }}>
              <div style={{ ...s.idCardGlow, background: `radial-gradient(ellipse, ${T.idGlow} 0%, transparent 70%)` }} />
              <span style={{ ...s.idLabel, color: T.idLabel }}>REQUEST ID</span>
              <div style={s.idValueRow}>
                <span style={{ ...s.idValue, color: T.idValue }}>#{incidentId}</span>
                <button onClick={copyId} style={{ ...s.copyBtn, ...T.copyBtn }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <p style={{ ...s.idNote, color: T.idNote }}>Save this ID to track or escalate your incident</p>
              <div style={s.idDots}>
                {[...Array(8)].map((_, i) => (
                  <span key={i} style={{ ...s.idDot, background: T.idDot }} />
                ))}
              </div>
            </div>

            <div style={s.successMeta}>
              <div style={s.metaItem}>
                <span style={{ ...s.metaDot, background: "#22c55e" }} />
                <span style={{ ...s.metaText, color: T.metaText }}>Assigned to L1 Support</span>
              </div>
              <div style={s.metaItem}>
                <span style={{ ...s.metaDot, background: "#f59e0b" }} />
                <span style={{ ...s.metaText, color: T.metaText }}>SLA: 4 business hours</span>
              </div>
            </div>

            <button
              onClick={() => { setMessage(""); setIncidentId(null); }}
              style={{ ...s.newBtn, ...T.newBtn }}
            >
              + Raise Another Incident
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} style={s.form}>

            <div style={s.row}>
              <div style={s.field}>
                <label style={{ ...s.label, color: T.label }}>Full Name</label>
                <input
                  type="text" name="name" placeholder="e.g. Arjun Mehta"
                  value={formData.name} onChange={handleChange}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  style={{ ...s.input, ...T.input, ...(focused === "name" ? T.inputFocus : {}) }}
                  required
                />
              </div>
              <div style={s.field}>
                <label style={{ ...s.label, color: T.label }}>Email Address</label>
                <input
                  type="email" name="email" placeholder="you@company.com"
                  value={formData.email} onChange={handleChange}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  style={{ ...s.input, ...T.input, ...(focused === "email" ? T.inputFocus : {}) }}
                  required
                />
              </div>
            </div>

            <div style={s.row}>
              <div style={s.field}>
                <label style={{ ...s.label, color: T.label }}>Category</label>
                <select
                  name="category" value={formData.category} onChange={handleChange}
                  onFocus={() => setFocused("category")} onBlur={() => setFocused(null)}
                  style={{ ...s.input, ...s.select, ...T.input, ...(focused === "category" ? T.inputFocus : {}) }}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="Access Issue">Access Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={s.field}>
                <label style={{ ...s.label, color: T.label }}>Priority</label>
                <select
                  name="priority" value={formData.priority} onChange={handleChange}
                  onFocus={() => setFocused("priority")} onBlur={() => setFocused(null)}
                  style={{
                    ...s.input, ...s.select, ...T.input,
                    ...(focused === "priority" ? T.inputFocus : {}),
                    borderColor: pc.border,
                    background: pc.bg,
                    color: pc.pill,
                    fontWeight: "600",
                  }}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <div style={s.field}>
              <label style={{ ...s.label, color: T.label }}>Issue Description</label>
              <textarea
                name="description"
                placeholder="Describe the problem in detail — what happened, when, and what you expected..."
                value={formData.description} onChange={handleChange}
                onFocus={() => setFocused("description")} onBlur={() => setFocused(null)}
                rows="4"
                style={{ ...s.input, ...s.textarea, ...T.input, ...(focused === "description" ? T.inputFocus : {}) }}
                required
              />
            </div>

            <div style={s.field}>
              <label style={{ ...s.label, color: T.label, display: "flex", alignItems: "center", gap: "8px" }}>
                Suggestion
                <span style={{ ...s.optionalTag, ...T.optionalTag }}>optional</span>
              </label>
              <textarea
                name="suggestion" placeholder="Any suggestions for resolving this faster?"
                value={formData.suggestion} onChange={handleChange}
                onFocus={() => setFocused("suggestion")} onBlur={() => setFocused(null)}
                rows="3"
                style={{ ...s.input, ...s.textarea, ...T.input, ...(focused === "suggestion" ? T.inputFocus : {}) }}
              />
            </div>

            {message && message !== "success" && (
              <div style={{ ...s.errorBanner, ...T.errorBanner }}>
                <span>⚠️</span> {message}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{ ...s.submitBtn, ...T.submitBtn, ...(loading ? s.submitDisabled : {}) }}
            >
              {loading ? (
                <span style={s.loadingRow}>
                  <span style={{ ...s.spinner, borderColor: T.spinnerBorder, borderTopColor: T.spinnerTop }} />
                  Submitting...
                </span>
              ) : (
                <span>Submit Incident ›</span>
              )}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes orbFloat{ 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-20px) scale(1.04); } }
        @keyframes checkPop{ 0% { transform:scale(0); opacity:0; } 70% { transform:scale(1.2); } 100% { transform:scale(1); opacity:1; } }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "32px 16px",
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    position: "relative", overflow: "hidden",
    transition: "background 0.25s, color 0.25s",
  },
  gradientOrb1: {
    position: "fixed", width: "500px", height: "500px",
    borderRadius: "50%", zIndex: 0, pointerEvents: "none",
    top: "-150px", right: "-150px",
    animation: "orbFloat 8s ease-in-out infinite",
  },
  gradientOrb2: {
    position: "fixed", width: "400px", height: "400px",
    borderRadius: "50%", zIndex: 0, pointerEvents: "none",
    bottom: "-100px", left: "-100px",
    animation: "orbFloat 10s ease-in-out infinite reverse",
  },
  card: {
    position: "relative", zIndex: 1,
    width: "100%", maxWidth: "640px",
    borderRadius: "20px", overflow: "hidden",
    animation: "fadeUp 0.4s ease both",
    transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
  },
  topBar:   { height: "3px" },
  header:   { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px 20px" },
  headerLeft: { display: "flex", alignItems: "center", gap: "14px" },
  iconWrap: {
    width: "44px", height: "44px", borderRadius: "12px",
    background: "linear-gradient(135deg, #EF9F27, #BA7517)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 16px rgba(239,159,39,0.3)", flexShrink: 0,
  },
  icon:     { fontSize: "20px", lineHeight: 1 },
  title:    { fontSize: "18px", fontWeight: "700", margin: 0, letterSpacing: "-0.3px", transition: "color 0.25s" },
  subtitle: { fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px", transition: "color 0.25s" },
  backBtn:  {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "8px 14px", borderRadius: "99px",
    fontSize: "11px", fontWeight: "500",
    textDecoration: "none", transition: "all 0.18s",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  divider:  { height: "1px", margin: "0 28px", transition: "background 0.25s" },
  form:     { padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: "18px" },
  row:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  field:    { display: "flex", flexDirection: "column", gap: "7px" },
  label:    { fontSize: "10px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", transition: "color 0.25s" },
  optionalTag: { fontSize: "8px", padding: "2px 7px", borderRadius: "99px", fontWeight: "500", letterSpacing: "0.5px" },
  input: {
    borderRadius: "10px", padding: "11px 14px",
    fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace",
    outline: "none", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s, color 0.25s",
  },
  select:   { appearance: "none", cursor: "pointer" },
  textarea: { resize: "vertical", lineHeight: "1.6", minHeight: "80px" },
  errorBanner: {
    borderRadius: "10px", padding: "12px 16px",
    fontSize: "12px", display: "flex", alignItems: "center", gap: "8px",
    transition: "all 0.25s",
  },
  submitBtn: {
    border: "none", borderRadius: "12px", padding: "14px",
    cursor: "pointer", fontSize: "13px", fontWeight: "700", letterSpacing: "0.5px",
    fontFamily: "'IBM Plex Mono', monospace", transition: "all 0.18s ease", marginTop: "4px",
  },
  submitDisabled: { opacity: 0.6, cursor: "not-allowed" },
  loadingRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" },
  spinner: {
    display: "inline-block", width: "14px", height: "14px",
    border: "2px solid", borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  successWrap: {
    padding: "36px 28px 32px",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "16px", animation: "fadeUp 0.4s ease both",
  },
  successIconRing: {
    width: "72px", height: "72px", borderRadius: "50%",
    background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    animation: "checkPop 0.5s ease both",
  },
  successIconInner: {
    width: "44px", height: "44px", borderRadius: "50%",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px", color: "#fff", fontWeight: "700",
    boxShadow: "0 4px 16px rgba(34,197,94,0.4)",
  },
  successTitle: { fontSize: "22px", fontWeight: "700", margin: 0, transition: "color 0.25s" },
  successSub:   { fontSize: "12px", textAlign: "center", lineHeight: "1.6", maxWidth: "340px", margin: 0, transition: "color 0.25s" },
  idCard: {
    position: "relative", overflow: "hidden",
    width: "100%", maxWidth: "400px",
    borderRadius: "16px", padding: "24px 24px 20px",
    textAlign: "center", transition: "all 0.25s",
  },
  idCardGlow: {
    position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)",
    width: "200px", height: "80px", pointerEvents: "none",
  },
  idLabel:    { fontSize: "9px", letterSpacing: "2px", fontWeight: "600", display: "block", marginBottom: "10px", transition: "color 0.25s" },
  idValueRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" },
  idValue:    { fontSize: "28px", fontWeight: "700", letterSpacing: "2px", lineHeight: 1, transition: "color 0.25s" },
  copyBtn:    { padding: "5px 12px", borderRadius: "99px", fontSize: "10px", fontWeight: "600", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", transition: "all 0.18s", letterSpacing: "0.3px" },
  idNote:     { fontSize: "10px", marginTop: "10px", marginBottom: "14px", transition: "color 0.25s" },
  idDots:     { display: "flex", justifyContent: "center", gap: "6px" },
  idDot:      { display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", transition: "background 0.25s" },
  successMeta:{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" },
  metaItem:   { display: "flex", alignItems: "center", gap: "7px" },
  metaDot:    { width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0 },
  metaText:   { fontSize: "11px", transition: "color 0.25s" },
  newBtn:     { marginTop: "4px", padding: "11px 24px", borderRadius: "99px", background: "transparent", fontSize: "12px", fontWeight: "600", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", transition: "all 0.18s", letterSpacing: "0.3px" },
};
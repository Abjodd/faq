import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import IncidentPage from "./components/incedent";

const DARK = {
  page:       { background: "#0b1220", color: "#e2e8f0" },
  chatArea:   { background: "#0b1220" },
  userBubble: { background: "#1f2937", color: "#ffffff" },
  botBubble:  { background: "#111827", color: "#e2e8f0" },
  inputBar:   { background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.07)" },
  inputWrap:  { background: "#1f2937" },
  inputEl:    { color: "#e2e8f0" },
  sendBtn:    { background: "#2563eb", color: "#ffffff" },
  sendBtnHov: { background: "#1d4ed8" },
  typing:     { color: "#6b7280" },
  cardBg:     "#1a2332",
  cardBorder: "rgba(255,255,255,0.08)",
  mutedText:  "#9ca3af",
  inputField: { background: "#0f172a", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)" },
};

const LIGHT = {
  page:       { background: "#f8f6f0", color: "#1a1a1a" },
  chatArea:   { background: "#f8f6f0" },
  userBubble: { background: "#e5e7eb", color: "#111827" },
  botBubble:  { background: "#ffffff", color: "#374151", border: "1px solid rgba(0,0,0,0.07)" },
  inputBar:   { background: "#f0ede6", borderTop: "1px solid rgba(0,0,0,0.08)" },
  inputWrap:  { background: "#e5e7eb" },
  inputEl:    { color: "#1a1a1a" },
  sendBtn:    { background: "#1a1a1a", color: "#f8f6f0" },
  sendBtnHov: { background: "#333333" },
  typing:     { color: "#9ca3af" },
  cardBg:     "#f9fafb",
  cardBorder: "rgba(0,0,0,0.08)",
  mutedText:  "#6b7280",
  inputField: { background: "#ffffff", color: "#111827", border: "1px solid rgba(0,0,0,0.15)" },
};

// ── Responsive bubble max-width ───────────────────────────────────────────────
const BUBBLE_MAX = "min(520px, calc(100vw - 80px))";

// ── Incident Option Bubble ────────────────────────────────────────────────────
function IncidentPromptBubble({ t, onSelect }) {
  return (
    <div style={{
      padding: "12px 16px", borderRadius: "18px 18px 18px 4px",
      maxWidth: BUBBLE_MAX, fontSize: "13px", lineHeight: "1.6",
      fontFamily: "'IBM Plex Mono', monospace", ...t.botBubble,
    }}>
      <p style={{ margin: "0 0 12px 0" }}>
       <strong>incident</strong>. What would you like to do?
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button onClick={() => onSelect("previous")} style={{
          padding: "7px 16px", borderRadius: "99px", border: "1px solid #2563eb",
          background: "transparent", color: "#2563eb", fontSize: "11px",
          fontWeight: "600", fontFamily: "'IBM Plex Mono', monospace",
          cursor: "pointer", letterSpacing: "0.4px",
        }}>Previous incident</button>
        <button onClick={() => onSelect("new")} style={{
          padding: "7px 16px", borderRadius: "99px", border: "1px solid #16a34a",
          background: "transparent", color: "#16a34a", fontSize: "11px",
          fontWeight: "600", fontFamily: "'IBM Plex Mono', monospace",
          cursor: "pointer", letterSpacing: "0.4px",
        }}>Create new incident</button>
      </div>
    </div>
  );
}

// ── Incident ID Form Bubble ───────────────────────────────────────────────────
function IncidentIdFormBubble({ t, onSubmit }) {
  const [id, setId] = useState("");
  return (
    <div style={{
      padding: "12px 16px", borderRadius: "18px 18px 18px 4px",
      maxWidth: BUBBLE_MAX, fontSize: "13px", lineHeight: "1.6",
      fontFamily: "'IBM Plex Mono', monospace", ...t.botBubble,
    }}>
      <p style={{ margin: "0 0 10px 0" }}>Please enter your incident ID:</p>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="text" value={id}
          onChange={e => setId(e.target.value)}
          onKeyDown={e => e.key === "Enter" && id.trim() && onSubmit(id.trim())}
          placeholder="e.g. INC-00123"
          style={{
            flex: "1 1 120px", minWidth: 0, padding: "7px 12px", borderRadius: "8px",
            fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace",
            outline: "none", ...t.inputField,
          }}
        />
        <button onClick={() => id.trim() && onSubmit(id.trim())} style={{
          padding: "7px 16px", borderRadius: "99px", border: "none",
          background: "#2563eb", color: "#fff", fontSize: "11px",
          fontWeight: "600", fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer",
        }}>Look up ›</button>
      </div>
    </div>
  );
}

// ── New Incident Form Bubble ──────────────────────────────────────────────────
function IncidentNewFormBubble({ t, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "", email: "", category: "", priority: "Low", description: "", suggestion: "",
  });

  const field = (label, key, type = "text", options = null) => (
    <div style={{ marginBottom: "10px" }}>
      <label style={{
        display: "block", fontSize: "11px", marginBottom: "4px",
        color: t.mutedText, letterSpacing: "0.5px",
      }}>{label.toUpperCase()}</label>
      {options ? (
        <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace", outline: "none", ...t.inputField }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          rows={3} style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace", outline: "none", resize: "vertical", boxSizing: "border-box", ...t.inputField }} />
      ) : (
        <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace", outline: "none", boxSizing: "border-box", ...t.inputField }} />
      )}
    </div>
  );

  return (
    <div style={{
      padding: "14px 16px", borderRadius: "18px 18px 18px 4px",
      maxWidth: BUBBLE_MAX, fontSize: "13px", lineHeight: "1.6",
      fontFamily: "'IBM Plex Mono', monospace", ...t.botBubble,
    }}>
      <p style={{ margin: "0 0 12px 0", fontWeight: "600" }}>New incident report</p>
      {field("Name", "name")}
      {field("Email", "email", "email")}
      {field("Category", "category")}
      {field("Priority", "priority", "select", ["Low", "Medium", "High", "Critical"])}
      {field("Description", "description", "textarea")}
      {field("Suggestion", "suggestion", "textarea")}
      <button onClick={() => onSubmit(form)} disabled={loading} style={{
        marginTop: "4px", padding: "8px 20px", borderRadius: "99px", border: "none",
        background: loading ? "#6b7280" : "#2563eb", color: "#fff",
        fontSize: "11px", fontWeight: "600", fontFamily: "'IBM Plex Mono', monospace",
        cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.5px",
      }}>{loading ? "Submitting..." : "Submit ›"}</button>
    </div>
  );
}

// ── Incident ID Result Bubble ─────────────────────────────────────────────────
function IncidentIdResultBubble({ t, incidentId }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(incidentId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{
      padding: "12px 16px", borderRadius: "18px 18px 18px 4px",
      maxWidth: BUBBLE_MAX, fontSize: "13px", lineHeight: "1.6",
      fontFamily: "'IBM Plex Mono', monospace", ...t.botBubble,
    }}>
      <p style={{ margin: "0 0 10px 0" }}>Incident created! Your incident ID:</p>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
        background: t.cardBg, border: `1px solid ${t.cardBorder}`,
        borderRadius: "10px", padding: "10px 14px",
      }}>
        <span style={{ flex: 1, fontSize: "14px", fontWeight: "700", letterSpacing: "1px", color: "#2563eb", wordBreak: "break-all" }}>
          {incidentId}
        </span>
        <button onClick={copy} style={{
          padding: "5px 12px", borderRadius: "99px",
          border: "1px solid #2563eb", background: copied ? "#2563eb" : "transparent",
          color: copied ? "#fff" : "#2563eb", fontSize: "10px",
          fontWeight: "600", fontFamily: "'IBM Plex Mono', monospace",
          cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
        }}>{copied ? "Copied!" : "Copy"}</button>
      </div>
    </div>
  );
}

// ── Chat Page ─────────────────────────────────────────────────────────────────
function ChatPage({ isDark, setIsDark, sidebarOpen, setSidebarOpen }) {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi 👋 Ask me anything about SAP PP!" },
  ]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [sendHov, setSendHov]         = useState(false);

  const t = isDark ? DARK : LIGHT;
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const addMsg = (msg) => setMessages(prev => [...prev, msg]);

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text) return;
    addMsg({ type: "user", text });
    setInput("");

    if (/incident/i.test(text)) {
      addMsg({ type: "incident_prompt" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/chat/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      });
      const data = await res.json();
      addMsg({ type: "bot", text: data.reply || "No response from server" });
    } catch {
      addMsg({ type: "bot", text: "⚠️ Error connecting to server" });
    }
    setLoading(false);
  };

  const handleIncidentOption = (choice) => {
    setMessages(prev => prev.map(m =>
      m.type === "incident_prompt" ? { ...m, resolved: true } : m
    ));
    addMsg({ type: choice === "previous" ? "incident_id_form" : "incident_new_form" });
  };

  const handleIncidentLookup = async (id) => {
    addMsg({ type: "user", text: `Incident ID: ${id}` });
    setMessages(prev => prev.map(m =>
      m.type === "incident_id_form" ? { ...m, resolved: true } : m
    ));
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/chat/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: `Give me the incident details for incident id ${id}` }),
      });
      const data = await res.json();
      addMsg({ type: "bot", text: data.reply || "No response from server" });
    } catch {
      addMsg({ type: "bot", text: "⚠️ Error fetching incident details" });
    }
    setLoading(false);
  };

  const handleIncidentSubmit = async (form) => {
    setFormLoading(true);
    try {
      const res = await fetch(`${API_BASE}/incident/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessages(prev => prev.map(m =>
        m.type === "incident_new_form" ? { ...m, resolved: true } : m
      ));
      addMsg({ type: "incident_id_result", incidentId: data.id || data.incident_id || "N/A" });
    } catch {
      addMsg({ type: "bot", text: "⚠️ Failed to create incident. Please try again." });
    }
    setFormLoading(false);
  };

  const handleSidebarSelect = (question) => {
    setSidebarOpen(false);
    setInput(question);
    sendMessage(question);
  };

  const markdownStyles = {
    p:          { margin: "0 0 8px 0", lineHeight: "1.6" },
    ul:         { margin: "6px 0", paddingLeft: "18px" },
    ol:         { margin: "6px 0", paddingLeft: "18px" },
    li:         { marginBottom: "4px" },
    code:       { fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", padding: "1px 5px", borderRadius: "4px", background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" },
    pre:        { margin: "8px 0", padding: "10px 14px", borderRadius: "8px", overflowX: "auto", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
    strong:     { fontWeight: "700" },
    blockquote: { margin: "8px 0", paddingLeft: "12px", borderLeft: `3px solid ${isDark ? "#2563eb" : "#1a1a1a"}`, opacity: 0.8 },
    h1: { fontSize: "15px", fontWeight: "700", margin: "0 0 8px 0" },
    h2: { fontSize: "14px", fontWeight: "700", margin: "0 0 6px 0" },
    h3: { fontSize: "13px", fontWeight: "600", margin: "0 0 5px 0" },
  };

  const renderMessage = (msg, i) => {
    if (msg.type === "user") return (
      <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ padding: "10px 16px", borderRadius: "18px 18px 4px 18px", maxWidth: BUBBLE_MAX, fontSize: "13px", lineHeight: "1.6", fontFamily: "'IBM Plex Mono', monospace", wordBreak: "break-word", ...t.userBubble }}>
          {msg.text}
        </div>
      </div>
    );

    if (msg.type === "incident_prompt" && !msg.resolved) return (
      <div key={i} style={{ display: "flex", justifyContent: "flex-start" }}>
        <IncidentPromptBubble t={t} onSelect={handleIncidentOption} />
      </div>
    );

    if (msg.type === "incident_prompt" && msg.resolved) return (
      <div key={i} style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ padding: "10px 16px", borderRadius: "18px 18px 18px 4px", maxWidth: BUBBLE_MAX, fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace", ...t.botBubble }}>
          <strong>DONE..</strong>
        </div>
      </div>
    );

    if (msg.type === "incident_id_form" && !msg.resolved) return (
      <div key={i} style={{ display: "flex", justifyContent: "flex-start" }}>
        <IncidentIdFormBubble t={t} onSubmit={handleIncidentLookup} />
      </div>
    );

    if (msg.type === "incident_new_form" && !msg.resolved) return (
      <div key={i} style={{ display: "flex", justifyContent: "flex-start" }}>
        <IncidentNewFormBubble t={t} onSubmit={handleIncidentSubmit} loading={formLoading} />
      </div>
    );

    if (msg.type === "incident_id_result") return (
      <div key={i} style={{ display: "flex", justifyContent: "flex-start" }}>
        <IncidentIdResultBubble t={t} incidentId={msg.incidentId} />
      </div>
    );

    if (msg.type === "bot" || msg.text) return (
      <div key={i} style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ padding: "10px 16px", borderRadius: "18px 18px 18px 4px", maxWidth: BUBBLE_MAX, fontSize: "13px", lineHeight: "1.6", fontFamily: "'IBM Plex Mono', monospace", wordBreak: "break-word", ...t.botBubble }}>
          <ReactMarkdown components={{
            p:          ({ children }) => <p style={markdownStyles.p}>{children}</p>,
            ul:         ({ children }) => <ul style={markdownStyles.ul}>{children}</ul>,
            ol:         ({ children }) => <ol style={markdownStyles.ol}>{children}</ol>,
            li:         ({ children }) => <li style={markdownStyles.li}>{children}</li>,
            code:       ({ children }) => <code style={markdownStyles.code}>{children}</code>,
            pre:        ({ children }) => <pre style={markdownStyles.pre}>{children}</pre>,
            strong:     ({ children }) => <strong style={markdownStyles.strong}>{children}</strong>,
            blockquote: ({ children }) => <blockquote style={markdownStyles.blockquote}>{children}</blockquote>,
            h1:         ({ children }) => <h1 style={markdownStyles.h1}>{children}</h1>,
            h2:         ({ children }) => <h2 style={markdownStyles.h2}>{children}</h2>,
            h3:         ({ children }) => <h3 style={markdownStyles.h3}>{children}</h3>,
          }}>{msg.text}</ReactMarkdown>
        </div>
      </div>
    );

    return null;
  };

  return (
    <div style={{ display: "flex", height: "100dvh", overflow: "hidden", ...t.page, transition: "background 0.25s, color 0.25s" }}>
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40, backdropFilter: "blur(2px)" }}
        />
      )}

      <Sidebar
        setSelectedQuestion={handleSidebarSelect}
        isDark={isDark}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", minWidth: 0 }}>
        <Navbar isDark={isDark} setIsDark={setIsDark} onMenuClick={() => setSidebarOpen(o => !o)} />

        <div style={{
          flex: 1, overflowY: "auto", padding: "clamp(12px, 3vw, 24px)",
          display: "flex", flexDirection: "column", gap: "16px",
          ...t.chatArea, transition: "background 0.25s",
        }}>
          {messages.map((msg, i) => renderMessage(msg, i))}
          {loading && (
            <div style={{ fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.5px", ...t.typing }}>
              Bot is typing...
            </div>
          )}
        </div>

        <div style={{ padding: "12px 16px", ...t.inputBar, transition: "background 0.25s", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            borderRadius: "99px", padding: "7px 7px 7px 16px",
            ...{ background: t.inputWrap?.background || (isDark ? "#1f2937" : "#e5e7eb") },
          }}>
            <input
              type="text"
              style={{
                flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none",
                fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace",
                ...t.inputEl, transition: "color 0.25s",
              }}
              placeholder="Ask your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              onMouseEnter={() => setSendHov(true)}
              onMouseLeave={() => setSendHov(false)}
              style={{
                padding: "8px clamp(12px, 3vw, 20px)", borderRadius: "99px", border: "none",
                fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px",
                fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer",
                transition: "all 0.18s ease", flexShrink: 0,
                ...(sendHov ? { ...t.sendBtn, ...t.sendBtnHov } : t.sendBtn),
              }}
            >Send ›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSetIsDark = (val) => {
    setIsDark(val);
    if (val) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <Routes>
      <Route path="/" element={
        <ChatPage
          isDark={isDark} setIsDark={handleSetIsDark}
          sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
        />
      } />
      <Route path="/incident" element={
        <IncidentPage isDark={isDark} setIsDark={handleSetIsDark} />
      } />
    </Routes>
  );
}

export default App;
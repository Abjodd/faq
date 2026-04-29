import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import IncidentPage from "./components/incedent";

// ── Theme tokens for ChatPage ─────────────────────────────────────────────────
const DARK = {
  page:        { background: "#0b1220", color: "#e2e8f0" },
  chatArea:    { background: "#0b1220" },
  userBubble:  { background: "#1f2937", color: "#ffffff" },
  botBubble:   { background: "#111827", color: "#e2e8f0" },
  inputBar:    { background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.07)" },
  inputWrap:   { background: "#1f2937" },
  inputEl:     { color: "#e2e8f0" },
  placeholder: "#6b7280",
  sendBtn:     { background: "#2563eb", color: "#ffffff" },
  sendBtnHov:  { background: "#1d4ed8" },
  typing:      { color: "#6b7280" },
};

const LIGHT = {
  page:        { background: "#f8f6f0", color: "#1a1a1a" },
  chatArea:    { background: "#f8f6f0" },
  userBubble:  { background: "#e5e7eb", color: "#111827" },
  botBubble:   { background: "#ffffff",  color: "#374151", border: "1px solid rgba(0,0,0,0.07)" },
  inputBar:    { background: "#f0ede6", borderTop: "1px solid rgba(0,0,0,0.08)" },
  inputWrap:   { background: "#e5e7eb" },
  inputEl:     { color: "#1a1a1a" },
  placeholder: "#9ca3af",
  sendBtn:     { background: "#1a1a1a", color: "#f8f6f0" },
  sendBtnHov:  { background: "#333333" },
  typing:      { color: "#9ca3af" },
};

// ── Chat Page ─────────────────────────────────────────────────────────────────
function ChatPage({ isDark, setIsDark }) {
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Ask me anything about SAP PP!", sender: "bot" },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sendHov, setSendHov] = useState(false);

  const t = isDark ? DARK : LIGHT;

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text) return;

    const userMsg = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { text: data.reply || "No response from server", sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to server", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  // Called by Sidebar — sets the input AND immediately sends
  const handleSidebarSelect = (question) => {
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
    h1:         { fontSize: "15px", fontWeight: "700", margin: "0 0 8px 0" },
    h2:         { fontSize: "14px", fontWeight: "700", margin: "0 0 6px 0" },
    h3:         { fontSize: "13px", fontWeight: "600", margin: "0 0 5px 0" },
  };

  return (
    <div style={{ display: "flex", height: "100vh", ...t.page, transition: "background 0.25s, color 0.25s" }}>

      {/* Sidebar — auto-sends on question select */}
      <Sidebar setSelectedQuestion={handleSidebarSelect} isDark={isDark} />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>

        {/* Navbar */}
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        {/* Chat area */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "24px",
          display: "flex", flexDirection: "column", gap: "16px",
          ...t.chatArea, transition: "background 0.25s",
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                padding: "10px 16px",
                borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                maxWidth: "520px",
                fontSize: "13px",
                lineHeight: "1.6",
                fontFamily: "'IBM Plex Mono', monospace",
                transition: "background 0.25s, color 0.25s",
                ...(msg.sender === "user" ? t.userBubble : t.botBubble),
              }}>
                {msg.sender === "bot" ? (
                  <ReactMarkdown
                    components={{
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
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.5px", ...t.typing }}>
              Bot is typing...
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ padding: "14px 20px", ...t.inputBar, transition: "background 0.25s, border-color 0.25s" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            borderRadius: "99px", padding: "8px 8px 8px 18px",
            ...t.inputWrap, transition: "background 0.25s",
          }}>
            <input
              type="text"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
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
                padding: "8px 20px", borderRadius: "99px", border: "none",
                fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px",
                fontFamily: "'IBM Plex Mono', monospace",
                cursor: "pointer", transition: "all 0.18s ease",
                ...(sendHov ? { ...t.sendBtn, ...t.sendBtnHov } : t.sendBtn),
              }}
            >
              Send ›
            </button>
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

  const handleSetIsDark = (val) => {
    setIsDark(val);
    if (val) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<ChatPage isDark={isDark} setIsDark={handleSetIsDark} />} />
      <Route path="/incident" element={<IncidentPage isDark={isDark} setIsDark={handleSetIsDark} />} />
    </Routes>
  );
}

export default App;
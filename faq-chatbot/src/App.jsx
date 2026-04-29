import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import IncidentPage from "./components/incedent";

// 🔹 Chat Page (your current UI)
function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Ask me anything!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMsg = {
        text: data.reply || "No response from server",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to server", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen 
          bg-white text-black 
          dark:bg-[#0b1220] dark:text-gray-200 
          transition-colors duration-300">
      <Sidebar setSelectedQuestion={setInput}/>

      <div className="flex flex-col flex-1">
        <Navbar />

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-md shadow-md ${
                  msg.sender === "user"
                  ? "bg-gray-200 text-black dark:bg-[#1f2937] dark:text-white"
                  : "bg-gray-100 text-black dark:bg-[#111827] dark:text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="dark:text-gray-400 text-gray-500 text-sm animate-pulse">
              Bot is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-tbg-gray-100 border-gray-200 
          dark:bg-[#0f172a] dark:border-white/10">
          <div className="flex items-center gap-3 bg-gray-200 dark:bg-[#1f2937] rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Ask your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-gray-900 text-white hover:bg-black 
              dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700
              px-4 py-2 rounded-full text-sm transition-all duration-200 active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 Main App with routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/incident" element={<IncidentPage />} />
    </Routes>
  );
}

export default App;
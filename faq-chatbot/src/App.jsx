import { useState } from "react";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

function App() {
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
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
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
                className={`px-4 py-2 rounded-2xl max-w-md shadow-md transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-blue-600 animate-fade-in"
                    : "bg-gray-800 animate-fade-in"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-400 text-sm animate-pulse">
              Bot is typing...
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex items-center gap-3 bg-gray-800 rounded-full px-4 py-2 shadow-inner">
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
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm transition-all duration-200 active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ FIX

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
  document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between 
      bg-gray-200 text-black border-b border-gray-200 backdrop-blur-xl
      dark:bg-[#0f1a2b] dark:text-gray-200 dark:border-white/5">

      {/* 🔹 Left: Incident Button */}
      <Link
        to="/incident"
        className="bg-gray-900 text-white hover:bg-black 
        dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700
        px-4 py-2 rounded-full text-sm transition-all duration-200 active:scale-95"
      >
        + Raise Incident
      </Link>

      {/* 🔹 Center: Title */}
      <h1 className="text-lg font-semibold  tracking-wide">
        FAQ Chatbot
      </h1>

      {/* 🔹 Right: Controls */}
      <div className="flex items-center gap-4 relative">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-full 
          bg-white/5 hover:bg-white/10 transition text-gray-300"
        >
         {isDark ? "🌙" : "☀️"}
        </button>

        {/* User */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full 
          bg-white/5 border border-white/10 hover:bg-white/10 
          cursor-pointer transition"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 
          flex items-center justify-center text-sm font-semibold text-white">
            A
          </div>
          <span className="text-sm ">Admin</span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-14 w-40 bg-[#111827] 
          border border-white/10 rounded-lg shadow-lg overflow-hidden">

            <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
              Profile
            </button>

            <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
              Settings
            </button>

            <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10">
              Logout
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
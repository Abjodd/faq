import { useState } from "react";
import { Link } from "react-router-dom";

export default function IncidentPage() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // 🔥 safe parsing
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage("✅ Incident submitted successfully!");
        setFormData({
          name: "",
          email: "",
          category: "",
          priority: "Low",
          description: "",
          suggestion: "",
        });
      } else {
        setMessage(data?.message || "❌ Failed to submit incident");
      }
    } catch (err) {
      // 🔥 fallback if backend not running
      setMessage("⚠️ Backend not connected (you can still test UI)");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 
        dark:bg-[#0b1220] dark:text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl p-6 rounded-2xl shadow-lg border bg-white border border-gray-200 shadow-xl rounded-2xl
        dark:bg-[#111827] dark:border-white/10">

        {/* 🔹 Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🚨 Raise an Incident</h2>

          <Link
            to="/"
           className="text-sm text-black hover:underline dark:text-blue-400"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-400 bg-white text-gray-900 
            focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500
            dark:bg-[#1f2937] dark:border-gray-600 dark:text-white 
            dark:focus:border-gray-400 dark:focus:ring-gray-700 transition"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-400 bg-white text-gray-900 
            focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500
            dark:bg-[#1f2937] dark:border-gray-600 dark:text-white 
            dark:focus:border-gray-400 dark:focus:ring-gray-700 transition"
            required
          />

          {/* Category + Priority row */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-400 bg-white text-gray-900
              focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-500
              dark:bg-[#1f2937] dark:border-gray-600 dark:text-white 
              dark:focus:border-gray-400 dark:focus:ring-gray-700
              transition"
              required
            >
              <option value="">Category</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Access Issue">Access</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-400 bg-white text-gray-900
              focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-500
              dark:bg-[#1f2937] dark:border-gray-600 dark:text-white 
              dark:focus:border-gray-400 dark:focus:ring-gray-700
              transition"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe the issue..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-400 bg-white text-gray-900 
            focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500
            dark:bg-[#1f2937] dark:border-gray-600 dark:text-white 
            dark:focus:border-gray-400 dark:focus:ring-gray-700 transition"
            required
          />

          {/* Suggestion */}
          <textarea
            name="suggestion"
            placeholder="Suggestion (optional)"
            value={formData.suggestion}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 rounded-lg border border-gray-400 bg-white text-gray-900 
            focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500
            dark:bg-[#1f2937] dark:border-gray-600 dark:text-white 
            dark:focus:border-gray-400 dark:focus:ring-gray-700 transition"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
className="w-full 
bg-gray-900 text-white hover:bg-black 
dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700
py-3 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50"          >
            {loading ? "Submitting..." : "Submit Incident"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-sm text-gray-300 animate-fade-in">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
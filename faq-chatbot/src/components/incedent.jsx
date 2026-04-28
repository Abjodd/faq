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
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">

        {/* 🔹 Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🚨 Raise an Incident</h2>

          <Link
            to="/"
            className="text-sm text-blue-400 hover:underline"
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
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition"
            required
          />

          {/* Category + Priority row */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
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
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
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
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
            required
          />

          {/* Suggestion */}
          <textarea
            name="suggestion"
            placeholder="Suggestion (optional)"
            value={formData.suggestion}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
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
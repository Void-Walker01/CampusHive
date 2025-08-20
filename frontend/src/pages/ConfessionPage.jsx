// src/pages/ConfessionPage.jsx
import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";
import ConfessionCard from "../components/ConfessionCard";

const ConfessionPage = () => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [newConfession, setNewConfession] = useState("");
  const [submitting, setSubmitting] = useState(false);

  
  const fetchConfessions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/confessions");
      setConfessions(response.data.data);
    } catch (err) {
      setError("Failed to fetch confessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    setSubmitting(true);
    try {
      await apiClient.post("/confessions", { content: newConfession });
      setNewConfession("");
      await fetchConfessions();
    } catch (err) {
      console.error(err);
      setError("Failed to post confession");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-4xl font-bold text-center mb-2 text-purple-400">
        Anonymous Confessions
      </h1>

      
      <p className="text-center text-cyan-400 mb-8">
        🤫 Anonymous Polls Coming Soon! 📊
      </p>

      
      <div className="mb-8 w-full max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-md p-4 border border-gray-700"
        >
          <textarea
            className="w-full p-3 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:border-purple-400 resize-none"
            rows="4"
            placeholder="Be careful, it cannot be edited later 👻"
            value={newConfession}
            onChange={(e) => setNewConfession(e.target.value)}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-500 text-sm">
              {newConfession.length}/500
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Confession"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center gap-6">
        {loading ? (
          <p>Loading confessions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : confessions.length > 0 ? (
          confessions.map((confession) => (
            <ConfessionCard key={confession._id} confession={confession} />
          ))
        ) : (
          <p>No confessions yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
};

export default ConfessionPage;
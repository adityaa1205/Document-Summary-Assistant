import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload.jsx";
import Result from "./pages/Result.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-gray-900 dark:text-gray-100">
      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow hover:scale-105 transition"
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>

      <h1 className="text-3xl font-bold mb-2"> Document Summary Assistant</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-6">
        Upload your documents and instantly generate clear, concise summaries.  
        Switch between extracted text and AI-generated insights with ease.
      </p>

      {/* Boxed Section */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <FileUpload onResult={setData} setLoading={setLoading} />
        {loading && <p className="text-blue-500 mt-4">⏳ Processing your document...</p>}
        {data && <Result data={data} />}
      </div>
    </div>
  );
}

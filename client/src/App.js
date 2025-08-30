import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload.jsx";
import Result from "./pages/Result.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // NEW: progress state
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Animate progress bar when loading
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 98) return prev + 2; // Animate up to 98%
          return prev;
        });
      }, 40);
    } else if (!loading && progress !== 0) {
      setProgress(100); // Instantly fill to 100% when done
      setTimeout(() => setProgress(0), 500); // Hide after short delay
    }
    return () => clearInterval(interval);
  }, [loading]);

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
        {/* Loading Progress Bar */}
        {loading && (
          <div className="w-full mt-4">
            <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
              Summarizing... {progress}%
            </div>
          </div>
        )}
        {data && <Result data={data} />}
      </div>
    </div>
  );
}
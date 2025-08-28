import React, { useState } from "react";
import { jsPDF } from "jspdf";
import ReactMarkdown from "react-markdown";

export default function Result({ data }) {
  const [tab, setTab] = useState("summary");

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("AI Document Summary", 10, 10);
    doc.text(data.summary || "No summary", 10, 20);
    doc.save("summary.pdf");
  };

  return (
    <div className="mt-6">
      {/* Tab Switcher */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setTab("summary")}
          className={`flex-1 py-2 rounded-lg ${
            tab === "summary"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setTab("text")}
          className={`flex-1 py-2 rounded-lg ${
            tab === "text"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          Extracted Text
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner min-h-[200px]">
        {tab === "summary" ? (
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold text-green-600 mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold text-green-600 mb-2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold text-green-600 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 mb-2" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-green-600" {...props} />
              ),
            }}
          >
            {data.summary || "_No summary available._"}
          </ReactMarkdown>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 mb-2" {...props} />
              ),
            }}
          >
            {data.text || "_No text extracted._"}
          </ReactMarkdown>
        )}
      </div>

      {/* Buttons */}
      {tab === "summary" && (
        <button
          onClick={downloadPDF}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          ⬇ Download Summary as PDF
        </button>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 ml-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        🔄 Start Again
      </button>
    </div>
  );
}

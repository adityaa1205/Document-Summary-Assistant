
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function FileUpload({ onResult, setLoading }) {
  const [length, setLength] = useState(1); // 0=short,1=medium,2=long
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ maxFiles: 1 });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleUpload = async () => {
    if (!acceptedFiles.length) return alert("Please select a file");

    const fd = new FormData();
    fd.append("file", acceptedFiles[0]);
    fd.append("length", ["short", "medium", "long"][length]);

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/process`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(data);
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-green-400 bg-green-50 p-10 text-center rounded-xl cursor-pointer hover:bg-green-100 transition"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Drag & drop a PDF or image here, or click to select</p>
      </div>

      {/* Slider control */}
      <div className="mt-6 text-center">
        <label className="block font-medium mb-2">Summary Length</label>
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-2/3 accent-green-500"
        />
        <div className="flex justify-between w-2/3 mx-auto text-sm text-gray-600 mt-1">
          <span>Short</span>
          <span>Medium</span>
          <span>Long</span>
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Upload & Summarize
      </button>
    </div>
  );
}



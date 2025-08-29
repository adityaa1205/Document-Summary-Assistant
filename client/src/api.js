

// src/api.js

// Base URL for your backend API
// ✅ Uses environment variable in production
// ✅ Falls back to localhost in development

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper for GET requests
export async function getData(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`GET ${endpoint} failed: ${res.status}`);
  }
  return res.json();
}

// Helper for POST requests
export async function postData(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`POST ${endpoint} failed: ${res.status}`);
  }
  return res.json();
}

// Export base URL if you want to use fetch directly


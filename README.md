# 📄 Document Summary Assistant  

A **MERN-stack** web app that extracts text from PDFs and images (via OCR) and generates AI-powered summaries using **Google Gemini API**.  

---

## 🚀 Live Demo
*( deployed  URL)*  
- **Docs_Summarizer**: https://document-summary-assistant-omega.vercel.app/

---

## ✨ Features

- 📂 Upload PDF or image files (drag-drop or file picker)  
- 📝 Text extraction:
  - PDFs → `pdf-parse`  
  - Images (scans/screenshots) → `tesseract.js` OCR  
- 🤖 AI Summary (Gemini via AI Studio)  
  - Short / Medium / Long summaries  
  - Handles long docs with chunking + map-reduce  
- 🎨 Modern UI with Tailwind CSS  
  - Mobile responsive  
  - Collapsible extracted text  
  - Copy & download summary  

---

## 🖼 Screenshots


| Upload Document | View Summary |
|-----------------|--------------|
| [Upload Screenshot](<img width="1919" height="867" alt="upload" src="https://github.com/user-attachments/assets/3cc9cc23-0340-4eb5-8e77-faeda14d5967" />| ![Summary Screenshot]<img width="840" height="577" alt="summary" src="https://github.com/user-attachments/assets/906a4e9f-0fd6-4c36-a665-3766539e1aa2" />


---

## 🛠 Tech Stack

| Component     | Technology                  |
|---------------|-----------------------------|
| Frontend      | React, Tailwind CSS         |
| API Calls     | Axios                       |
| Backend       | Node.js, Express            |
| File Upload   | Multer                      |
| PDF Parsing   | pdf-parse                   |
| OCR           | tesseract.js                |
| AI Summarizer | Google Gemini (AI Studio)   |
| Deployment    | Vercel (frontend), Render (backend) |

---

## 🖥 Getting Started (Local Setup)

```bash
# 1. Clone repo
git clone https://github.com/adityaa1205/Document-Summary-Assistant.git
cd Document-Summary-Assistant
# 🛠 Setup Instructions

## Backend Setup
```bash
cd server
npm install

# Create .env inside server/:
PORT=5000
GEMINI_API_KEY=AIzaSy…your_key_here…

npm start

## Frontend Setup
```bash
cd ../client
npm install
# Create .env inside client/:
REACT_APP_API_URL=http://localhost:5000/api

🚀 Use the App
Open http://localhost:3000
→ Upload PDF/image → Get summary.

Project Structure:
Document-Summary-Assistant/
├── client/            # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── .env
├── server/            # Express backend
│   ├── controllers/
│   │   ├── fileController.js
│   │   └── summaryController.js
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md

```

## Document Summary Assistant

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)](https://nodejs.org/)  
[![React](https://img.shields.io/badge/React-19.x-blue?logo=react)](https://react.dev/)  
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey?logo=express)](https://expressjs.com/)  
[![Google Gemini](https://img.shields.io/badge/Gemini-AI%20Summarizer-purple?logo=google)](https://ai.google.dev/)  
[![License](https://img.shields.io/badge/License-MIT-yellow)](#license)  




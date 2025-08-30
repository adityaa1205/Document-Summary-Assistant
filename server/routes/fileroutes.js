import express from 'express';
import multer from 'multer';
import { processFile } from '../controllers/filecontroller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/process', upload.single('file'), processFile);
console.log("✅ fileroutes.js loaded");

export default router;
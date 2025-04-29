import express from 'express';
import ChatController from '../controllers/chatController.js';

const router = express.Router();
router.post("/api/chat", ChatController.handleChat);

export default router;
import express from  "express";
import { gameUpload } from "../controllers/gameData.controller.js";
const router = express.Router();

router.post("/upload", gameUpload)


export default router;
import express from  "express";
import { viewTicket, genarateTicketBeforeBooking } from "../controllers/ticket.controller.js";
const router = express.Router();

router.get("/view", viewTicket)
router.get("/generate", genarateTicketBeforeBooking)


export default router;
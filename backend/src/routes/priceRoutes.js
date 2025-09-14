// routes/priceRoutes.js
import { Router } from "express";
import { getOptions, getQuote } from "../controllers/priceController.js";

const router = Router();

router.get("/options", getOptions);
router.post("/quote", getQuote);

export default router;

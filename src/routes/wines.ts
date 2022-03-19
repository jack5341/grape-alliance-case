import { Router } from "express";
const router = Router();

// Controllers
import getRelated from "../controllers/related";
import getWines from "../controllers/wines";

router.get("/wine", getWines);

router.get("/wine/:id/related", getRelated);

export default router;

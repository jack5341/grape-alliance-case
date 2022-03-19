import { Router } from "express";
const router = Router();

// Controllers
import getRelated from "../controllers/related";
import getWines from "../controllers/wines";

router.get("/wines", getWines);

router.get("/wine/:id/related", getRelated);

export default router;

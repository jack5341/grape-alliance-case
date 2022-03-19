// Third parties imports
import express from "express";
const app = express();

// Controllers
import getRelated from "./controllers/related";
import getWines from "./controllers/wines";

// Utils
import CONSTANTS from "./constants/contants";
import { logger } from "./logger/logger";
import { runDB } from "./utils/db";

// Run DB init function
(async () => await runDB())();

app.get("/wines", getWines);

app.get("/wine/:id/related", getRelated);

app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`);
});

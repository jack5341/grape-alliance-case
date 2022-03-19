// Third parties imports
import express from "express";
const app = express();

// Routes
import Wines from "./routes/wines";

// Constants
import CONSTANTS from "./constants/contants";

// Logger
import { logger } from "./logger/logger";

// Database connection
import { runDB } from "./utils/db";
import bodyParser from "body-parser";

// Run DB init function
(async () => await runDB())();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Wines);

app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`);
});

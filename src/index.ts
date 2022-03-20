// Third parties imports
import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import cors from "cors";

// Document
import swaggerDocument from "../swagger.json";
const app = express();

// Constants
import CONSTANTS from "./constants/contants";

// Logger
import { logger } from "./logger/logger";

// Routes
import Wines from "./routes/wines";

// Database connection
import { runDB } from "./utils/db";

// Run DB init function
(async () => await runDB())();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(Wines);

// Start server
const server = app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`);
});

export default server;

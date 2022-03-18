import express from "express";
const app = express();

import CONSTANTS from "./constants/contants";
import { logger } from "./logger/logger";
import { getStore } from "./utils/getStore";

import { Wine } from "./entities/product";

var DB: void | Wine[] = [];

async () => {
    // Initilaze and get DB
    DB = await getStore().catch((err) => {
        logger.error(err);
    });
};

app.get("/", (req, res) => {
    logger.info("Hello World!");
    res.send(DB);
});

app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`);
});

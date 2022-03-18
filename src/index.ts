import express from "express";
const app = express();

import CONSTANTS from "./constants/contants";
import { logger } from "./logger/logger";
import { getStore } from "./utils/getStore";

import { Wine } from "./entities/product";

var DB: Wine[] = [];

(async () => {
    // Initilaze and get DB
    DB = (await getStore().catch((err) => {
        logger.error(err);
    })) as Wine[];

    console.log(DB);
})();

app.get("/", (req, res) => {
    res.send(DB);
});

app.get("/search", (req, res) => {
    const { title } = req.query;

    if (!title) {
        logger.error("no title founded");
        res.status(400).send("missing title");
        return;
    }

    const foundWine = DB.find((wine) => title === wine.title);
    logger.info(`wine ${title} is searched`);

    if (!foundWine) {
        logger.error(`wine ${title} is not found`);
        res.status(404).send("not found");
        return;
    }

    logger.info(`found ${foundWine.id}`);
    res.send(foundWine);
});

app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`);
});

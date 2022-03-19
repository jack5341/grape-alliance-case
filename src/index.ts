import express from "express";
const app = express();

import CONSTANTS from "./constants/contants";
import { logger } from "./logger/logger";
import { getStore } from "./utils/getStore";

import { Wine } from "./entities/product";

var DB: Wine[] = [];

app.use(async (req, res, next) => {
    // Initilaze and get DB
    DB = (await getStore().catch((err) => {
        logger.error(err);
    })) as Wine[];

    logger.info(`DB is initialized with ${DB.length} records`);
    next();
});

app.get("/", (req, res) => {
    const queries = {
        country: req.query.country as string,
        winary: req.query.winary as string,
        color: req.query.color as string,
    };

    switch (queries) {
        default:
            res.status(400).send("missing query");
            break;
    }
});

app.post("/wine", (req, res) => {
    const wine = req.body as Wine;
    DB.push(wine);
    res.status(200).send(wine);
});

app.get("/wines", (req, res) => {
    const { title, country, winery, color } = req.query;

    if (title) {
        let foundWine = DB.find((wine) => title === wine.title);
        logger.info(`wine ${title} is searched`);

        if (!foundWine) {
            logger.error(`wine ${title} is not found`);
            res.status(404).send("not found");
            return;
        }

        logger.info(`found ${foundWine.id}`);
        res.send(foundWine);
        return;
    }

    if (country) {
        let foundWine = DB.filter((wine) => country === wine.country);
        logger.info(`wine ${country} is searched`);

        if (!foundWine) {
            logger.error(`wine ${country} is not found`);
            res.status(404).send("not found");
            return;
        }

        logger.info(`found ${foundWine.length}`);
        res.send(foundWine);
        return;
    }

    if (color) {
        let foundWine = DB.filter((wine) => color === wine.color);
        logger.info(`wine ${color} is searched`);

        if (!foundWine) {
            logger.error(`wine ${color} is not found`);
            res.status(404).send("not found");
            return;
        }

        logger.info(`found ${foundWine.length}`);
        res.send(foundWine);
        return;
    }

    if (winery) {
        logger.error("winery is not supported");
        res.status(400).send("winery query is not supported");
        return;
    }

    logger.error("no query founded");
    res.status(400).send("missing query");
    return;
});

app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`);
});

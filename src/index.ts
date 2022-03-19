// Third parties imports
import express from "express";
import { Request, Response } from "express-serve-static-core";
const app = express();

// Utils
import CONSTANTS from "./constants/contants";
import { logger } from "./logger/logger";
import { getStore } from "./utils/getStore";

// Entities
import { Wine } from "./entities/product";
import { ReqQuery } from "./entities/express";

var DB: Wine[] = [];

app.use(async (req, res, next) => {
    // Initilaze and get DB
    DB = (await getStore().catch((err) => {
        logger.error(err);
    })) as Wine[];

    logger.info(`DB is initialized with ${DB.length} records`);
    next();
});

app.get("/wines", (req: Request<ReqQuery>, res: Response) => {
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

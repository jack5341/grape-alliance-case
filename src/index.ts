// Third parties imports
import express from "express";
import { Request, Response } from "express-serve-static-core";
const app = express();

// Utils
import CONSTANTS from "./constants/contants";
import { logger } from "./logger/logger";
import { initDB } from "./utils/db";

// Entities
import { Wine } from "./entities/product";
import { ReqQuery } from "./entities/express";

// In-memory database
var DB: Wine[] = [];

async function initializeDB() {
    DB = (await initDB().catch((err) => {
        logger.error(err);
    })) as Wine[];

    logger.info(`DB is initialized with ${DB.length} records`);
}

initializeDB();

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

app.get("/wine/:id/related", (req: Request<ReqQuery>, res: Response) => {
    const { id } = req.params;

    if (!id) {
        logger.error("id is required arg");
        res.status(400).send();
        return;
    }

    let foundWine = DB.find((wine) => id === wine.id);
    logger.info(`wine ${id} is searched`);

    if (!foundWine) {
        logger.error(`wine ${id} is not found`);
        res.status(404).send("not found");
        return;
    }

    logger.info(`found ${foundWine.id}`);

    let getRelatedWines: Wine[] = DB.filter((wine) => wine.grapes === foundWine?.grapes);

    if (getRelatedWines.length === 0) {
        logger.error(`related wines is not found`);
        res.status(404).send("not found");
        return;
    }

    res.send(getRelatedWines);
    return;
});

app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`);
});

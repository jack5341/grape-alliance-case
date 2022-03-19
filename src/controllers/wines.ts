// Types of express
import { Request, Response } from "express-serve-static-core";

// Entities
import { ReqQuery } from "../entities/express";

// Logger
import { logger } from "../logger/logger";

// DB
import { DB } from "../utils/db";

export default function getWines(req: Request<ReqQuery>, res: Response) {
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
}

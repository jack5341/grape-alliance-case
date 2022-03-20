// Types of express
import { Request, Response } from "express-serve-static-core";

// Entities
import { WineQuery } from "../entities/express";

// Logger
import { logger } from "../logger/logger";

// DB
import { DB } from "../utils/db";

export default function getWines(req: Request<{}, {}, {}, WineQuery>, res: Response) {
    const { title, country, winery, color, page, limit } = req.query;

    const pageCount = page ? parseInt(page) : 1;
    const limitPage = limit ? parseInt(limit) : 10;

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
        let foundWine =
            pageCount && limitPage
                ? DB.filter((wine) => country === wine.country).slice(pageCount * limitPage, pageCount * limitPage + limitPage)
                : DB.filter((wine) => country === wine.country);

        logger.info(`wine ${country} is searched`);

        if (!foundWine) {
            logger.error(`wine ${country} is not found`);
            res.status(404).send("not found");
            return;
        }

        logger.info(`found ${foundWine.length}`);

        if (foundWine.length <= 1) {
            logger.error(`wine ${country} is not found`);
            res.status(404).send("not found");
            return;
        }

        res.send(foundWine);
        return;
    }

    if (color) {
        let foundWine =
            pageCount && limitPage
                ? DB.filter((wine) => color === wine.color).slice(pageCount * limitPage, pageCount * limitPage + limitPage)
                : DB.filter((wine) => color === wine.color);

        logger.info(`wine ${color} is searched`);

        if (!foundWine) {
            logger.error(`wine ${color} is not found`);
            res.status(404).send("not found");
            return;
        }

        logger.info(`found ${foundWine.length}`);

        if (foundWine.length <= 1) {
            logger.error(`wine ${color} is not found`);
            res.status(404).send("not found");
            return;
        }

        res.send(foundWine);
        return;
    }

    if (winery) {
        // This is not return yet becasue winery is not in csv file
        logger.error("winery is not supported");
        res.status(400).send("winery query is not supported");
        return;
    }

    logger.error("no query founded");
    res.status(400).send("missing query");
    return;
}

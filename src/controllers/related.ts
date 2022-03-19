import { Request, Response } from "express-serve-static-core";

// Entities
import { ReqQuery } from "../entities/express";
import { Wine } from "../entities/product";

// Logger
import { logger } from "../logger/logger";

// DB
import { DB } from "../utils/db";

export default async function getRelated(req: Request<ReqQuery>, res: Response) {
    const { id } = req.params;

    let foundWine = DB.find((wine) => id === wine.id);
    logger.info(`wine ${id} is searched`);

    if (!foundWine) {
        logger.error(`wine ${id} is not found`);
        res.status(404).send("not found");
        return;
    }

    logger.info(`found ${foundWine.id}`);

    let getRelatedWines: Wine[] = DB.filter((wine) => wine.grapes === foundWine?.grapes);

    if (getRelatedWines.length < 1) {
        logger.error(`related wines is not found`);
        res.status(404).send("not found");
        return;
    }

    res.send(getRelatedWines);
    return;
}

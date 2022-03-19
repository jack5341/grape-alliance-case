import { Request, Response } from "express-serve-static-core";

// Entities
import { ReqQuery } from "../entities/express";
import { Wine } from "../entities/product";

// Utils
import { logger } from "../logger/logger";
import { DB } from "../utils/db";

export default async function getRelated(req: Request<ReqQuery>, res: Response) {
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
}

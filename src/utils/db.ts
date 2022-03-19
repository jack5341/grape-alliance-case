import fs from "fs";
import csv from "csv-parser";

import { Wine } from "../entities/product";
import { logger } from "../logger/logger";

// In-memory storage
export var DB: Wine[] = [];

// Run DB init function
export async function runDB() {
    DB = (await initDB().catch((err) => {
        logger.error(err);
    })) as Wine[];

    logger.info(`DB is initialized with ${DB.length} records`);
}

function initDB() {
    return new Promise<Wine[]>((resolve, reject) => {
        const DB: Wine[] = [];
        fs.createReadStream("./db/product.csv", "utf8")
            .pipe(csv())
            .on("data", (data) => {
                DB.push(data);
            })
            .on("end", () => {
                resolve(DB);
            })
            .on("error", (err) => {
                reject(err);
            });
    });
}

runDB();

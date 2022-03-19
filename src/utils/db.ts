import fs from "fs";
import csv from "csv-parser";

import { Wine } from "../entities/product";

export function initDB() {
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

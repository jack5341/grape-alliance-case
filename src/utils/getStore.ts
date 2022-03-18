import fs from "fs";
import csv from "csv-parser";

import { Wine } from "../entities/product";

export function getStore() {
    return new Promise<Wine[]>((resolve, reject) => {
        fs.createReadStream("./db/product.csv", "utf8")
            .pipe(csv())
            .on("data", (data) => {
                resolve(data);
            })
            .on("error", (err) => {
                reject(err);
            });
    });
}

import fs from "fs";
import csv from "csv-parser"

export function getStore() {   
    return new Promise((resolve, reject) => {
        fs.createReadStream("./db/product.csv", "utf8").pipe(csv()).on("data", (data) => {
            resolve(data)
        }).on("error", (err) => {
            reject(err)
        })
    })
}
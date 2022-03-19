import winston from "winston";
import CONSTANTS from "../constants/contants";

export const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: CONSTANTS.SERVICE_NAME },
    transports: [
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/info.log", level: "info" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

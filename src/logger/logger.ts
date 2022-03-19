import winston from "winston";
import CONSTANTS from "../constants/contants";

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logLevel = CONSTANTS.NODE_ENV === "development" ? ["error", "warn", "info"] : ["error"];

export const logger = winston.createLogger({
    format: format,
    defaultMeta: { service: CONSTANTS.SERVICE_NAME },
    transports: [
        new winston.transports.Console({ consoleWarnLevels: logLevel }),

        /*

        << https://12factor.net/logs >>
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/info.log", level: "info" }),
        new winston.transports.File({ filename: "logs/combined.log" }),

        */
    ],
});

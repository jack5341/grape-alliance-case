import winston from "winston";
import CONSTANTS from "../constants/contants";

export const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: CONSTANTS.SERVICE_NAME },
    transports: [
        new winston.transports.Console({ consoleWarnLevels: CONSTANTS.NODE_ENV === "development" ? ["error", "warn", "info"] : ["error"] }),

        /*

        << https://12factor.net/logs >>
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/info.log", level: "info" }),
        new winston.transports.File({ filename: "logs/combined.log" }),

        */
    ],
});

import express from "express"
const app = express()

import CONSTANTS from "./constants/contants"
import { logger } from "./logger/logger"
import { getStore } from "./utils/getStore"

// Initilaze and get DB
const DB = getStore().catch(err => {
    logger.error(err)
})

app.get("/", (req, res) => {
    logger.info("Hello World!")
    res.send("Hello World!")
})

app.listen(CONSTANTS.PORT, () => {
    console.log(`listening on port ${CONSTANTS.PORT}`);
    logger.info(`${CONSTANTS.SERVICE_NAME} is listening on port ${CONSTANTS.PORT}`)
})
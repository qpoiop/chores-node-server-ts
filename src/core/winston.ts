import winston from "winston"
import prisma from "~/prisma/prisma-client"

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "app.log",
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
})

if (prisma !== undefined) {
    prisma.$on("query", e => {
        logger.info(`[Excute]: ${e.timestamp}, [Duration]: ${e.duration}ms`)
        logger.info(`[Params]: ${JSON.stringify(e.params)}, [Query]: ${e.query}`)
    })
}

export const stream = {
    write: message => {
        logger.info(message)
    },
}

export default logger

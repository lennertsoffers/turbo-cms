import {
    createLogger,
    format,
    transports
} from "winston";

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format((info) => ({
            ...info,
            level: info.level.toUpperCase()
        }))(),
        format.align(),
        format.colorize(),
        format.errors({
            stack: true
        }),
        format.prettyPrint(),
        format.simple(),
        format.splat(),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(({ timestamp, level, message }) => `[${level}] ${timestamp}: ${message}`)
    ),
    transports: [
        new transports.Stream({
            stream: process.stdout,
            level: "debug"
        })
    ]
});

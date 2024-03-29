import winston from "winston";

const logger = winston.createLogger ({
    format: winston.format.combine(
        winston.format.label({ label: "hotels api" }),
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
        transports: [
            new winston.transports.File ({ filename: "error.log", level: "error"}),
            new winston.transports.File ({ filename: "info.log", level: "info"}),
            new winston.transports.Console(),
        ]
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

export default logger;
import winston from 'winston';
import fs from 'fs';

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename: './log/info.log'})
    ]
});

export const errorLogger = winston.createLogger({
    level:'error',
    format: winston.format.json(),
    defaultMeta:{service:'error-logging'},
    transports:[
        new winston.transports.File({filename: './log/error.log'})
    ]
});

const loggerMiddleware = async (req, res, next) => {
    if(req.url.includes("/user"))
        return next();
    const logData = `${new Date().toTimeString()}: ${req.url} - ${JSON.stringify(req.body)}\n`;
    logger.info(logData);
    next();
}

export default loggerMiddleware;
import { errorLogger } from "./logger.middleware.js";

export class customErrorHandler extends Error {
    constructor(statusCode, errMessage) {
        super(errMessage);
        this.statusCode = statusCode;
    }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    errorLogger.log({
      level: 'error',
      timestamp: new Date().toISOString(),
      url: req.originalUrl,
      message: err.message
    });
  
    if (err instanceof customErrorHandler) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  
    // Unhandled errors
    return res.status(500).json({ 
      message: 'Oops! Something went wrong... Please try again later!'
    });
  
  };
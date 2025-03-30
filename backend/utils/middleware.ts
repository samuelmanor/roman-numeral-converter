import { Request, Response, NextFunction } from "express";
import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

// Create Winston logger
export const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf(
      (info) =>
        `[${info.timestamp}] ${info.level}: ${info.message} (${info.method} ${
          info.path
        } query: ${JSON.stringify(info.query)})`
    )
  ),
  defaultMeta: { service: "roman-numeral-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a separate file
    new winston.transports.File({ filename: "combined.log" }), // Log all messages to a combined file
    new winston.transports.Console(),
  ],
});

// Middleware function to log incoming requests
export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info(`Incoming request`, {
    method: request.method,
    path: request.path,
    query: request.query,
  });
  next();
};

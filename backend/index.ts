const express = require("express");
import { NextFunction, Request, Response } from "express";
import { toRoman } from "./toRoman";
const winston = require("winston");
const { combine, timestamp, printf, colorize, align } = winston.format;
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes

// Logs incoming requests to the console
const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf(
      (info: {
        timestamp: string;
        level: string;
        message: string;
        method: string;
        path: string;
        query: { query: string };
      }) =>
        `[${info.timestamp}] ${info.level}: ${info.message} (${info.method} ${info.path} query: ${info.query.query})`
    )
  ),
  defaultMeta: { service: "roman-numeral-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a separate file
    new winston.transports.File({ filename: "combined.log" }), // Log all messages to a combined file
    new winston.transports.Console(),
  ],
});

// Middleware to log requests
app.use((request: Request, response: Response, next: NextFunction) => {
  logger.info(`Incoming request`, {
    method: request.method,
    path: request.path,
    query: request.query,
  });
  next();
});

app.get("/romannumeral", (request: Request, response: Response) => {
  const query = request.query.query;

  // Check if the query parameter is provided
  if (typeof query !== "string") {
    response.status(400).send("Invalid number");
    return;
  }

  const number = parseInt(query);

  // Check if the number is an integer
  if (query.includes(".")) {
    response.status(400).send("Number must be an integer");
    return;
  }

  // Check if the parsed number is valid
  if (isNaN(number)) {
    response.status(400).send("Invalid number");
    return;
  }

  // Check if the number is within the valid range
  if (number < 1 || number > 3999) {
    response.status(400).send("Number must be between 1 and 3999");
    return;
  }

  return response.json({ input: query, output: toRoman(number) });
});

// Start the server if this file is run directly
if (require.main === module) {
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for testing
export default app;

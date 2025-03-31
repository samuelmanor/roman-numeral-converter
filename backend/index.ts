const express = require("express");
import { Request, Response } from "express";
import * as Sentry from "@sentry/node";
import { toRoman } from "./toRoman";
const cors = require("cors");
import { requestLogger } from "./utils/middleware";
import cache from "./utils/cache";

Sentry.init({
  dsn: "https://a56702b0f68ec8f23bfbb13cc23a78d6@o4509073295933440.ingest.us.sentry.io/4509073297702912",
  tracesSampleRate: 1.0, // Captures 100% of transactions for performance monitoring.
  profilesSampleRate: 1.0, // Captures 100% of profiles for performance monitoring.
  // Adjust the sample rate in production as needed
});

const app = express();
app.use(cors()); // Enable CORS for all routes

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

  // Check if the result is already in the cache
  if (cache.has(query)) {
    console.log(`Cache hit for query: ${query}`);
    // If the result is in the cache, return it
    return response.json({ input: query, output: cache.get(query) });
  }

  // Convert the number to Roman numeral
  const romanNumeral = toRoman(number);

  // Store the result in the cache
  cache.set(query, romanNumeral);
  console.log(`Cache miss for query: ${query}`);

  // Return the result as JSON
  return response.json({ input: query, output: toRoman(number) });
});

Sentry.setupExpressErrorHandler(app);

app.use(requestLogger); // Use the request logger middleware to log incoming requests to the console

// Start the server if this file is run directly
if (require.main === module) {
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for testing
export default app;

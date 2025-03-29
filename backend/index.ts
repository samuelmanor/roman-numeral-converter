const express = require("express");
import { Request, Response } from "express";
import { toRoman } from "./toRoman";
const app = express();

app.get("/romannumeral", (request: Request, response: Response) => {
  const query = request.query.query;

  if (typeof query !== "string") {
    response.status(400).send("Invalid query");
    return;
  }

  // Check if the query can be converted to a number
  const number = parseInt(query);
  if (query.includes(".") || isNaN(number)) {
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

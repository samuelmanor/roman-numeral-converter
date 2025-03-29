const express = require("express");
import { Request, Response } from "express";
const app = express();

app.get("/romannumeral", (request: Request, response: Response) => {
  const query = request.query.query;
  console.log(query);
  response.send("Roman numeral converter");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

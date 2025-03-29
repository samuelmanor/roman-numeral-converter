import request from "supertest";
import app from "./index";

describe("GET /romannumeral", () => {
  test("Returns correct Roman numeral for valid number", async () => {
    const response = await request(app).get("/romannumeral?query=123");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ input: "123", output: "CXXIII" });
  });

  test("Returns 400 for missing query parameter", async () => {
    const response = await request(app).get("/romannumeral");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid query");
  });

  test("Returns 400 for non-numeric query", async () => {
    const response = await request(app).get("/romannumeral?query=abc");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid number");
  });

  test("Returns 400 for decimal number", async () => {
    const response = await request(app).get("/romannumeral?query=12.5");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid number");
  });

  test("Returns 400 if number is less than 1", async () => {
    const response = await request(app).get("/romannumeral?query=0");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Number must be between 1 and 3999");
  });

  test("Returns 400 if number is greater than 3999", async () => {
    const response = await request(app).get("/romannumeral?query=4000");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Number must be between 1 and 3999");
  });

  test("Returns correct Roman numeral for boundary values", async () => {
    const response1 = await request(app).get("/romannumeral?query=1");
    expect(response1.status).toBe(200);
    expect(response1.body).toEqual({ input: "1", output: "I" });

    const response2 = await request(app).get("/romannumeral?query=3999");
    expect(response2.status).toBe(200);
    expect(response2.body).toEqual({ input: "3999", output: "MMMCMXCIX" });
  });
});

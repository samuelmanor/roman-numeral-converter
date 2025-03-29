import { toRoman } from "./toRoman";

describe("toRoman", () => {
  test("Successfully converts valid numbers to Roman numerals", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(49)).toBe("XLIX");
    expect(toRoman(561)).toBe("DLXI");
    expect(toRoman(1990)).toBe("MCMXC");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
  });

  test("Handles minimum and maximum value inputs", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
  });

  test("Throws error for numbers out of range", () => {
    expect(() => toRoman(0)).toThrow("Number must be between 1 and 3999");
    expect(() => toRoman(4000)).toThrow("Number must be between 1 and 3999");
    expect(() => toRoman(-5)).toThrow("Number must be between 1 and 3999");
  });

  test("Throws error for non-integer numbers", () => {
    expect(() => toRoman(3.5)).toThrow("Number must be an integer");
  });
});

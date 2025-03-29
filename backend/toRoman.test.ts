import { toRoman } from "./toRoman";

describe("toRoman", () => {
  test("Successfully converts valid numbers to Roman numerals", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(9)).toBe("IX");
    expect(toRoman(10)).toBe("X");
    expect(toRoman(40)).toBe("XL");
    expect(toRoman(50)).toBe("L");
    expect(toRoman(90)).toBe("XC");
    expect(toRoman(100)).toBe("C");
    expect(toRoman(400)).toBe("CD");
    expect(toRoman(500)).toBe("D");
    expect(toRoman(900)).toBe("CM");
    expect(toRoman(1000)).toBe("M");
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
    expect(() => toRoman(3.5)).toThrow("Number must be between 1 and 3999");
  });
});

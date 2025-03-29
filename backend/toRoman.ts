/**
 * Converts a number to its Roman numeral representation.
 * @param number The number to convert.
 * @returns The Roman numeral representation of the number.
 */
export const toRoman = (number: number): string => {
  // Check if the number is within the valid range
  if (number < 1 || number > 3999) {
    throw new Error("Number must be between 1 and 3999");
  }

  // Check if the number is an integer
  if (!Number.isInteger(number)) {
    throw new Error("Number must be an integer");
  }

  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";
  for (const { value, numeral } of romanNumerals) {
    while (number >= value) {
      result += numeral;
      number -= value;
    }
  }

  return result;
};

import { FC } from "react";
import { TextField } from "@adobe/react-spectrum";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Allows users to input a number. Validates the input to ensure it's a valid integer within the range of 1 to 3999.
 * @param value The current value of the input.
 * @param onChange Callback function to handle changes to the input.
 */
export const NumberInput: FC<NumberInputProps> = ({ value, onChange }) => {
  let error;

  // Validate the input
  if (value) {
    const number = parseInt(value.trim());

    if (isNaN(number)) {
      error = "Invalid number";
    } else if (value.includes(".")) {
      error = "Number must be an integer";
    } else if (number < 1 || number > 3999) {
      error = "Number must be between 1 and 3999";
    } else {
      error = undefined; // Clear error if valid
    }
  }

  return (
    <TextField
      label="Enter a number:"
      autoFocus
      value={value}
      onChange={onChange}
      validationState={error ? "invalid" : undefined}
      errorMessage={error}
    />
  );
};

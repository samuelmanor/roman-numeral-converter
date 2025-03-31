import React, { FC } from "react";
import {
  Button,
  Flex,
  Form,
  Text,
  ToastQueue,
  View,
} from "@adobe/react-spectrum";
import { NumberInput } from "./NumberInput";

/**
 * A form that allows users to input a number and convert it to a Roman numeral.
 */
export const NumeralConverter: FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [romanNumeral, setRomanNumeral] = React.useState<string>("");

  /**
   * Handles the form submission; sends user input to the backend to convert it to a Roman numeral.
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior (i.e., page reload)
    e.preventDefault();

    // Prevent submission if the input is empty
    if (input.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/romannumeral?query=${input}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setRomanNumeral(data.output);
    } catch (error) {
      // Handle errors that may occur during the fetch request
      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          ToastQueue.negative("Network error", { timeout: 5000 });
        } else {
          ToastQueue.negative(error.message, { timeout: 5000 });
        }
      }
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <View
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        padding="size-400"
        data-test-id="converter-form"
      >
        <h3 id="converter-title">Roman numeral converter</h3>
        <Form
          aria-labelledby="converter-title"
          onSubmit={onSubmit}
          validationBehavior="native" // Prevents submission if the input is invalid
        >
          <NumberInput value={input} onChange={setInput} />
          <Button
            variant="primary"
            type="submit"
            style="fill"
            isDisabled={!input}
          >
            Convert
          </Button>
          <Text>Roman numeral: {romanNumeral}</Text>
        </Form>
      </View>
    </Flex>
  );
};

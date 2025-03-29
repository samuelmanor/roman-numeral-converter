import React, { FC } from "react";
import {
  Button,
  Flex,
  Form,
  Header,
  Heading,
  Text,
  View,
} from "@adobe/react-spectrum";
import { NumberInput } from "./NumberInput";

/**
 * A form that allows users to input a number and convert it to a Roman numeral.
 */
export const Converter: FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [romanNumeral, setRomanNumeral] = React.useState<string>("");

  /**
   * Handles the form submission; sends user input to the backend to convert it to a Roman numeral.
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior (i.e., page reload)
    e.preventDefault();

    // console.log("Form submitted");
    // console.log(input);

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
      console.error("Error fetching Roman numeral:", error);
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <View
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        padding="size-400"
      >
        <Header>
          <Heading id="app-title">Roman numeral converter</Heading>
        </Header>
        <Form
          aria-labelledby="app-title"
          onSubmit={onSubmit}
          validationBehavior="native" // Prevents submission if the input is invalid
        >
          <NumberInput value={input} onChange={setInput} />
          <Button variant="primary" type="submit" style="fill">
            Convert
          </Button>
          <Text>Roman numeral: {romanNumeral}</Text>
        </Form>
      </View>
    </Flex>
  );
};

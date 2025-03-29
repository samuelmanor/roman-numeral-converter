import React, { FC } from "react";
import {
  Button,
  Flex,
  Form,
  Header,
  Heading,
  Text,
  TextField,
  View,
} from "@adobe/react-spectrum";

/**
 * A form that allows users to input a number and convert it to a Roman numeral.
 */
export const Converter: FC = () => {
  const [input, setInput] = React.useState<string>("");
  let error;

  // // Validate the input
  // if (input) {
  //   const number = parseInt(input.trim());

  //   if (isNaN(number)) {
  //     error = "Invalid number";
  //   } else if (input.includes(".")) {
  //     error = "Number must be an integer";
  //   } else if (number < 1 || number > 3999) {
  //     error = "Number must be between 1 and 3999";
  //   } else {
  //     error = undefined; // Clear error if valid
  //   }
  // }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior (i.e., page reload)
    e.preventDefault();

    console.log("Form submitted");
    console.log(input);

    await fetch(`http://localhost:8080/romannumeral?query=${input}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching Roman numeral:", error);
      });
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
          <TextField
            label="Enter a number:"
            autoFocus
            value={input}
            onChange={setInput}
            // validationState={!!error ? "invalid" : undefined}
            // errorMessage={error}
          />
          <Button variant="primary" type="submit" style="fill">
            Convert
          </Button>
          <Text>Roman numeral:</Text>
        </Form>
      </View>
    </Flex>
  );
};

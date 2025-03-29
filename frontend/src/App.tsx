import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  Content,
  Flex,
  Form,
  Header,
  Heading,
  Text,
  TextField,
  View,
} from "@adobe/react-spectrum";

function App() {
  return (
    <Flex alignItems="center" justifyContent="center">
      <View
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        padding="size-200"
        margin="size-200"
      >
        <Header>
          <Heading id="app-title">Roman numeral converter</Heading>
        </Header>
        <Form
          aria-labelledby="app-title"
          // validationErrors={{
          //   numberInput: "Number must be between 1 and 3999.",
          // }}
        >
          <TextField
            label="Enter a number:"
            name="numberInput"
            // description="Number must be between 1 and 3999."
          />
          <Button variant="primary" onPress={() => console.log("pressed")}>
            Convert
          </Button>
        </Form>
        <Text>Roman numeral:</Text>
      </View>
    </Flex>
  );
}

export default App;

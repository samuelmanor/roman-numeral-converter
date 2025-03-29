import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Flex } from "@adobe/react-spectrum";
import { Converter } from "./Converter";

function App() {
  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Converter />
    </Flex>
  );
}

export default App;

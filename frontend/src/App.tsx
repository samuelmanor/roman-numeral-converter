import { Flex, ToastContainer } from "@adobe/react-spectrum";
import { NumeralConverter } from "./NumeralConverter";

function App() {
  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <NumeralConverter />
      <ToastContainer />
    </Flex>
  );
}

export default App;

/*

- renders the component
- accepts valid input
- displays error for non-numeric input
- displays error for decimal numbers
- displays error for numbers less than 1
- displays error for numbers greater than 3999
- calls onChange when input value changes
- test for negative numbers
- test for empty input
- test for leading/trailing spaces

*/

import { render } from "../../customRender";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./NumberInput";

let tree = render(<NumberInput value="" onChange={() => {}} />);
let inputElement = tree.getByLabelText(/Enter a number:/i) as HTMLInputElement;

describe("NumberInput Component", () => {
  it("Renders the component", () => {
    expect(screen.getByLabelText(/Enter a number:/i)).toBeInTheDocument();
  });
});

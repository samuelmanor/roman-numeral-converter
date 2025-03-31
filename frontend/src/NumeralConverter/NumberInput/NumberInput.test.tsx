import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../customRender";
import { NumberInput } from "./NumberInput";
import "@testing-library/jest-dom";

const handleChange = jest.fn();

describe("NumberInput component", () => {
  it("Renders without errors", () => {
    render(<NumberInput value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/enter a number:/i)).toBeInTheDocument();
  });
  it("Accepts valid input", () => {
    render(<NumberInput value="10" onChange={handleChange} />);

    expect(screen.getByLabelText(/enter a number:/i)).toHaveValue("10");
    expect(screen.queryByText("Invalid number")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Number must be an integer")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Number must be between 1 and 3999")
    ).not.toBeInTheDocument();
  });
  it("Displays error for non-numeric input", () => {
    render(<NumberInput value="abc" onChange={handleChange} />);

    expect(screen.getByText("Invalid number")).toBeInTheDocument();
  });
  it("Displays error for decimal numbers", () => {
    render(<NumberInput value="10.5" onChange={handleChange} />);

    expect(screen.getByText("Number must be an integer")).toBeInTheDocument();
  });
  it("Displays error for numbers less than 1", () => {
    render(<NumberInput value="0" onChange={handleChange} />);

    expect(
      screen.getByText("Number must be between 1 and 3999")
    ).toBeInTheDocument();
  });
  it("Displays error for numbers greater than 3999", () => {
    render(<NumberInput value="4000" onChange={handleChange} />);

    expect(
      screen.getByText("Number must be between 1 and 3999")
    ).toBeInTheDocument();
  });
  it("Calls onChange when input value changes", () => {
    render(<NumberInput value="" onChange={handleChange} />);

    const input = screen.getByLabelText(/enter a number:/i);
    fireEvent.change(input, { target: { value: "123" } });

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith("123");
  });
});

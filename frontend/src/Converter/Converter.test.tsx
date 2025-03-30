import { render } from "../customRender";
import { Converter } from "./Converter";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Converter component", () => {
  it("Renders without errors", () => {
    render(<Converter />);

    const titleElement = screen.getByText("Roman numeral converter");
    expect(titleElement).toBeInTheDocument();

    const inputElement = screen.getByLabelText("Enter a number:");
    expect(inputElement).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Convert" });
    expect(submitButton).toBeInTheDocument();
  });
  it("Displays Roman numeral from successful conversion", async () => {
    render(<Converter />);

    const user = userEvent.setup();

    // Mock the fetch API to simulate a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            output: "XII", // Example Roman numeral for the input 12
          }),
      })
    ) as jest.Mock;

    const inputElement = screen.getByLabelText("Enter a number:");
    await user.click(inputElement);
    await user.type(inputElement, "12");

    expect(inputElement).toHaveValue("12");

    user.click(screen.getByRole("button", { name: "Convert" }));

    const resultElement = await screen.findByText("Roman numeral: XII");
    expect(resultElement).toBeInTheDocument();
  });
  it("Handles fetch error correctly", async () => {
    render(<Converter />);

    const user = userEvent.setup();

    // Mock the fetch API to simulate an unsuccessful response
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as jest.Mock;

    const inputElement = screen.getByLabelText("Enter a number:");
    await user.click(inputElement);
    await user.type(inputElement, "12");

    expect(inputElement).toHaveValue("12");

    user.click(screen.getByRole("button", { name: "Convert" }));

    // Since the fetch call fails, we should not have a result element
    const resultElement = screen.queryByText("Roman numeral: XII");
    expect(resultElement).not.toBeInTheDocument();
  });
  it("Does not submit the form when input is invalid", async () => {
    render(<Converter />);

    const user = userEvent.setup();

    // Mock the fetch API to ensure it doesn't get called
    global.fetch = jest.fn() as jest.Mock;

    const inputElement = screen.getByLabelText("Enter a number:");
    await user.click(inputElement);
    await user.type(inputElement, "abc"); // Invalid input

    expect(inputElement).toHaveValue("abc");

    user.click(screen.getByRole("button", { name: "Convert" }));

    // Fetch should not have been called
    expect(global.fetch).not.toHaveBeenCalled();
  });
  it("Enables submit button only after input", async () => {
    render(<Converter />);

    const user = userEvent.setup();

    // Mock the fetch API to ensure it doesn't get called
    global.fetch = jest.fn() as jest.Mock;

    const inputElement = screen.getByLabelText("Enter a number:");

    // Initially, the button should be disabled
    expect(screen.getByRole("button", { name: "Convert" })).toBeDisabled();

    // Enter input
    await user.click(inputElement);
    await user.type(inputElement, "12");

    // The button should now be enabled
    expect(screen.getByRole("button", { name: "Convert" })).toBeEnabled();
  });
});

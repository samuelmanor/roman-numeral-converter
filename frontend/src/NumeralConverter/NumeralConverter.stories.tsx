import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

import { NumeralConverter } from "./NumeralConverter";

const meta: Meta = {
  title: "NumeralConverter",
  component: NumeralConverter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider theme={defaultTheme}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // get the input field and the output text
    const input = canvas.getByLabelText("Enter a number:", {
      selector: "input",
    }) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    const output = canvas.getByText("Roman numeral:");
    expect(output).toBeInTheDocument();

    const submitButton = canvas.getByRole("button", {
      name: "Convert", // Ensure we are selecting the button element
    }) as HTMLButtonElement;
    expect(submitButton).toBeInTheDocument();

    await step("User types a valid number", async () => {
      await userEvent.type(input, "10", {
        delay: 100, // Simulate typing with a delay to mimic real user input
      });

      // Check if the input value is correct
      expect(input).toHaveValue("10");
      expect(canvas.queryByText("Invalid number")).not.toBeInTheDocument(); // Ensure no error message is displayed for valid input
      expect(canvas.queryByText("Roman numeral: X")).not.toBeInTheDocument(); // Ensure the output is not displayed yet
      expect(submitButton).toBeEnabled(); // Ensure the submit button is enabled for valid inputs
    });

    await step("User submits the form", async () => {
      // Click the submit button
      await userEvent.click(submitButton);

      // If the backend is running, request will be successful and the output will be displayed
      await waitFor(() => {
        expect(output).toHaveTextContent("Roman numeral: X"); // Ensure the output is correct
      });
    });
  },
};

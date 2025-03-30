import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import { defaultTheme, Provider, View } from "@adobe/react-spectrum";

import { NumberInput } from "./NumberInput";

const meta: Meta = {
  title: "Converter/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  args: {
    value: "",
    onChange: fn(), // Using Storybook's fn() to create a mock function for onChange
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider theme={defaultTheme}>
        <View padding="size-400">
          <Story />
        </View>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Enter a number:", {
      selector: "input", // Ensure we are selecting the input element
    }) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "123", {
      delay: 100, // Simulate typing with a delay to mimic real user input
    });

    await waitFor(() => expect(args.onChange).toBeCalledTimes(3)); // Check if the onChange function is called each time the input changes.
  },
};

import {
  render,
  RenderOptions as BaseRenderOptions,
} from "@testing-library/react";
import { defaultTheme, Provider, ProviderProps } from "@adobe/react-spectrum";
import React, { ReactElement } from "react";

// export everything from React Testing Library
export * from "@testing-library/react";

function ProviderWrapper(props: React.ComponentProps<typeof Provider>) {
  let { children, ...providerProps } = props;
  return (
    <Provider theme={defaultTheme} scale="medium" {...providerProps}>
      {props.children}
    </Provider>
  );
}

interface RenderOptions extends BaseRenderOptions {
  providerProps: Omit<ProviderProps, "children">;
}

/**
 * Custom render function that wraps components with the Adobe React Spectrum Provider.
 * This provides the correct theme and context to components during testing.
 */
function customRender(ui: ReactElement, options?: RenderOptions) {
  let rendered = render(ui, {
    wrapper: (props) => (
      <ProviderWrapper {...props} {...options?.providerProps} />
    ),
    ...options,
  });
  return {
    ...rendered,
    rerender: (ui: ReactElement, options?: RenderOptions) =>
      render(ui, { container: rendered.container, ...options }),
  };
}

// override render method
export { customRender as render };

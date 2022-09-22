import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    {children}
  </MantineProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };

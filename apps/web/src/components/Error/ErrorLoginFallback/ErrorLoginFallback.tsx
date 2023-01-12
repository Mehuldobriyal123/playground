import * as React from 'react';
import { Button } from '@mantine/core';
import type { FallbackProps } from 'react-error-boundary';

const ErrorLoginFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <Button variant="light" size="md" onClick={resetErrorBoundary}>
    Try again
  </Button>
);

export default ErrorLoginFallback;

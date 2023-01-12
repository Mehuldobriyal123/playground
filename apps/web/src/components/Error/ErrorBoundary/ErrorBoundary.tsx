import * as React from 'react';
import type { ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface Props {
  fallback: React.ComponentType<FallbackProps>;
  children: ReactNode;
  onReset: () => void;
}

const ErrorBoundary = ({ fallback, children, onReset }: Props) => {
  return (
    <ReactErrorBoundary FallbackComponent={fallback} onReset={onReset}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;

import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useEffect, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorText = styled(Typography)({
  // Add any necessary styles here
  // Example:
  color: "yellowgreen",
});

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const errorHandler = (errorEvent: ErrorEvent) => {
      setHasError(true);
      console.error("Error caught by error boundary:", errorEvent.error);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  return hasError ? (
    <ErrorText>Something went wrong</ErrorText>
  ) : (
    <>{children}</>
  );
};

export default ErrorBoundary;

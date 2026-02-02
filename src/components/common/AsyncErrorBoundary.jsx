import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoadingSpinner from "./LoadingSpinner";

export default function AsyncErrorBoundary({ children, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || <LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
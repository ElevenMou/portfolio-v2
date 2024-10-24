"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="main-content page">
      <div>
        <h1>Something went wrong!</h1>
        <p>An unexpected error has occurred.</p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="btn btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

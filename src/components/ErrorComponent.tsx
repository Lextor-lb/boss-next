import React from "react";

const ErrorComponent = ({ refetch }: { refetch: () => void }) => {
  return (
    <div>
      <p>Something bad bad happened</p>
    </div>
  );
};

export default ErrorComponent;

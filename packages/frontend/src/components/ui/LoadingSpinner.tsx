import React from "react";

type Props = {
  size: number;
};

function LoadingSpinner(props: Props) {
  const { size } = props;
  const styling = `animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-blue-600`;

  return (
    <div className="loading flex justify-center items-center">
      <div className={styling}></div>
    </div>
  );
}

export default LoadingSpinner;

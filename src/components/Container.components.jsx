import React from "react";

const Container = ({ children, className }) => {
  return <div className={`mx-auto h-full w-[95%] ${className}`}>{children}</div>;
};

export default Container;

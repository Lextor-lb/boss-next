import React from "react";

const Heading = ({ header, desc }: { header: string; desc: string }) => {
  return (
    <div className="  capitalize space-y-1.5">
      <p className=" test:base lg:text-lg font-extrabold uppercase">{header}</p>
      <p className=" text-primary/80 font-normal text-xs lg:text-sm">{desc}</p>
    </div>
  );
};

export default Heading;

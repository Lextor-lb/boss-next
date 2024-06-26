import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { PlusCircle } from "lucide-react";

const SizingControlBar = () => {
  return (
    <div className=" flex justify-between">
      <div>
        <Input placeholder="Search..." />
      </div>
      <Button className=" font-normal">
        <PlusCircle />
        <span className="ms-1">Add Size</span>
      </Button>
    </div>
  );
};

export default SizingControlBar;

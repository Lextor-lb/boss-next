import React from "react";
import { Checkbox } from "../ui/checkbox";

const FilterItem = ({
  value,
  name,
  run,
  isChecked,
}: {
  value: string | number;
  name: string;
  run: (value: any) => void;
  isChecked: boolean;
}) => {
  const handleChange = () => {
    run(value);
  };

  return (
    <div className="bg-secondary flex gap-2 rounded items-center p-2">
      <Checkbox checked={isChecked} onCheckedChange={handleChange} />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default FilterItem;

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type Input = {
  label: string;
  id: any;
  type: string;
  className?: string;
};
const FormInput = ({ label, id, className, type, ...rest }: Input) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} {...rest} className="h-9" />
    </div>
  );
};

export default FormInput;

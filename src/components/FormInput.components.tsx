import React, { forwardRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type InputProps = {
  label?: string;
  id: any;
  type: string;
  className?: string;
};

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, type, ...rest }, ref) => {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <Label htmlFor={id}>{label}</Label>
        <Input type={type} id={id} ref={ref} {...rest} className="h-9" />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;

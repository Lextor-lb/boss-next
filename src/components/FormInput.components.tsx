import React, { forwardRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type InputProps = {
  label?: string;
  id: any;
  type: string;
  className?: string;
  min?: any;
  max?: any;
  value?: any;
  name?: string;
};

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, type, min, value, max, ...rest }, ref) => {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <Label htmlFor={id}>{label}</Label>
        <Input
          min={min}
          max={max}
          type={type}
          id={id}
          value={value}
          ref={ref}
          {...rest}
          className="h-9"
        />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;

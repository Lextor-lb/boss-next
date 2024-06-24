import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const FormInput = ({ label, id, className, errorMsg, ...rest }) => {
	return (
		<div className={`space-y-1.5 ${className}`}>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} {...rest} className="h-9" />
			{errorMsg && <p className=" text-sm text-red-500">{errorMsg}</p>}
		</div>
	);
};

export default FormInput;

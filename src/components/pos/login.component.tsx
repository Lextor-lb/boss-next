"use client";

import { Button } from "@/components/ui/button";
import FormInput from "../FormInput.components";
import { useState } from "react";
import { login } from "@/lib/lib";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter(); // Use the useRouter hook

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const result = await login(email, password);
		router.push("/pos/app");
	};

	return (
		<div className=" grid grid-cols-12 h-screen items-center">
			<div className=" col-span-6 h-full border-e flex justify-center  items-center">
				{/* <LoginPageAnimation /> */}
			</div>
			<div className=" col-span-6  h-full">
				<div className=" flex justify-center h-full flex-col items-center">
					<div className=" col-span-full w-[80%] mx-auto">
						<div className=" text-start mb-3">
							<p className=" text-3xl mb-1.5 tracking-wider font-semibold">
								Boss Nation
							</p>
							<p className=" text-base tracking-wider font-medium">
								Welcome Back!
								<span className=" font-normal opacity-75">
									Please enter details
								</span>
							</p>
						</div>
						<div className="space-y-6">
							<FormInput
								label={"Email"}
								id={"email"}
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div className=" space-y-3">
								<FormInput
									label={"Password"}
									type="password"
									id={"password"}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="flex justify-end">
									<p className="text-xs select-none cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										Forget Password ?
									</p>
								</div>
							</div>
						</div>
						<Button
							onClick={handleSubmit}
							type="submit"
							className="block mt-11 w-full"
						>
							Login to account
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

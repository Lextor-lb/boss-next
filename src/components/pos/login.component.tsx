"use client";

import { Button } from "@/components/ui/button";
import FormInput from "../FormInput.components";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log(email, password);
		const result = await signIn("credentials", {
			email,
			password,
			redirect: true,
		});
		if (result?.error) {
			console.log(result.error);
			// Handle login errors here
		} else {
			// Handle successful login here, e.g., redirect to dashboard
		}
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

// async function postRequest(
// 		url: string,
// 		{ arg }: { arg: { email: string; password: string } }
// 	) {
// 		return fetch(url, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(arg),
// 		}).then((res) => res.json());
// 	}

// 	const {
// 		data,
// 		error,
// 		trigger: login,
// 		isMutating,
// 	} = useSWRMutation("https://amt.santar.store/auth/login", postRequest);

// 	console.log(data, error);

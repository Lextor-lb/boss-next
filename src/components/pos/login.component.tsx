// import { Button } from "@/components/ui/button";
// import { Form, Formik } from "formik";
// import * as yup from "yup";
// import Container from "../Container.components";
// import FormInput from "../FormInput.components";

// export default function Login() {
// 	const data = null;
// 	const isLoading = false;
// 	const initialValues = {
// 		email: "",
// 		password: "",
// 	};
// 	const validationSchema = yup.object({
// 		email: yup
// 			.string()
// 			.email("Invalid email format")
// 			.required("Email is required!"),
// 		password: yup
// 			.string()
// 			.min(8, "Password must be at least 8 characters")
// 			.required("Password is required!"),
// 	});

// 	return (
// 		<div className=" grid grid-cols-12 h-screen items-center">
// 			<div className=" col-span-6 h-full border-e flex justify-center  items-center">
// 				{/* <LoginPageAnimation /> */}
// 			</div>
// 			<div className=" col-span-6  h-full">
// 				{/* {isLoading ? ( */}
// 				// 	<div className=" flex justify-center h-full items-center">
// 				// 		{/* <LoadingSpinner /> */}
// 				// 	</div>
// 				// ) : (
// 					<div className=" flex flex-col justify-center h-full">
// 						<Formik
// 							onSubmit={}
// 							validationSchema={validationSchema}
// 							initialValues={initialValues}
// 							validateOnChange={false}
// 							validateOnBlur={false}
// 						>
// 							{({ handleChange, values, errors }) => (
// 								<Form>
// 									<Container className={"!w-[60%]"}>
// 										<div className=" text-start mb-3">
// 											<p className=" text-3xl mb-1.5 tracking-wider font-semibold">
// 												Boss Nation
// 											</p>
// 											<p className=" text-base tracking-wider font-medium">
// 												Welcome Back!
// 												<span className=" font-normal opacity-75">
// 													Please enter details
// 												</span>
// 											</p>
// 										</div>
// 										{!data?.status && (
// 											<p className=" my-3 text-red-500">{data?.message}</p>
// 										)}
// 										<div className="space-y-6">
// 											<FormInput
// 												label={"Email"}
// 												id={"email"}
// 												type="email"
// 												name={"email"}
// 												value={values.email}
// 												errorMsg={errors.email}
// 												onChange={handleChange}
// 											/>
// 											<div className=" space-y-3">
// 												<FormInput
// 													label={"Password"}
// 													type="password"
// 													name="password"
// 													value={values.password}
// 													onChange={handleChange}
// 													errorMsg={errors.password}
// 													id={"password"}
// 												/>
// 												<div className="flex justify-end">
// 													<p className="text-xs select-none cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
// 														Forget Password ?
// 													</p>
// 												</div>
// 											</div>
// 										</div>
// 										<Button type="submit" className="block mt-11 w-full">
// 											Login to account
// 										</Button>
// 									</Container>
// 								</Form>
// 							)}
// 						</Formik>
// 					</div>
// 				// )}
// 			</div>
// 		</div>
// 	);
// }

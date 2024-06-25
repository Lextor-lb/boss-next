"use client";

import { Button } from "@/components/ui/button";
import FormInput from "../FormInput.components";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiURL, fetchApi } from "@/lib/api";

export default function Login() {
  const router = useRouter();

  async function postRequest(
    url: string,
    { arg }: { arg: { email: string; password: string } }
  ) {
    return fetchApi(url, "POST", {}, arg);
  }

  const {
    data,
    error,
    trigger: login,
    isMutating,
  } = useSWRMutation(`${apiURL}/auth/login`, postRequest);

  console.log(data, error);

  useEffect(() => {
    if (data?.status) {
      localStorage.setItem("token", data.accessToken);
      router.push("/pos/app/products");
      // document.cookie = `token=${data.accessToken}; path=/`;
    }
  }, [data]);

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
              <FormInput label={"Email"} id={"email"} type="email" />
              <div className=" space-y-3">
                <FormInput label={"Password"} type="password" id={"password"} />
                <div className="flex justify-end">
                  <p className="text-xs select-none cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Forget Password ?
                  </p>
                </div>
              </div>
            </div>
            <Button
              disabled={isMutating}
              onClick={async () => {
                try {
                  const result = await login({
                    email: "sabin@adams.com",
                    password: "password-sabin",
                  });
                  console.log(result);
                } catch (e) {
                  // error handling
                }
              }}
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

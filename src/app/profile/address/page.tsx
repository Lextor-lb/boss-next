"use client";

import { useAppProvider } from "@/app/Provider/AppProvider";
import FormInput from "@/components/FormInput.components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Backend_URL } from "@/lib/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SweetAlert2 from "react-sweetalert2";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const UserAddressPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  const { handleLogin } = useAppProvider();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getData = async (url: string) => {
    try {
      const token = isClient && localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      return data;
    } catch (error: any) {
      console.error("Fetch API Error:", error.message);
      throw new Error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, error } = useSWR(
    userId !== null ? `${Backend_URL}/ecommerce-users/${userId}` : null,
    getData
  );

  useEffect(() => {
    if (isClient) setUserId(localStorage.getItem("userId"));
  }, [isClient]);

  const patchUser = async (url: string, { arg }: any) => {
    try {
      const token = isClient && localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const options: RequestInit = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(arg),
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      return response;
    } catch (error: any) {
      console.error("Fetch API Error:", error.message);
      throw new Error(error.message || "An error occurred");
    }
  };

  const {
    data: editUserData,
    error: editUserError,
    trigger: editUser,
  } = useSWRMutation(
    userId !== null ? `${Backend_URL}/ecommerce-users/${userId}` : null,
    patchUser
  );

  const schema = z.object({
    city: z.string().min(1, { message: "This field cannot be empty!" }),
    township: z.string().min(1, { message: "This field cannot be empty!" }),
    street: z.string().min(1, { message: "This field cannot be empty!" }),
    company: z.string().optional(),
    addressDetail: z
      .string()
      .min(1, { message: "This field cannot be empty!" }),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: "",
      township: "",
      street: "",
      company: "",
      addressDetail: "",
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     reset({
  //       city: "",
  //       township: "",
  //       street: "",
  //       company: "",
  //       addressDetail: "",
  //     });
  //   }
  // }, [data]);

  const [swalProps2, setSwalProps2] = useState({
    show: false,
    showConfirmButton: false,
  });

  const [swalProps, setSwalProps] = useState({
    show: false,
    showConfirmButton: false,
  });

  useEffect(() => {
    if (isClient) {
      if (!localStorage.getItem("accessToken")) {
        setSwalProps({
          show: true,
          showConfirmButton: false,
        });
      }
    }
  }, [isClient]);

  const onSubmit = async (values: any) => {
    const res = await editUser(values);
    if (res?.ok) {
      setSwalProps({
        ...swalProps,
        show: true,
      });
    }
  };

  return (
    <div>
      <div className=" space-y-4 w-[90%]">
        <div className=" bg-secondary border border-input px-3 font-medium lg:text-lg py-2">
          Delivery Address
        </div>
        {(!error || !isLoading) && (
          <RadioGroup className="  py-3 px-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="address1" id="address1" />
              <Label className=" font-normal w-full ps-2" htmlFor="address1">
                <span className=" flex w-full justify-between">
                  <span className=" space-y-2">
                    <span className=" block">
                      {data?.addressDetail}, {data?.street}, {data?.township},
                      {data?.city}
                    </span>
                    <span>
                      <span className=" font-medium">Contact</span> -{" "}
                      {data?.phone}
                    </span>
                  </span>
                  <span>
                    <Button variant={"link"}>Edit</Button>
                    <Button
                      className=" hover:text-red-500 text-red-500"
                      variant={"link"}
                    >
                      Remove
                    </Button>
                  </span>
                </span>
              </Label>
            </div>
          </RadioGroup>
        )}
        <hr className=" w-[90%] mx-auto" />

        {!open && (
          <Button variant={"ghost"} onClick={() => setOpen(true)}>
            <Plus /> <span className=" ms-3">Add new address</span>
          </Button>
        )}
      </div>

      {open && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" w-[90%] space-y-4">
            <div className=" flex bg-secondary items-center justify-between border border-input px-3 font-medium lg:text-lg py-2">
              <p> Add New Delivery address</p>
              <Button
                onClick={() => setOpen(false)}
                type="button"
                variant={"ghost"}
              >
                Cancel
              </Button>
            </div>
            <div className=" px-4 lg:grid-cols-2 gap-3 lg:gap-7 grid grid-cols-1">
              <div className=" space-y-1.5">
                <FormInput
                  label="City"
                  type="text"
                  {...register("city")}
                  id={"City"}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city?.message}</p>
                )}
              </div>

              <div className=" space-y-1.5">
                <FormInput
                  label="Township"
                  {...register("township")}
                  type="text"
                  id={"Township"}
                />
                {errors.township && (
                  <p className="text-red-500 text-xs">
                    {errors.township?.message}
                  </p>
                )}
              </div>
              <div className=" space-y-1.5">
                <FormInput
                  {...register("street")}
                  label="Street"
                  type="text"
                  id={"Street"}
                />
                {errors.street && (
                  <p className="text-red-500 text-xs">
                    {errors.street?.message}
                  </p>
                )}
              </div>
              <div className=" space-y-1.5">
                <FormInput
                  label="Company(optional)"
                  type="text"
                  {...register("company")}
                  id={"Company(optional)"}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs">
                    {errors.company?.message}
                  </p>
                )}
              </div>
              <div className=" flex flex-col gap-1.5">
                <Label htmlFor="address">Address Detail</Label>
                <Textarea id="address" {...register("addressDetail")} />
                {errors.addressDetail && (
                  <p className="text-red-500 text-xs">
                    {errors.addressDetail?.message}
                  </p>
                )}
              </div>
              <div className=" flex justify-end col-span-full">
                <Button>Add New</Button>
              </div>
            </div>
          </div>
        </form>
      )}

      {isClient && (
        <SweetAlert2
          didClose={() => {
            router.push("/");
          }}
          {...swalProps}
        >
          <div className=" pointer-events-none space-y-3 text-center">
            <p className=" pointer-events-none font-medium">
              Proceed To Checkout
            </p>
            <p className=" pointer-events-none text-black/50 text-sm">
              Please Login To Continue.
            </p>
            <div className="  pointer-events-none flex gap-3 justify-center items-center">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setSwalProps({
                    ...swalProps,
                    show: false,
                  });
                  router.push("/");
                }}
                size={"sm"}
                className="  pointer-events-auto"
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  handleLogin();
                  e.stopPropagation();
                  setSwalProps({
                    ...swalProps,
                    show: false,
                  });
                }}
                size={"sm"}
                className="  pointer-events-auto"
              >
                Sign In
              </Button>
            </div>
          </div>
        </SweetAlert2>
      )}

      {isClient && (
        <SweetAlert2
          timer={1500}
          position="bottom-end"
          icon="success"
          iconColor="black"
          customClass={{
            popup: "colored-toast",
          }}
          toast={true}
          {...swalProps2}
          didClose={() =>
            setSwalProps2({
              ...swalProps2,
              show: false,
            })
          }
        >
          <p>Your address is updated!</p>
        </SweetAlert2>
      )}
    </div>
  );
};

export default UserAddressPage;

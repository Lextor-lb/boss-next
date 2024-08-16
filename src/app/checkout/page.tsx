"use client";
import { Container } from "@/components/ecom";
import React, { useEffect, useState } from "react";
import { useAppProvider } from "../Provider/AppProvider";
import OrderSummary from "@/components/ecom/OrderSummary";
import FormInput from "@/components/FormInput.components";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import { Backend_URL } from "@/lib/fetch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import SweetAlert2 from "react-sweetalert2";
import { useRouter } from "next/navigation";

type OrderRecord = {
  productVariantId: number;
  salePrice: number;
};

type OrderData = {
  orderCode: any;
  subTotal: number;
  total: number;
  orderRecords: OrderRecord[];
  couponDiscount?: number;
};

const Checkout = () => {
  const { totalCost, cartItems, couponDiscount, setCartItems } =
    useAppProvider();

  const [isClient, setIsClient] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setUserId(localStorage.getItem("userId"));
      if (!localStorage.getItem("accessToken")) {
        router.push("/shopping-bag");
      }
    }
  }, [isClient]);

  const router = useRouter();

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

  const postOrder = async (url: string, { arg }: { arg: OrderData }) => {
    try {
      const token = isClient && localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const options: RequestInit = {
        method: "POST",
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
      return data;
    } catch (error: any) {
      console.error("Fetch API Error:", error.message);
      throw new Error(error.message || "An error occurred");
    }
  };

  const {
    data: orderData,
    error: orderError,
    trigger: order,
  } = useSWRMutation(`${Backend_URL}/orders`, postOrder);

  const { data } = useSWR(
    userId !== null ? `${Backend_URL}/ecommerce-users/${userId}` : null,
    getData
  );

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
    name: z.string().min(3, { message: "This field cannot be empty!" }),
    phone: z.string().min(1, { message: "This field cannot be empty!" }),
    city: z.string().min(1, { message: "This field cannot be empty!" }),
    township: z.string().min(1, { message: "This field cannot be empty!" }),
    street: z.string().min(1, { message: "This field cannot be empty!" }),
    company: z.string().optional(),
    addressDetail: z
      .string()
      .min(1, { message: "This field cannot be empty!" }),
    email: z.string().email({ message: "Invalid email format!" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      township: "",
      street: "",
      company: "",
      addressDetail: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        phone: data.phone || "",
        city: data.city || "",
        township: data.township || "",
        street: data.street || "",
        company: data.company || "",
        addressDetail: data.addressDetail || "",
        email: data.email || "",
      });
    }
  }, [data]);

  const generateLongNumber = (length: number) => {
    let number = "";
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return parseInt(number);
  };

  const onSubmit = async (value: any) => {
    const res = await editUser(value);
    if (res?.ok) {
      const dataToOrder: OrderData = {
        orderCode: `${generateLongNumber(7)}`,
        subTotal: totalCost,
        total: totalCost,
        orderRecords: cartItems.map((el: any) => {
          return {
            productVariantId: el.selectedProduct.id,
            salePrice: el.priceAfterDiscount,
          };
        }),
      };

      if (couponDiscount > 0) {
        dataToOrder.couponDiscount = couponDiscount;
      }
      const orderRes = await order(dataToOrder);
      console.log(orderRes);
      if (orderRes.status) {
        setCartItems([]);
        router.push(`/order/${orderRes.data.id}`);
      }
    }
  };

  return (
    <Container className=" space-y-3 pt-4">
      <p className=" text-sm lg:text-sm pb-3 font-normal">
        Shopping Bag | Checkout
      </p>
      <div className=" grid grid-cols-12 gap-4">
        <div className=" col-span-full space-y-3 lg:col-span-9">
          <p className=" text-xl lg:text-3xl pb-3 capitalize font-semibold">
            delivery Information
          </p>
          <div className=" space-y-4">
            <div className=" bg-secondary border border-input px-3 font-medium lg:text-lg py-2">
              Delivery address
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
            </div>
          </div>
          <div className=" pt-4 space-y-4">
            <div className=" bg-secondary border border-input px-3 font-medium lg:text-lg py-2">
              Personal Information
            </div>
            <div className=" px-4 lg:grid-cols-2 gap-3 lg:gap-7 grid grid-cols-1">
              <div className=" space-y-1.5">
                <FormInput
                  label="Name"
                  {...register("name")}
                  type="text"
                  id={"name"}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name?.message}</p>
                )}
              </div>
              <div className=" space-y-1.5">
                <FormInput
                  label="Phone"
                  {...register("phone")}
                  type="text"
                  id={"phone"}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
              <div className=" space-y-1.5">
                <FormInput
                  label="Email"
                  {...register("email")}
                  type="email"
                  id={"email"}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" pt-4 space-y-4">
            <div className=" bg-secondary border border-input px-3 font-medium lg:text-lg py-2">
              Payment Method
            </div>
            <div className=" bg-transparent border border-input text-sm flex px-2 gap-1 items-center lg:text-lg py-2">
              <Checkbox checked={true} />{" "}
              <span className=" text-sm">Cash On Delivery</span>
            </div>
          </div>
        </div>
        <div className=" col-span-full lg:col-span-3">
          <OrderSummary
            buttonName={"Place Order"}
            cost={totalCost}
            disabled={false}
            run={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </Container>
  );
};

export default Checkout;

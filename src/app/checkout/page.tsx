"use client";
import { Container } from "@/components/ecom";
import React from "react";
import { useAppProvider } from "../Provider/AppProvider";
import OrderSummary from "@/components/ecom/OrderSummary";
import FormInput from "@/components/FormInput.components";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { decodeToken } from "@/lib/lib";

const Checkout = () => {
  const { totalCost } = useAppProvider();

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
              <FormInput label="City" type="text" id={"City"} />
              <FormInput label="Township" type="text" id={"Township"} />
              <FormInput label="Street" type="text" id={"Street"} />
              <FormInput
                label="Company(optional)"
                type="text"
                id={"Company(optional)"}
              />
              <div className=" flex flex-col gap-1.5">
                <Label htmlFor="address">Address Detail</Label>
                <Textarea id="address" />
              </div>
            </div>
          </div>
          <div className=" pt-4 space-y-4">
            <div className=" bg-secondary border border-input px-3 font-medium lg:text-lg py-2">
              Personal Information
            </div>
            <div className=" px-4 lg:grid-cols-2 gap-3 lg:gap-7 grid grid-cols-1">
              <FormInput label="Name" type="text" id={"name"} />
              <FormInput label="Phone" type="text" id={"phone"} />
              <FormInput label="Email" type="email" id={"email"} />
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
            disabled={true}
            run={() => {}}
          />
        </div>
      </div>
    </Container>
  );
};

export default Checkout;

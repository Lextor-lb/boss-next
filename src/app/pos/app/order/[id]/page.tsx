"use client";
import Container from "@/components/Container.components";
import NavHeader from "@/components/pos/NavHeader";
import { Backend_URL, getFetch, putFetch } from "@/lib/fetch";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import OrderCancelBox from "@/components/pos/order/OrderCancelBox";

const OrderDetailAdminPage = ({ params }: any) => {
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState<string>("");

  const getData = (url: string) => {
    return getFetch(url);
  };

  const { data, isLoading, mutate } = useSWR(
    `${Backend_URL}/orders/${params.id}`,
    getData
  );

  const putFetcher = (url: string, { arg }: { arg: any }) => {
    return putFetch(url, arg);
  };

  const { data: processData, trigger: process } = useSWRMutation(
    `${Backend_URL}/orders/${params.id}`,
    putFetcher
  );

  const generateLongNumber = (length: number) => {
    let number = "";
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return parseInt(number);
  };

  const processOrder = async (e: any, type: any) => {
    e.preventDefault();

    const processData: any = {
      orderStatus: type,
    };

    if (type == "CONFIRM") {
      processData.voucherCode = `${generateLongNumber(7)}`;
    }

    const res = await process(processData);

    if (res?.status) {
      setStatus("");
      setOpen(false);
    }
  };

  console.log(data);

  return (
    <Container>
      <div className="space-y-4">
        <NavHeader
          parentPage="Order Detail"
          path="E-commerce"
          currentPage="Order Detail"
        />
        {!isLoading && data && (
          <div className=" space-y-4">
            <div className=" p-5 bg-white border border-input rounded-md">
              <div className=" grid grid-cols-3">
                <div className=" grid grid-cols-1 gap-3 border-e">
                  <div className=" space-y-1.5">
                    <p className=" opacity-70 font-light text-sm">
                      Order Number
                    </p> 
                    <p>{data?.orderCode}</p>
                  </div>

                  <div className=" space-y-1.5">
                    <p className=" opacity-70 font-light text-sm">Ordered At</p>
                    <p>
                      {data?.date}, {data?.time}
                    </p>
                  </div>

                  <div className=" space-y-1.5">
                    <p className=" opacity-70 font-light text-sm">Total Cost</p>
                    <p>{data?.total}</p>
                  </div>

                  <div className=" space-y-1.5">
                    <form onSubmit={(e) => processOrder(e, status)}>
                      <div className=" w-2/3 space-y-2">
                        <div className=" flex items-center justify-between">
                          <p className=" opacity-70 font-light text-sm">
                            Order Status
                          </p>
                          {data?.orderStatus === "ORDERED" ? (
                            <div className=" flex items-center gap-1.5">
                              <Button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setStatus("CONFIRM");
                                }}
                                size={"sm"}
                              >
                                CONFIRM
                              </Button>
                              <OrderCancelBox
                                buttonName={"Cancel"}
                                buttonSize="sm"
                                buttonVariant={"secondary"}
                                confirmTitle={"Are you sure?"}
                                confirmDescription={
                                  "This action cannot be undone!"
                                }
                                confirmButtonText={"Yes, cancel this order."}
                                cancelReason={cancelReason}
                                setCancelReason={setCancelReason}
                                run={async () => {
                                  setStatus("CANCEL");

                                  const res = await process({
                                    orderStatus: "CANCEL",
                                    cancelReason: cancelReason,
                                  });

                                  if (res?.status) {
                                    setStatus("");
                                    setCancelReason("");
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            <div className=" flex gap-1.5">
                              <Button
                                onClick={() => setOpen(!open)}
                                disabled={
                                  data?.orderStatus == "CANCEL" ||
                                  data?.orderStatus == "COMPLETE"
                                }
                                size={"sm"}
                                type="button"
                                variant={"outline"}
                              >
                                {open ? "Cancel" : "Edit"}
                              </Button>
                              {open && (
                                <Button disabled={status == ""} size={"sm"}>
                                  Save
                                </Button>
                              )}
                            </div>
                          )}
                        </div>

                        {!open && (
                          <p className=" uppercase">{data?.orderStatus}</p>
                        )}
                        {open && (
                          <div className=" space-y-1.5">
                            <Select
                              value={status}
                              onValueChange={(e) => setStatus(e)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Stage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value="DELIVERY"
                                  disabled={data?.orderStatus === "COMPLETE"}
                                >
                                  Delivery
                                </SelectItem>
                                <SelectItem value="COMPLETE">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className=" ps-3 col-span-2 grid grid-cols-2 gap-3 ">
                  <div className=" space-y-1.5">
                    <p className=" opacity-70 font-light text-sm">
                      Customer Name
                    </p>
                    <p>{data?.ecommerceUser.name}</p>
                  </div>
                  <div className=" space-y-1.5 ">
                    <p className=" opacity-70 font-light text-sm">
                      Email Address
                    </p>
                    <p className="">{data?.ecommerceUser.email}</p>
                  </div>
                  <div className=" space-y-1.5">
                    <p className=" opacity-70 font-light text-sm">Address</p>
                    <p>
                      {data?.customerAddress.addressDetail},
                      {data?.customerAddress.street},
                      {data?.customerAddress.township},
                      {data?.customerAddress.city}
                    </p>
                  </div>
                  <div className=" space-y-1.5">
                    <p className=" opacity-70 font-light text-sm">Phone</p>
                    <a href={`tel:${data?.ecommerceUser.phone}`}>
                      {data?.ecommerceUser.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader className="hover:bg-white">
                <TableRow className="hover:bg-white bg-white">
                  <TableHead>No</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-end">Quantity</TableHead>
                  <TableHead className=" text-end">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.orderRecords.length < 1 ? (
                  <TableRow className="pointer-events-none bg-white">
                    {Array(7)
                      .fill(null)
                      .map((_, index) => (
                        <TableCell className="pointer-events-none" key={index}>
                          <p className="py-3"></p>
                        </TableCell>
                      ))}
                  </TableRow>
                ) : (
                  <>
                    {data.orderRecords.map(
                      (
                        {
                          productName,
                          price,
                          id,
                          quantity,
                          colorCode,
                          gender,
                          sizingName,
                          categoryName,
                          fittingName,
                          image,
                        }: any,
                        index: number
                      ) => (
                        <TableRow
                          key={index}
                          className=" bg-white hover:bg-white/35"
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <div className=" grid grid-cols-12">
                              <div className=" col-span-1">
                                <Image
                                  className="object-cover w-9 h-9 rounded-md"
                                  src={image?.url}
                                  alt=""
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <div className="flex col-span-11 gap-1 items-start justify-center flex-col">
                                <p className="capitalize font-medium">
                                  {productName}
                                </p>
                                <div className="flex items-center gap-1">
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {gender}
                                  </div>
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {sizingName}
                                  </div>
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {colorCode}
                                  </div>
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {categoryName}
                                  </div>
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {fittingName}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-end">
                            {quantity || 1}
                          </TableCell>
                          <TableCell className="text-end">
                            {new Intl.NumberFormat("ja-JP").format(price)}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default OrderDetailAdminPage;

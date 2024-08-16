"use client";

import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../ui/button";
import { AlignRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Backend_URL, putFetch } from "@/lib/fetch";
import useSWRMutation from "swr/mutation";
import ConfirmBox from "@/components/ConfirmBox";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type processDataType = {
  orderStatus: string;
  voucherCode?: string;
};

const OrderTable = ({ data, refetch }: any) => {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const generateLongNumber = (length: number) => {
    let number = "";
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return parseInt(number);
  };

  const putFetcher = (url: string, { arg }: { arg: any }) => {
    return putFetch(url, arg);
  };

  const { data: processData, trigger: process } = useSWRMutation(
    id !== null ? `${Backend_URL}/orders/${id}` : null,
    putFetcher
  );

  const processOrder = async (type: any) => {
    console.log("here", type);
    const data: processDataType = {
      orderStatus: `${type}`,
    };
    if (type == "CONFIRM") {
      data.voucherCode = `${generateLongNumber(7)}`;
    }
    const res = await process(data);
    console.log(res);
    if (res?.status) {
      refetch();
      closeRef.current && closeRef.current.click();
      setStatus("");
    }
  };

  return (
    <div className=" min-h-[780px]">
      <Table>
        <TableHeader className="hover:bg-white z-50">
          <TableRow className="hover:bg-white bg-white">
            <TableHead>No</TableHead>
            <TableHead>Order Id</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customers</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className=" text-end">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length < 1 ? (
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
              {data?.map(
                (
                  {
                    id,
                    orderCode,
                    date,
                    customerName,
                    total,
                    orderStatus,
                  }: any,
                  index: number
                ) => (
                  <TableRow
                    onClick={() => router.push(`/pos/app/order/${id}`)}
                    className=" bg-white cursor-pointer hover:bg-white/50"
                    key={id}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{orderCode}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>{customerName}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("ja-JP").format(total)}
                    </TableCell>
                    <TableCell className=" flex justify-end items-center h-full mt-2">
                      {orderStatus == "ORDERED" ? (
                        <div className=" flex items-center gap-1.5">
                          <Button
                            onClick={async (e) => {
                              e.stopPropagation();
                              await setId(id);
                              processOrder("CONFIRM");
                            }}
                            size={"sm"}
                          >
                            CONFIRM
                          </Button>
                          <ConfirmBox
                            buttonName={"Cancel"}
                            buttonSize="sm"
                            buttonVariant={"secondary"}
                            confirmTitle={"Are you sure?"}
                            confirmDescription={"This action can't be undone!"}
                            confirmButtonText={"Yes, cancel this order."}
                            run={async () => {
                              await setId(id);
                              processOrder("CANCEL");
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          {orderStatus == "CONFIRM" && (
                            <Badge className=" pointer-events-none bg-green-400">
                              Confirmed
                            </Badge>
                          )}
                          {orderStatus == "CANCEL" && (
                            <Badge className=" pointer-events-none bg-red-500">
                              Canceled
                            </Badge>
                          )}
                          {orderStatus == "DELIVERY" && (
                            <Badge className=" pointer-events-none bg-yellow-400">
                              On Delivery
                            </Badge>
                          )}
                          {orderStatus == "COMPLETE" && (
                            <Badge className=" pointer-events-none bg-neutral-900">
                              Completed
                            </Badge>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="" onClick={(e) => e.stopPropagation()}>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              disabled={
                                orderStatus == "CANCEL" ||
                                orderStatus == "COMPLETE"
                              }
                              onClick={(e) => e.stopPropagation()}
                              variant={"ghost"}
                              className="!p-0"
                            >
                              <AlignRight />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Control Order</SheetTitle>
                              <SheetDescription>
                                Make order stage here. Click save when you're
                                done.
                              </SheetDescription>
                            </SheetHeader>
                            <div className=" py-3 mb-6 space-y-1.5">
                              <Label>Stage</Label>
                              <Select
                                value={status}
                                onValueChange={(e) => setStatus(e)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Stage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="DELIVERY">
                                    Delivery
                                  </SelectItem>
                                  <SelectItem value="COMPLETE">
                                    Completed
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                <Button ref={closeRef} variant="link">
                                  Cancel
                                </Button>
                              </SheetClose>
                              <Button
                                disabled={status == ""}
                                onClick={async () => {
                                  await setId(id);
                                  processOrder(status);
                                }}
                                size="sm"
                              >
                                Save changes
                              </Button>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;

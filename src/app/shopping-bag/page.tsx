"use client";
import { Container } from "@/components/ecom";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppProvider } from "../Provider/AppProvider";
import Image from "next/image";
import OrderSummary from "@/components/ecom/OrderSummary";
import { useRouter } from "next/navigation";
import SweetAlert2 from "react-sweetalert2";

const ShoppingBag = () => {
  const { cartItems, setCartItems, totalCost, handleLogin } = useAppProvider();

  const remove = (id: number) => () => {
    setCartItems(cartItems.filter((el: any) => el.selectedProduct.id !== id));
  };

  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [swalProps, setSwalProps] = useState({
    show: false,
    showConfirmButton: false,
  });

  const handleClick = () => {
    if (isClient) {
      if (localStorage.getItem("auth")) {
        router.push("/checkout");
      } else {
        setSwalProps({
          ...swalProps,
          show: true,
        });
      }
    }
  };

  return (
    <Container className="  pt-4">
      <div className=" grid grid-cols-12  gap-4">
        <div className=" col-span-full space-y-3 lg:col-span-9">
          <p className=" text-sm">Shopping Bag</p>
          <p className=" text-lg lg:text-2xl  pb-3 lg:pb-6 font-semibold">
            Shopping Bag
          </p>
          <Table className=" border">
            <TableHeader className="hover:bg-white">
              <TableRow className="hover:bg-white bg-white">
                <TableHead className="flex w-[50px] items-center gap-3">
                  <span>No</span>
                </TableHead>
                <TableHead className=" ">Product Name</TableHead>
                <TableHead className=" hidden lg:table-cell text-end">
                  Quantity
                </TableHead>
                <TableHead className=" hidden lg:table-cell text-end">
                  Discount
                </TableHead>
                <TableHead className="   hidden  lg:table-cell w-[200px] text-end">
                  SubTotal
                </TableHead>
                <TableHead className="  text-end"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.length < 1 ? (
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
                  {cartItems?.map(
                    (
                      {
                        name,
                        price,
                        id,
                        quantity,
                        discountPrice,
                        selectedProduct,
                        salePrice,
                        discountInPrice,
                        priceAfterDiscount,
                      }: any,
                      index: number
                    ) => (
                      <TableRow
                        key={index}
                        className=" bg-white hover:bg-white/35"
                      >
                        <TableCell className="w-[50px] ">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="">
                          <div className=" flex  gap-2">
                            <Image
                              src={selectedProduct.mediaUrl}
                              width={300}
                              className=" h-[60px] lg:h-[120px] w-[40px] lg:w-[100px] object-cover"
                              height={300}
                              alt=""
                            />
                            <div className="flex gap-1 items-start justify-center flex-col">
                              <p className="capitalize font-medium">{name}</p>
                              <div className="flex items-center gap-1">
                                <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                  {selectedProduct.colorCode}
                                </div>
                                <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                  {selectedProduct.productSizing}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className=" hidden lg:table-cell text-end">
                          {quantity}
                        </TableCell>
                        <TableCell className=" hidden lg:table-cell text-end ">
                          {new Intl.NumberFormat("ja-JP").format(
                            discountInPrice
                          )}
                        </TableCell>
                        <TableCell className=" hidden lg:table-cell text-end">
                          {new Intl.NumberFormat("ja-JP").format(
                            priceAfterDiscount
                          )}
                        </TableCell>
                        <TableCell className="  text-end ms-4">
                          <Button
                            onClick={remove(selectedProduct.id)}
                            variant="ghost"
                            size="sm"
                          >
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <div className=" col-span-full lg:col-span-3">
          <OrderSummary
            disabled={cartItems.length == 0}
            buttonName="Proceed to checkout"
            discount={0}
            cost={totalCost}
            run={handleClick}
          />
        </div>
      </div>
      {isClient && (
        <SweetAlert2 {...swalProps}>
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
    </Container>
  );
};

export default ShoppingBag;

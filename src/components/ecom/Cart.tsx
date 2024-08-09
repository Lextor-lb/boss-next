import React from "react";
import CartItem from "./CartItem";
import { useAppProvider } from "@/app/Provider/AppProvider";
import { Button } from "../ui/button";

const Cart = ({ closeRef }: any) => {
  const { cartItems } = useAppProvider();
  const total = cartItems.reduce((pv: any, cv: any) => pv + cv.salePrice, 0);
  return (
    <div className=" space-y-3 bg-white pt-4 z-50 overflow-scroll h-[90%] relative">
      {cartItems.length == 0 ? (
        <p>Your Cart is empty!</p>
      ) : (
        <div className=" h-[70%] overflow-auto space-y-3">
          {cartItems.map((data: any, index: number) => (
            <CartItem data={data} key={index} />
          ))}
        </div>
      )}
      <div className=" bg-white absolute bottom-0 w-full">
        <div className=" flex items-center bg-white pt-3 justify-between">
          <p>Total</p>
          <p>{new Intl.NumberFormat("ja-JP").format(total)}</p>
        </div>
        <hr className=" my-3" />
        <div className=" space-y-1">
          <Button
            onClick={() => closeRef.current && closeRef.current.click()}
            className=" underline w-full text-center"
            variant={"link"}
          >
            Continue Shopping
          </Button>
          <Button size={"sm"} className=" w-full text-center">
            Shopping Bag
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useAppProvider } from "@/app/Provider/AppProvider";

const CartItem = ({ data }: any) => {
  const { cartItems, setCartItems } = useAppProvider();
  console.log("cart", cartItems);
  const remove = (id: number) => {
    setCartItems(cartItems.filter((el: any) => el.selectedProduct.id !== id));
  };
  return (
    <div>
      <div className=" grid grid-cols-3 gap-4">
        <div className=" col-span-1">
          <div className=" relative">
            <Image
              src={data.selectedProduct.mediaUrl}
              width={300}
              className=" h-[100px] lg:h-[150px] w-[150px] object-cover"
              height={300}
              alt=""
            />
            <Button
              onClick={() => remove(data.selectedProduct.id)}
              variant={"outline"}
              size={"sm"}
              className=" absolute w-5 h-5 right-1 !p-0 top-0"
            >
              <X width={14} height={14} />
            </Button>
          </div>
        </div>
        <div className=" col-span-2">
          <div className=" space-y-2">
            <div className=" flex items-center gap-2">
              <p className=" w-[100px] text-xs lg:text-sm font-medium">
                {data?.name}
              </p>
              <span>-</span>
              <div className=" flex gap-3 items-center">
                <div
                  style={{
                    backgroundImage: `url(${data.selectedProduct.mediaUrl})`,
                  }}
                  className="lg:w-7 lg:h-7 h-4 bg-red-900 w-4 rounded-full bg-cover bg-center"
                ></div>
                <p className=" text-xs text-primary/60 lg:text-sm font-medium">
                  {data.selectedProduct.productSizing}
                </p>
              </div>
            </div>
            <p className=" text-xs lg:text-sm font-medium">{data?.salePrice}</p>
          </div>
        </div>
      </div>
      <hr className=" my-2" />
    </div>
  );
};

export default CartItem;

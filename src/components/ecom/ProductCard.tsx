"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Heart, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import SweetAlert2 from "react-sweetalert2";
import { useAppProvider } from "@/app/Provider/AppProvider";

const ProductCard = ({
  id,
  name,
  productBrand,
  salePrice,
  medias,
  discountPrice,
  productCode,
  productVariants,
}: {
  id: number;
  name: string;
  salePrice: number;
  productBrand: string;
  medias: any;
  discountPrice?: number;
  productCode: any;
  productVariants: boolean;
}) => {
  const router = useRouter();

  const { handleLogin } = useAppProvider();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [swalProps, setSwalProps] = useState({
    show: false,
    showConfirmButton: false,
  });

  const addToWishList = () => {
    if (isClient) {
      if (localStorage.getItem("userId")) {
        console.log("id par", localStorage.getItem("userId"));
      } else {
        setSwalProps({
          ...swalProps,
          show: true,
        });
      }
    }
  };

  return (
    <div
      onClick={() => router.push(`/products/${id}`)}
      key={id}
      className=" cursor-pointer"
    >
      <div className=" relative">
        <Image
          src={medias[0]?.url}
          width={500}
          height={500}
          className=" h-[500px] lg:h-[600px] object-cover "
          alt=""
        />
        {/* <div className=" absolute top-3 right-3">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Hello");
            }}
            variant={"outline"}
            className=" h-6 w-6 p-0.5 rounded-full"
            size={"sm"}
          >
            <Heart size={18} color="#333" />
          </Button>
        </div> */}

        <div className=" absolute left-3 bottom-3">
          <Badge
            variant={"secondary"}
            className=" opacity-90 text-[12px] rounded-none"
          >
            {productBrand}
          </Badge>
        </div>
        {!productVariants && (
          <div className=" absolute capitalize top-2 left-0">
            <Badge
              variant={"destructive"}
              className=" opacity-90 text-[12px] rounded-none"
            >
              out of stock
            </Badge>
          </div>
        )}
      </div>
      <div className=" flex flex-col gap-[10px] p-[15px]">
        <div className=" space-y-1.5">
          <p className=" text-[16px] font-normal">
            {name} {productCode}
          </p>
        </div>
        {(discountPrice as number) > 0 ? (
          <div className=" space-y-[5px] text-[18px]">
            <div className="lg:flex gap-2 text-[18px] items-center">
              <p className=" line-through">
                {new Intl.NumberFormat("ja-JP").format(salePrice)} MMK
              </p>
              <p className="">
                {new Intl.NumberFormat("ja-JP").format(
                  salePrice * (1 - (discountPrice as number) / 100)
                )}
                MMK
              </p>
            </div>
            <Badge className=" text-black/70 bg-neutral-300">
              {discountPrice}% OFF
            </Badge>
          </div>
        ) : (
          <p className=" text-sm">
            {new Intl.NumberFormat("ja-JP").format(salePrice)} MMK
          </p>
        )}
      </div>
      {isClient && (
        <SweetAlert2 {...swalProps}>
          <div className=" pointer-events-none space-y-3 text-center">
            <p className=" pointer-events-none font-medium">Wishlist</p>
            <p className=" pointer-events-none text-black/50 text-sm">
              Your wishlist is currently empty. Sign in or create an account to
              save your wishlist across all your devices.
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
    </div>
  );
};

export default ProductCard;

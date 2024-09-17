"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Heart, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import SweetAlert2 from "react-sweetalert2";
import { useAppProvider } from "@/app/Provider/AppProvider";
import useSWRMutation from "swr/mutation";
import { Backend_URL } from "@/lib/fetch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const postData = async (url: string, { arg }: { arg: any }) => {
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

  const { data, trigger: add } = useSWRMutation(
    `${Backend_URL}/wishlist`,
    postData
  );

  const alertRef = useRef<HTMLButtonElement | null>(null);

  const addToWishList = async () => {
    if (isClient) {
      if (localStorage.getItem("userId")) {
        console.log("id par", localStorage.getItem("userId"));
        const data = {
          productId: id,
          salePrice: salePrice,
        };
        const res = await add(data);
      } else {
        alertRef.current?.click();
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
        <div className=" absolute top-3 right-3">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addToWishList();
            }}
            variant={"outline"}
            className=" h-6 w-6 p-0.5 rounded-full"
            size={"sm"}
          >
            <Heart size={18} color="#333" />
          </Button>
        </div>

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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className=" hidden" ref={alertRef} variant="outline">
            Add to wishlist
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              Your wishlist is currently empty. Sign in or create an account to
              save your wishlist across all your devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                handleLogin();
                e.stopPropagation();
              }}
            >
              Sign in
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductCard;

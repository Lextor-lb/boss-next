"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Heart, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

const ProductCard = ({
  id,
  name,
  productBrand,
  salePrice,
  medias,
}: {
  id: number;
  name: string;
  salePrice: number;
  productBrand: string;
  medias: any;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${id}`)}
      key={id}
      className=" cursor-pointer"
    >
      <div className=" relative">
        <Image
          src={medias[0]?.url}
          width={600}
          height={600}
          className=" lg:h-[500px] h-[300px] object-cover !w-full "
          alt=""
        />
        <div className=" absolute  top-3 right-3">
          <Button
            onClick={(e) => e.stopPropagation()}
            variant={"outline"}
            className=" h-6 w-6 p-0.5 rounded-full"
            size={"sm"}
          >
            <Heart size={16} />
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
      </div>
      <div className=" space-y-4 p-3">
        <div className=" space-y-1.5">
          <p className=" text-sm font-semibold">{name}</p>
        </div>
        <p className=" text-xs">
          {new Intl.NumberFormat("ja-JP").format(salePrice)} MMK
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

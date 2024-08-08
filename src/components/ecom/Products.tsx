"use client";

import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import ProductCard from "./ProductCard";

interface ProductType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdByUserId: number | null;
  updatedByUserId: number | null;
  isArchived: boolean | null;
}

interface ProductBrand {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  mediaId: number;
  createdByUserId: number | null;
  updatedByUserId: number | null;
  isArchived: boolean | null;
}

interface Product {
  id: number;
  name: string;
  gender: "MEN" | "WOMEN" | "UNISEX";
  salePrice: number;
  productBrand: ProductBrand;
  productType: ProductType;
}

const Products = ({
  data,
  isLoading,
}: {
  data: Product[];
  isLoading: boolean;
}) => {
  const router = useRouter();
  return (
    <div className=" space-y-3">
      <>
        {isLoading ? (
          <div className=" grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4"></div>
        ) : (
          <div className=" grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4">
            {data.map(({ name, gender, productBrand, salePrice, id }) => (
              <ProductCard
                id={id}
                key={id}
                name={name}
                productBrand={productBrand}
                salePrice={salePrice}
              />
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default Products;

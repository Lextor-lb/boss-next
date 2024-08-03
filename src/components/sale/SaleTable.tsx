"use client";

import React, { useState } from "react";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";

interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  discount: number;
  cost: number;
  productCategory: string;
  productFitting: string;
  productType: string;
  gender: string;
}

interface SaleTableProps {
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SaleTable: React.FC<SaleTableProps> = ({ data, setData }) => {
  const priceChange = (id: number, price: string) => {
    const priceValue = parseFloat(price);
    setData(
      data.map((el) =>
        el.id === id
          ? {
              ...el,
              price: priceValue,
              cost:
                el.discount > 0
                  ? el.quantity * priceValue * (1 - el.discount / 100)
                  : el.quantity * priceValue,
            }
          : el
      )
    );
  };

  console.log(data);

  const discountChange = (id: number, discount: string) => {
    const discountValue = parseFloat(discount);
    setData(
      data.map((el) =>
        el.id === id
          ? {
              ...el,
              discount: discountValue,
              cost:
                discountValue > 0
                  ? el.quantity * el.price * (1 - discountValue / 100)
                  : el.quantity * el.price,
            }
          : el
      )
    );
  };

  const remove = (id: number) => () => {
    setData(data.filter((el) => el.id !== id));
  };

  return (
    <div className="lg:h-[500px] xl:h-[735px] z-[900] overflow-auto">
      <Table>
        <TableHeader className="hover:bg-white">
          <TableRow className="hover:bg-white bg-white">
            <TableHead className="flex items-center gap-3">
              <span>No</span>
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-end">Price</TableHead>
            <TableHead className="text-end">Quantity</TableHead>
            <TableHead className="text-end">Discount</TableHead>
            <TableHead className="w-[200px] text-end">Cost</TableHead>
            <TableHead className="text-end"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length < 1 ? (
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
              {data.map(
                (
                  {
                    productName,
                    price,
                    id,
                    quantity,
                    discount,
                    cost,
                    productCategory,
                    productFitting,
                    productType,
                    gender,
                  },
                  index
                ) => (
                  <TableRow key={index} className=" bg-white hover:bg-white/35">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Checkbox />
                        <span>{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="">
                        <div className="flex gap-1 items-start justify-center flex-col">
                          <p className="capitalize font-medium">
                            {productName}
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                              {gender}
                            </div>
                            <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                              {productType}
                            </div>
                            <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                              {productCategory}
                            </div>
                            <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                              {productFitting}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-end ">
                      <Input
                        value={price}
                        onChange={(e) => priceChange(id, e.target.value)}
                        min={1}
                        type="number"
                        className="text-end  h-8"
                      />
                    </TableCell>
                    <TableCell className="text-end">
                      <div className="flex justify-end">
                        <p>{quantity}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-end">
                      <div className="flex justify-end">
                        <Input
                          value={discount}
                          onChange={(e) => discountChange(id, e.target.value)}
                          min={0}
                          type="number"
                          className="text-end w-[50%] h-8"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-end">
                      <div className="flex justify-end">
                        {isNaN(cost) ? (
                          0
                        ) : (
                          <>{new Intl.NumberFormat("ja-JP").format(cost)}</>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-end">
                      <Button onClick={remove(id)} variant="ghost" size="sm">
                        <MinusCircle />
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
  );
};

export default SaleTable;

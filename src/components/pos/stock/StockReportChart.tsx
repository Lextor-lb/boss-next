"use client";

import React, { useEffect, useState } from "react";
import { CoinsIcon, ShoppingCart } from "lucide-react";
import StockChart from "./StockChart";
import { Button } from "../ui/button";

const StockReportChart = ({
  isLoading = true,
  data,
}: {
  isLoading: boolean;
  data: any;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {!isLoading && (
        <div className=" grid grid-cols-12 gap-4">
          <div className=" grid grid-cols-2 col-span-5  gap-3">
            <div className=" p-4 flex items-center justify-between border bg-white rounded border-input gap-3">
              <ShoppingCart size={40} />
              <div>
                <p className=" font-medium text-end text-xl">
                  {data.totalProducts}
                </p>
                <p className=" font-light">Total Products</p>
              </div>
            </div>
            <div className=" p-4 flex justify-between bg-white items-center border rounded border-input gap-3">
              <CoinsIcon size={40} />
              <div>
                <p className=" font-medium text-end text-xl">
                  {data.totalBrands}
                </p>
                <p className=" font-light">Total Brands</p>
              </div>
            </div>
            <div className=" p-4 col-span-full bg-white border space-y-4 rounded border-input ">
              <div className=" flex items-center justify-between gap-3">
                <div className="h-2.5 w-full basis-2/3 rounded  relative">
                  <div
                    style={{ width: `${data.inStockPercentage}%` }}
                    className={`h-2.5  z-50 absolute left-0 rounded-s bg-green-400`}
                  ></div>
                  <div
                    style={{ width: `${data.lowStockPercentage}%` }}
                    className={`h-2.5 right-0 w-[${data.lowStockPercentage}%] z-50 rounded-e absolute  bg-blue-400`}
                  ></div>
                </div>
                <div>
                  <p className=" font-medium text-xl text-end">{data.totalProducts}</p>
                  <p className=" font-light">Products</p>
                </div>
              </div>
              <div className=" flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className=" bg-green-400 w-3 h-3 rounded-full"></div>
                  <p className=" font-medium text-sm">Instock</p>
                </div>
                <div className=" flex gap-4">
                  <p className=" font-medium">{data.inStock}</p>
                  <p className=" font-medium">{data.inStockPercentage}%</p>
                </div>
              </div>
              <hr />
              <div className=" flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className=" bg-blue-400 w-3 h-3 rounded-full"></div>
                  <p className=" font-medium text-sm">Low Stock</p>
                </div>
                <div className=" flex gap-4">
                  <p className=" font-medium">{data.lowStock}</p>
                  <p className=" font-medium">{data.lowStockPercentage}%</p>
                </div>
              </div>
              <hr />
              <div className=" flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className=" bg-pink-400 w-3 h-3 rounded-full"></div>
                  <p className=" font-medium text-sm">Out of stock</p>
                </div>
                <div className=" flex gap-4">
                  <p className=" font-medium">{data.outOfStock}</p>
                  <p className=" font-medium">{data.outOfStockPercentage}%</p>
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div className=" bg-white p-5 col-span-7 border rounded border-input">
            <p className=" text-xl font-semibold">Best Seller Brands</p>
            <div className="  grid grid-cols-2 gap-12 me-12">
              <div className=" space-y-3">
                <StockChart
                  data={data?.bestSellerBrands.map((el: any) => el.quantity)}
                  labels={data?.bestSellerBrands.map((el: any) => el.name)}
                />
              </div>
              <div>
                <p className=" text-end text-xl mb-3 font-semibold">620,000</p>

                {data?.bestSellerBrands.map(
                  ({ name, quantity }: any, index: number) => (
                    <React.Fragment key={index}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <div className=" bg-blue-400 w-3 h-3 rounded-full"></div>
                          <p className=" font-medium text-sm">{name}</p>
                        </div>
                        <p className=" font-medium">{quantity}</p>
                      </div>
                      {index !== data.bestSellerBrands.length - 1 && (
                        <hr className=" my-2" />
                      )}
                    </React.Fragment>
                  )
                )}
                <div className=" flex mt-12 justify-end">
                  <Button variant={"outline"}>Recent Sales</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockReportChart;

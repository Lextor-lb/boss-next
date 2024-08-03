"use client";

import Container from "@/components/Container.components";
import NavHeader from "@/components/pos/NavHeader";
import SaleInfoBox from "@/components/sale/SaleInfoBox";
import SaleTable from "@/components/sale/SaleTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Backend_URL, getFetch } from "@/lib/fetch";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState, FormEvent } from "react";
import useSWR from "swr";

interface Customer {
  id: string;
  name: string;
  level: string;
  phone_number: string;
  promotion_rate: number;
}

interface BarcodeState {
  status: boolean;
  code: string;
}

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

const SaleForm: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  const [paymentInfo, setPaymentInfo] = useState({
    customer: {
      customer_id: "",
      amount: 0,
    },
    type: "",
    payment_method: "",
    overallDiscount: 0,
    tax: false,
  });

  const barcodeRef = useRef<HTMLInputElement>(null);
  const [barcode, setBarcode] = useState<BarcodeState>({
    status: false,
    code: "",
  });

  const getData = (url: string) => {
    return getFetch(url);
  };

  const {
    data: customerData,
    error: customerError,
    isLoading: customerLoading,
  } = useSWR<{ data: Customer[] }>(`${Backend_URL}/customers/all`, getData);

  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useSWR(
    barcode.status ? `${Backend_URL}/vouchers/barcode/${barcode.code}` : null,
    getData,
    {
      errorRetryCount: 0,
    }
  );

  const submitBarcode = (e: FormEvent) => {
    e.preventDefault();
    if (barcodeRef.current) {
      setBarcode({
        status: true,
        code: barcodeRef.current.value,
      });
    }
  };

  useEffect(() => {
    if (barcodeRef.current) {
      barcodeRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (productData && !productLoading && !productError) {
      const productExists = data.some(
        (product) => product.id === productData.id
      );

      if (!productExists) {
        const newData = {
          ...productData,
          quantity: 1,
          discount: 0,
        };
        newData.cost = newData.quantity * newData.price;

        setData([...data, newData]);
        if (barcodeRef.current) {
          barcodeRef.current.focus();
          barcodeRef.current.value = "";
        }
      }

      setBarcode({
        status: false,
        code: "",
      });
    }
  }, [productData, productLoading, productError, barcodeRef]);

  return (
    <Container>
      <div className=" relative w-full">
        <NavHeader parentPage="Sale" path="Sale" />
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div
              style={{ alignItems: "flex-end" }}
              className="flex justify-end items-center"
            >
              <form onSubmit={submitBarcode}>
                <div
                  style={{ alignItems: "flex-end" }}
                  className="flex items-center justify-end gap-3"
                >
                  {/* tax */}
                  <div>
                    <Label htmlFor="tax">Tax</Label>
                    <Switch id="tax" />
                  </div>

                  {/* customer */}
                  <div className="basis-3/12">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customerLoading ? (
                          <SelectItem
                            className="pointer-events-none capitalize"
                            value=" "
                          >
                            Loading...
                          </SelectItem>
                        ) : (
                          customerData?.data.map(
                            (
                              { id, name, level, phone_number }: Customer,
                              index: number
                            ) => (
                              <SelectItem
                                key={index}
                                className="capitalize"
                                value={id}
                              >
                                <Badge className="me-1">{level}</Badge>
                                {name} ({phone_number})
                              </SelectItem>
                            )
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* type */}
                  <div className="basis-1/12">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="basis-1/12">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="wallet">Wallet</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="basis-1/12 space-y-1.5">
                    <Label htmlFor="discount">Discount</Label>
                    <Input
                      id="discount"
                      type="number"
                      className="h-9 text-end"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input ref={barcodeRef} id="barcode" className="h-9" />
                  </div>
                  <Button disabled={productLoading} type="submit" size="sm">
                    {productLoading ? "Loading" : <Plus />}
                  </Button>
                </div>
              </form>
            </div>
            {productError && (
              <p className="text-red-500">{productError.message}</p>
            )}
            {customerError && (
              <p className="text-red-500">{customerError.message}</p>
            )}
          </div>
          <SaleTable data={data} setData={setData} />
          <div className=" absolute bottom-0 w-full">
            <SaleInfoBox
              isNotValid={false}
              handleSubmit={(e: any) => {
                e.preventDefault;
              }}
              data={data}
              setData={setData}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SaleForm;

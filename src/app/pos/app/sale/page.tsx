"use client";

import Container from "@/components/Container.components";
import NavHeader from "@/components/pos/NavHeader";
import SaleInfoBox from "@/components/pos/sale/SaleInfoBox";
import SaleTable from "@/components/pos/sale/SaleTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Backend_URL, getFetch } from "@/lib/fetch";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Check, Plus } from "lucide-react";
import React, { useEffect, useRef, useState, FormEvent } from "react";
import useSWR from "swr";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Customer {
  id: string;
  name: string;
  level: string;
  phoneNumber: string;
  promotionRate: number;
  special: any;
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
  productSizing: string;
}

interface customerInfoData {
  name: string | undefined;
  phone: string | undefined;
}

const SaleForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomer] = useState<string>("");
  const [data, setData] = useState<Product[]>([]);
  const [customerPromotion, setCustomerPromotion] = useState<
    number | undefined
  >();

  const [customerInfoData, setCustomerData] = useState<customerInfoData>({
    name: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    customer: {
      customerId: "",
      amount: 0,
    },
    type: "offline",
    payment_method: "cash",
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
    if (productError) {
      if (barcodeRef.current) {
        barcodeRef.current.value = "";
        barcodeRef.current.focus();
      }
      return;
    }
    if (productData && !productLoading && !productError) {
      const productExists = data.some(
        (product) => product.id === productData.id
      );

      if (productExists) {
        if (barcodeRef.current) {
          barcodeRef.current.value = "";
          barcodeRef.current.focus();
        }
      } else {
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
                  <div className=" flex flex-col gap-3">
                    <Label htmlFor="tax">Tax</Label>
                    <Switch
                      id="tax"
                      checked={paymentInfo.tax}
                      onCheckedChange={() =>
                        setPaymentInfo({
                          ...paymentInfo,
                          tax: !paymentInfo.tax,
                        })
                      }
                    />
                  </div>

                  {/* customer */}

                  <div className="space-y-1.5 basis-2/12">
                    <div>
                      <div className=" text-end">{customerPromotion} %</div>
                      <Label>Select customers</Label>
                    </div>

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[400px] text-sm justify-between !rounded-md"
                        >
                          {customers ? customers : "Customers"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search customers..."
                            className="h-9"
                          />
                          <CommandEmpty>No customers found!</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {customerData?.data.map(
                                ({ id, name, phoneNumber }: any) => (
                                  <CommandItem
                                    className={cn(
                                      customers === name ? "bg-accent" : ""
                                    )}
                                    key={id}
                                    value={name}
                                    onSelect={(e) => {
                                      setCustomerPromotion(
                                        customerData?.data.find(
                                          (el) => el.id == id
                                        )?.special.promotionRate
                                      );
                                      setCustomerData({
                                        name: customerData?.data.find(
                                          (el) => el.id == id
                                        )?.name,
                                        phone: customerData?.data.find(
                                          (el) => el.id == id
                                        )?.phoneNumber,
                                      });
                                      setPaymentInfo({
                                        ...paymentInfo,
                                        customer: {
                                          customerId: id,
                                          amount: 0,
                                        },
                                      });
                                      setCustomer(e);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        customers === name
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {name} {phoneNumber}
                                  </CommandItem>
                                )
                              )}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* type */}
                  <div className="basis-1/12">
                    <Select
                      defaultValue={paymentInfo.type}
                      onValueChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          type: e,
                        })
                      }
                    >
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
                    <Select
                      defaultValue={paymentInfo.payment_method}
                      onValueChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          payment_method: e,
                        })
                      }
                    >
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

                  <div className="basis-1/12 space-y-1">
                    <Label htmlFor="discount">Discount</Label>
                    <Input
                      id="discount"
                      type="number"
                      className="h-9 text-end w-[80px] "
                      value={paymentInfo.overallDiscount}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          overallDiscount: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className=" flex flex-col gap-1.5">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      ref={barcodeRef}
                      id="barcode"
                      className="h-9 w-[100px]"
                    />
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
              <p className="text-red-500">
                Customer Data has {customerError.message}
              </p>
            )}
          </div>
          <SaleTable data={data} setData={setData} />
          <div className=" absolute bottom-0 w-full">
            <SaleInfoBox
              setPaymentInfo={setPaymentInfo}
              loyaltyDiscount={customerPromotion}
              overallDiscount={paymentInfo.overallDiscount}
              data={data}
              setData={setData}
              paymentInfo={paymentInfo}
              customerInfoData={customerInfoData}
              setCustomerPromotion={setCustomerPromotion}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SaleForm;

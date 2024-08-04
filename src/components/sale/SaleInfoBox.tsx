import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SweetAlert2 from "react-sweetalert2";
import Voucher from "./Voucher";
import { Backend_URL, postFetch } from "@/lib/fetch";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

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

interface Voucher {
  voucher_code: string;
  customerId?: any;
  type: any;
  discount: any;
  subTotal: number;
  total: number;
  paymentMethod: any;
  voucherRecord: {
    product_variant_id: number;
    quantity: number;
    sale_price: number;
    discount: number;
  }[];
  tax?: number; // Add the tax property here
}

const SaleInfoBox = ({
  data,
  setData,
  overallDiscount,
  loyaltyDiscount,
  paymentInfo,
  setPaymentInfo,
  customerInfoData,
  setCustomerPromotion,
}: {
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
  overallDiscount: number;
  loyaltyDiscount: number | undefined;
  paymentInfo: any;
  setPaymentInfo: any;
  customerInfoData: any;
  setCustomerPromotion: any;
}) => {
  const [swalProps, setSwalProps] = useState({
    show: false,
    showConfirmButton: false,
    allowOutsideClick: true,
  });

  const [change, setChange] = useState(0);
  const [error, setError] = useState(false);
  const [chargeValue, setChargeValue] = useState<number>(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalCostWithoutDiscounts = data.reduce((pv, cv) => pv + cv.cost, 0);

    const overallDiscountAmount =
      (overallDiscount / 100) * totalCostWithoutDiscounts;
    const totalCostAfterOverallDiscount =
      totalCostWithoutDiscounts - overallDiscountAmount;

    const loyaltyDiscountValue = loyaltyDiscount ?? 0; // Default to 0 if undefined
    const loyaltyDiscountAmount =
      (loyaltyDiscountValue / 100) * totalCostAfterOverallDiscount;
    const totalCostAfterDiscounts = (
      totalCostAfterOverallDiscount - loyaltyDiscountAmount
    ).toFixed(0); // Keeping .toFixed(0)

    const total = paymentInfo.tax
      ? (Number(totalCostAfterDiscounts) * 1.05).toFixed(0) // Apply 5% tax
      : totalCostAfterDiscounts;

    setTotal(Number(total));

    const newChange =
      chargeValue > Number(totalCostAfterDiscounts)
        ? parseFloat((chargeValue - Number(totalCostAfterDiscounts)).toFixed(0))
        : 0;

    setChange(newChange);
  }, [data, chargeValue, overallDiscount, loyaltyDiscount, paymentInfo.tax]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const generateLongNumber = (length: number) => {
    let number = "";
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return parseInt(number);
  };

  const [voucherCode, setVoucherCode] = useState<number | undefined>();

  useEffect(() => {
    setVoucherCode(generateLongNumber(7));
  }, []);

  // Fetcher function to make API requests
  const postFetcher = async (url: string, { arg }: { arg: any }) => {
    console.log(arg);
    return postFetch(url, arg);
  };

  const { isMutating, trigger: sell } = useSWRMutation(
    `${Backend_URL}/vouchers`,
    postFetcher
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      paymentInfo.type === "" ||
      paymentInfo.paymentMethod === "" ||
      data.length === 0
    ) {
      return;
    } else {
      const voucher = {
        voucherCode: `${voucherCode}`,
        // customerId: paymentInfo.customer.customerId,
        type: paymentInfo.type.toUpperCase(),
        discount: paymentInfo.overallDiscount,
        subTotal: data.reduce((pv, cv) => pv + cv.cost, 0),
        total,
        paymentMethod: paymentInfo.payment_method.toUpperCase(),
        voucherRecords: data.map(({ id, quantity, discount, price }) => ({
          productVariantId: id,
          quantity,
          salePrice: price,
          discount,
        })),
      } as any;

      if (paymentInfo.tax) {
        (voucher as any).tax = 5;
      }

      if (paymentInfo.customer.amount > 0) {
        (voucher as any).customerId = paymentInfo.customer.customerId;
      }

      const res = await sell(voucher);
      if (res.status) {
        setData([]);
        setPaymentInfo({
          customer: {
            customerId: "",
            amount: 0,
          },
          type: "offline",
          payment_method: "cash",
          overallDiscount: 0,
          tax: false,
        });
        setCustomerPromotion(undefined);
        router.push(`/pos/app/voucher/${voucherCode}`);
        setVoucherCode(generateLongNumber(7));
        return setError(false);
      }
      if (!res.status) {
        setError(true);
      }
    }
  };

  return (
    <>
      {error && (
        <p className=" text-red-500">Something went wrong! Please Try Again</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="flex justify-between basis-4/12 items-end rounded-e-none bg-white p-3 rounded border border-primary">
            <Button
              disabled={data.length === 0}
              onClick={() =>
                setSwalProps({
                  ...swalProps,
                  show: true,
                })
              }
              type="button"
              className="self-end"
              variant="outline"
            >
              View Voucher
            </Button>
            <div className="text-end">
              <div className="flex items-center justify-end gap-2">
                <p className="text-sm text-primary/60">Total</p>
              </div>
              <p className="text-2xl">
                {new Intl.NumberFormat("ja-JP").format(total)}
              </p>
            </div>
          </div>
          <div className="text-end basis-8/12 rounded-s-none border-s-0 rounded-r bg-white p-3 rounded border border-primary">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5 basis-1/3">
                <Label htmlFor="charge" className="text-sm">
                  Total Charges
                </Label>
                <Input
                  id="charge"
                  type="number"
                  value={chargeValue}
                  onChange={(e) => setChargeValue(parseInt(e.target.value))}
                  className="text-end h-8"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-primary/70">Change</p>
                <p className="text-xl">{change}</p>
              </div>
              <div className="basis-1/3 self-end">
                <Button disabled={isMutating} className="select-none w-full">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {isClient && (
        <SweetAlert2
          customClass={{
            popup: " !w-auto !h-auto ",
          }}
          didClose={() =>
            setSwalProps({
              ...swalProps,
              show: false,
            })
          }
          {...swalProps}
        >
          <Voucher
            data={data}
            subTotal={data.reduce((pv, cv) => pv + cv.cost, 0)}
            total={total}
            tax={paymentInfo.tax}
            voucherCode={voucherCode}
            overallDiscount={paymentInfo.overallDiscount}
            loyaltyDiscount={loyaltyDiscount}
            customerInfoData={customerInfoData}
          />
        </SweetAlert2>
      )}
    </>
  );
};

export default SaleInfoBox;

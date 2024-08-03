import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SweetAlert2 from "react-sweetalert2";

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

const SaleInfoBox = ({
  isNotValid,
  handleSubmit,
  data,
  setData,
}: {
  isNotValid: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
  const [swalProps, setSwalProps] = useState({
    show: false,
    showConfirmButton: false,
    allowOutsideClick: true,
  });

  const [change, setChange] = useState(0);
  const charge = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const totalCost = data.reduce((pv, cv) => pv + cv.cost, 0);
    const chargeValue = parseFloat(charge.current?.value ?? "0");
    const newChange = chargeValue > totalCost ? chargeValue - totalCost : 0;
    setChange(newChange);
  }, [data, charge.current?.value]);

  return (
    <>
      {isNotValid && (
        <p className="text-red-500 text-sm py-3">
          Please Select Payment type and location before submitting!
        </p>
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
                {new Intl.NumberFormat("ja-JP").format(
                  data.reduce((pv, cv) => pv + cv.cost, 0)
                )}
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
                  ref={charge}
                  className="text-end h-8"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-primary/70">Change</p>
                <p className="text-xl">{change}</p>
              </div>
              <div className="basis-1/3 self-end">
                <Button disabled={isNotValid} className="select-none w-full">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {swalProps.show && (
        <SweetAlert2
          didClose={() =>
            setSwalProps({
              ...swalProps,
              show: false,
            })
          }
          {...swalProps}
        >
          <p>Voucher content here</p>
          {/* <Voucher
            data={data}
            total={total}
            subTotal={subTotal}
            tax={tax}
            taxOn={paymentInfo.tax.status}
            overallDiscount={paymentInfo.overallDiscount}
            loyaltyDiscount={paymentInfo.customer}
          /> */}
        </SweetAlert2>
      )}
    </>
  );
};

export default SaleInfoBox;

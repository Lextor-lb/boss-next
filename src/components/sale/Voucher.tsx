import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Info = ({ title, amount }: { title: string; amount: string }) => {
  return (
    <div className="flex gap-12">
      <p className="text-base font-light text-start w-[200px] text-primary/50">
        {title}
      </p>
      <p className="text-base font-normal w-[104px] text-end text-primary/90">
        {amount}
      </p>
    </div>
  );
};

const Voucher = ({
  data,
  total,
  tax,
  subTotal,
  voucherCode,
  overallDiscount,
  loyaltyDiscount,
  date = new Date().toLocaleDateString("en-GB"),
  time = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }),
  customerInfoData,
}: any) => {
  return (
    <div className="space-y-8 p-6 bg-white">
      <p className="text-xl mb-3 text-primary text-center font-medium">
        Receipt Voucher
      </p>

      <div className="">
        <div className="grid gap-1 grid-cols-2">
          {customerInfoData.name !== "" && (
            <div className="flex gap-4 items-center">
              <p className=" text-sm w-[200px] text-start text-black">
                Customer Name
              </p>
              <p className=" text-sm text-black">{customerInfoData.name}</p>
            </div>
          )}

          <div className="flex gap-4 items-center">
            <p
              className={` text-sm ${
                customerInfoData.name !== "" ? " w-[100px]" : " w-[200px] "
              }text-start text-black`}
            >
              Date
            </p>
            <p className=" text-sm text-black">{date}</p>
          </div>

          {customerInfoData.name !== "" && (
            <div className="flex gap-4  items-center">
              <p className=" text-sm w-[200px] text-start text-black">Phone</p>
              <p className=" text-sm text-black">{customerInfoData.phone}</p>
            </div>
          )}

          <div className="flex gap-4 items-center">
            <p
              className={` text-sm ${
                customerInfoData.name !== "" ? " w-[200px]" : " w-[100px] "
              }text-start text-black`}
            >
              Time
            </p>
            <p className=" text-sm text-black">{time}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className=" text-sm w-[200px] text-start text-black">
              Voucher Code
            </p>
            <p className=" text-sm text-black">{voucherCode}</p>
          </div>
        </div>
      </div>
      <Table className="border pointer-events-none">
        <TableHeader className="hover:bg-white z-50">
          <TableRow className="hover:bg-white bg-white">
            <TableHead>No</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-end">Price</TableHead>
            <TableHead className="text-end">Qty</TableHead>
            <TableHead className="text-end">Discount</TableHead>
            <TableHead className="text-end">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(
            (
              {
                productName,
                price,
                quantity,
                discount,
                id,
                cost,
                productCategory,
                productFitting,
                productType,
                gender,
                salePrice,
              }: any,
              index: number
            ) => (
              <TableRow key={id} className="bg-white">
                <TableCell className="text-start">{index + 1}</TableCell>
                <TableCell className="text-start">
                  <div className="flex gap-1 flex-col">
                    <p className="capitalize">{productName}</p>
                    <div className="flex items-center gap-1">
                      {/* <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                        {gender}
                      </div> */}
                      {/* <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                        {productType}
                      </div>
                      <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                        {productCategory}
                      </div>
                      <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                        {productFitting}
                      </div> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-end">
                  {new Intl.NumberFormat("ja-JP").format(price || salePrice)}
                </TableCell>
                <TableCell className="text-end">1</TableCell>
                <TableCell className="text-end">{discount}</TableCell>
                <TableCell className="text-end">
                  {cost ? (
                    <>{new Intl.NumberFormat("ja-JP").format(cost)}</>
                  ) : (
                    <>{salePrice}</>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end items-end gap-3 me-2 flex-col">
        <Info
          title={"Subtotal"}
          amount={new Intl.NumberFormat("ja-JP").format(subTotal)}
        />
        {tax && <Info title={"Tax"} amount="5" />}
        <>
          {loyaltyDiscount > 0 && (
            <Info title={"Loyalty Discount % "} amount={loyaltyDiscount} />
          )}
        </>

        {overallDiscount > 0 && (
          <Info title={"Total Discount %"} amount={overallDiscount} />
        )}

        <hr className="border-primary/40 w-[43%]" />
        <div className="flex my-3 gap-12">
          <p className="text-lg font-normal text-start w-[200px] text-primary">
            Total
          </p>
          <p className="text-lg font-medium w-[104px] text-end text-primary">
            {new Intl.NumberFormat("ja-JP").format(total)}
          </p>
        </div>
        <hr className="border-primary/40 w-[43%]" />
      </div>
    </div>
  );
};

export default Voucher;

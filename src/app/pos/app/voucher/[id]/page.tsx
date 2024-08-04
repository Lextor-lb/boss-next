"use client";

import React from "react";
import Voucher from "@/components/sale/Voucher";
import { Backend_URL, getFetch } from "@/lib/fetch";
import useSWR from "swr";

const VoucherPage = ({ params }: { params: { id: string } }) => {
  const getData = (url: string) => {
    return getFetch(url);
  };

  const { data, isLoading } = useSWR(`${Backend_URL}/vouchers/${1}`, getData);
  console.log(data);
  return (
    <div className=" h-screen flex justify-center  items-center">
      {!isLoading && (
        <Voucher
          fromLocal={true}
          data={data.voucherRecords}
          subTotal={data.subTotal}
          total={data.total}
          tax={data.tax > 0}
          voucherCode={data.voucherCode}
          overallDiscount={data.discount}
          loyaltyDiscount={data.royaltyDiscount}
          customerInfoData={{
            name: data.customerName,
            phone: data.customerName,
          }}
          time={data.time}
          date={data.date}
        />
      )}
    </div>
  );
};

export default VoucherPage;

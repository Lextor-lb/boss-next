"use client";

import React, { useRef } from "react";
import Voucher from "@/components/sale/Voucher";
import { Backend_URL, getFetch } from "@/lib/fetch";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Container from "@/components/Container.components";
import NavHeader from "@/components/pos/NavHeader";

const VoucherPage = ({ params }: { params: { id: string } }) => {
  const getData = (url: string) => {
    return getFetch(url);
  };

  const { data, isLoading } = useSWR(
    `${Backend_URL}/vouchers/${params.id}`,
    getData
  );

  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const print = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = `<div class="printable">${printContents}</div>`;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  const handlePrint = () => {};
  return (
    <Container>
      <NavHeader path="Voucher" parentPage="Voucher" />
      <div className=" flex justify-center gap-4 flex-col items-center">
        {!isLoading && (
          <div ref={printRef}>
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
                phone: data.phone,
              }}
              time={data.time}
              date={data.date}
            />
          </div>
        )}

        <div className=" flex w-full justify-end me-72 pe-1 gap-4 ">
          <Button
            className=" w-[300px]"
            variant={"outline"}
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button className=" w-[300px]" onClick={() => print()}>
            Print
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default VoucherPage;

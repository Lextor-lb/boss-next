"use client";
import { Container } from "@/components/ecom";
import AppLayout from "@/components/ecom/AppLayout";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: any) => {
  const pathName = usePathname();
  console.log(pathName);

  const router = useRouter();
  return (
    <AppLayout>
      <Container>
        <p className=" pt-4 text-sm lg:text-sm pb-12 font-normal">
          Profile | My account
        </p>
        <div className=" grid grid-cols-12">
          <div className=" col-span-2">
            <div className=" flex flex-col gap-1.5 space-y-1.5">
              <span
                onClick={() => router.push("/profile/information")}
                className={` ${
                  pathName.includes("information") && "font-semibold"
                } cursor-pointer w-40 uppercase`}
              >
                Personal info
              </span>
              <span
                onClick={() => router.push("/profile/orders")}
                className={` ${
                  pathName.includes("orders") && "font-semibold"
                } cursor-pointer w-40 uppercase`}
              >
                orders
              </span>
              <span
                onClick={() => router.push("/profile/address")}
                className={` ${
                  pathName.includes("address") && "font-semibold"
                } cursor-pointer w-40 uppercase`}
              >
                address
              </span>
            </div>
          </div>
          <div className=" col-span-10">{children}</div>
        </div>
      </Container>
    </AppLayout>
  );
};

export default Layout;

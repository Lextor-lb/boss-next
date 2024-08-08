import AppLayout from "@/components/ecom/AppLayout";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <AppLayout>
      <div className=" py-3">{children}</div>
    </AppLayout>
  );
};

export default Layout;

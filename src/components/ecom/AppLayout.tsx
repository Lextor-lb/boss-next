import React from "react";
import Navbar from "./Navbar";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

const AppLayout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className="h-[120px] lg:h-[120px]"></div>
      {/* <div className=" flex flex-col gap-[40px]"> */}
      {children}
      <CallToAction />
      <Footer />
    </div>
    // </div>
  );
};

export default AppLayout;

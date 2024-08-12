import React from "react";
import Navbar from "./Navbar";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

const AppLayout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className="h-[80px] lg:h-[100px]"></div>
      {children}
      <CallToAction />
      <Footer />
    </div>
  );
};

export default AppLayout;

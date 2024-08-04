import Container from "@/components/Container.components";
import NavHeader from "@/components/pos/NavHeader";
import React from "react";

const TodayReport = () => {
  return (
    <Container>
      <NavHeader parentPage="Today" path="Sale Report" currentPage="Today" />
    </Container>
  );
};

export default TodayReport;

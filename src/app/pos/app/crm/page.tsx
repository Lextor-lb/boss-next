"use client";

import Container from "@/components/Container.components";
import ErrorComponent from "@/components/ErrorComponent";
import CustomerAnalysisBox from "@/components/pos/crm/CustomerAnalysisBox";
import CustomerTable from "@/components/pos/crm/CustomerTable";
import { PaginationComponent } from "@/components/pos/inventory";
import NavHeader from "@/components/pos/NavHeader";
import TableSkeletonLoader from "@/components/TableSkeletonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Backend_URL, getFetch } from "@/lib/fetch";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

const CRM = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const getData = (url: string) => {
    return getFetch(url);
  };

  const { data, isLoading, error } = useSWR(
    `${Backend_URL}/customers/all`,
    getData
  );

  // for pagination
  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToLastPage = () => {
    setCurrentPage(data?.totalPages);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const router = useRouter();

  return (
    <Container>
      <></>
      <div className=" space-y-4">
        <NavHeader
          parentPage="Customer List"
          path="Customer"
          currentPage="Customer List"
        />
        {!isLoading && (
          <div className=" space-y-4">
            <CustomerAnalysisBox data={data?.analysis} />
            <div className=" space-y-2">
              <p className=" text-xl font-semibold">Customer Info</p>
              <div className=" flex justify-between items-center">
                <Input placeholder="Search...." />
                <Button onClick={() => router.push("/pos/app/add-customer")}>
                  <PlusCircle /> <span className="ms-1">Add Customer</span>
                </Button>
              </div>
              {error ? (
                <ErrorComponent refetch={() => {}} />
              ) : (
                <>
                  {isLoading ? (
                    <TableSkeletonLoader />
                  ) : (
                    <div className=" space-y-3">
                      <CustomerTable data={data?.data} />
                      <PaginationComponent
                        goToFirstPage={goToFirstPage}
                        currentPage={currentPage}
                        decrementPage={decrementPage}
                        incrementPage={incrementPage}
                        goToLastPage={goToLastPage}
                        lastPage={data?.totalPages}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CRM;

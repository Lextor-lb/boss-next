"use client";
import {
  BreadCrumbComponent,
  Container,
  Heading,
  Products,
} from "@/components/ecom";
import PaginationEcom from "@/components/ecom/PaginationEcom";
import ProductSkeleton from "@/components/ecom/ProductSkeleton";
import ErrorComponent from "@/components/ErrorComponent";
import { Backend_URL, getFetchForEcom } from "@/lib/fetch";
import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import ControlSheet from "@/components/ecom/ControlSheet";
import FilterForm from "@/components/ecom/FilterForm";

const GeneralizedPage = ({ params }: { params: any }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getData = (url: string) => {
    return getFetchForEcom(url);
  };

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const decodedString = decodeURIComponent(params.slug[0]);

  const { data, isLoading, error } = useSWR(
    `${Backend_URL}/ecommerce-Products/riddle?${decodedString}`,
    getData
  );

  let newString = decodedString.replace(/&page=\d+/, "");

  return (
    <div className=" py-8 space-y-4">
      <Container>
        <BreadCrumbComponent
          path="Home"
          currentPage={
            params.slug[1]
              ? decodeURIComponent(params.slug[1])
              : "Filtered Products"
          }
        />
        <Heading
          header={
            params.slug[1]
              ? decodeURIComponent(params.slug[1])
              : "Filtered Products"
          }
          desc={`the latest and greatest products to enhance his lifestyle`}
        />
      </Container>
      <div className=" py-3 border">
        <Container>
          <div className="flex justify-end items-center">
            <div className=" flex items-center gap-3">
              <ControlSheet
                closeRef={closeRef}
                buttonName={
                  <>
                    <SlidersHorizontal size={18} />{" "}
                    <span className=" ms-1">Filter & Sort</span>
                  </>
                }
                title="Filter"
                desc="Refine Your Style with Our Curated Fashion Filters"
              >
                <FilterForm closeRef={closeRef} />
              </ControlSheet>
            </div>
          </div>
        </Container>
      </div>
      {error ? (
        <ErrorComponent refetch={() => {}} />
      ) : (
        <>
          <Container>
            {isLoading ? (
              <div className=" grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4">
                <ProductSkeleton />
              </div>
            ) : (
              <Products data={data.data} isLoading={isLoading} />
            )}
          </Container>
          <div className=" py-3 border">
            <Container>
              <div className="flex gap-2 justify-end items-center">
                <div>
                  <PaginationEcom
                    currentPage={currentPage}
                    totalPages={data?.totalPages}
                    onPageChange={(page) => {
                      router.replace(
                        `/products-filter/${newString}&page=${page}/${decodeURIComponent(
                          params.slug[1]
                        )}`
                      );
                      setCurrentPage(page);
                    }}
                  />
                </div>
              </div>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralizedPage;

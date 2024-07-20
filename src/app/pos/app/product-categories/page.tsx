"use client";

import { useRef, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Container from "@/components/Container.components";
import TableSkeletonLoader from "@/components/TableSkeletonLoader";
import { Backend_URL } from "@/lib/api";
import { deleteFetch, getFetch } from "@/lib/fetch";
import { PaginationComponent } from "@/components/pos/inventory";
import {
  ProductCategoryControlBar,
  ProductCategoryTable,
} from "@/components/pos/product-categories";

export default function ProductCategoriesPage() {

  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [productSizingIds, setProductSizingIds] = useState<number[]>([]);

  const closeSheetRef = useRef();
  const openSheetRef = useRef<HTMLDivElement>(null);

  // for fetching
  const [currentPage, setCurrentPage] = useState(1);

  const [filterType, setFilterType] = useState("name");
  const [sortBy, setSortBy] = useState("asc");

  const filterTable = (value: string) => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");
    setFilterType(value);
  };

  const getCategories = (url: string) => {
    return getFetch(url);
  };

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
    setCurrentPage(data?.meta?.last_page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `${Backend_URL}/product-categories?page=${currentPage}&search=${searchInputValue}&orderDirection=${sortBy}&orderBy=${filterType}`,
    getCategories,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryInterval: 5000,
      revalidateOnMount: true,
    }
  );

  const {
    data: sizeData,
    error: sizeError,
    isLoading: isSizeLoading,
  } = useSWR(`${Backend_URL}/product-sizings/all`, getCategories, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryInterval: 5000,
    revalidateOnMount: true,
  });

  const refetch = () => {
    return mutate(
      `${Backend_URL}/product-categories?page=${currentPage}&search=${searchInputValue}&orderDirection=${sortBy}&orderBy=${filterType}`
    );
  };

  // delete

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.id);

    setIdsToDelete((prevIds) => {
      if (prevIds.includes(size)) {
        return prevIds.filter((item) => item !== size);
      } else {
        return [...prevIds, size];
      }
    });
  };

  const fetcher = async (url: string, { arg }: { arg: { ids: number[] } }) => {
    return deleteFetch(url, arg);
  };

  const { error: deleteError, trigger: drop } = useSWRMutation(
    `${Backend_URL}/product-categories`,
    fetcher
  );

  const handleDelete = async () => {
    const data = await drop({ ids: idsToDelete });
    if (data.status) setIdsToDelete([]);
    refetch();
  };

  const [editId, setEditId] = useState({
    status: false,
    id: "",
  });

  const handleEdit = (id: any): void => {
    setEditId({
      status: true,
      id,
    });
  };

  const resetValue = () => {
    setEditId({
      status: false,
      id: "",
    });
    setInputValue("");
  };

  console.log(data);

  return (
    <Container>
      <div className="space-y-3">
        <p>Product categories Page</p>

        <ProductCategoryControlBar
          isSelected={idsToDelete.length > 0}
          closeRef={closeSheetRef}
          dropCategory={handleDelete}
          openSheetRef={openSheetRef}
          editId={editId}
          setEditId={setEditId}
          inputValue={inputValue}
          setInputValue={setInputValue}
          resetValue={resetValue}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          refetch={refetch}
          //   sizeData={isSizeLoading ? [] : sizeData.data}
          //   productSizingIds={productSizingIds}
          //   setProductSizingIds={setProductSizingIds}
        />

        {isLoading || isValidating ? (
          <TableSkeletonLoader />
        ) : (
          <div className="space-y-5">
            <ProductCategoryTable
              dropCategory={handleDelete}
              data={data?.data}
              setIdsToDelete={setIdsToDelete}
              handleCheckboxChange={handleCheckboxChange}
              openSheetRef={openSheetRef}
              setInputValue={setInputValue}
              editId={editId}
              handleEdit={handleEdit}
              filterTable={filterTable}
              refetch={refetch}
              //   setProductSizingIds={setProductSizingIds}
            />
            <PaginationComponent
              goToFirstPage={goToFirstPage}
              currentPage={currentPage}
              decrementPage={decrementPage}
              incrementPage={incrementPage}
              goToLastPage={goToLastPage}
              lastPage={currentPage}
            />
          </div>
        )}
      </div>
    </Container>
  );
}

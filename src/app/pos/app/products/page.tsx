"use client";

import { useRef, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Container from "@/components/Container.components";
import TableSkeletonLoader from "@/components/TableSkeletonLoader";
import { Backend_URL } from "@/lib/api";
import { deleteFetch, deleteSingleFetch, getFetch } from "@/lib/fetch";
import ErrorComponent from "@/components/ErrorComponent";
import { ProductControlBar, ProductTable } from "@/components/pos/products";
import { ProductProvider } from "./Provider/ProductProvider";

export default function ProductPage() {
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [deleteId, setDeleteId] = useState<number | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");

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

  const getProducts = (url: string) => {
    return getFetch(url);
  };

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `${Backend_URL}/products?page=${currentPage}&search=${searchInputValue}&orderDirection=${sortBy}&orderBy=${filterType}`,
    getProducts,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryInterval: 5000,
      revalidateOnMount: true,
    }
  );

  const refetch = () => {
    return mutate(
      `${Backend_URL}/products?page=${currentPage}&search=${searchInputValue}&orderDirection=${sortBy}&orderBy=${filterType}`
    );
  };

  // delete

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const product = parseInt(event.target.id);

    setIdsToDelete((prevIds) => {
      if (prevIds.includes(product)) {
        return prevIds.filter((item) => item !== product);
      } else {
        return [...prevIds, product];
      }
    });
  };

  const fetcher = async (url: string, { arg }: { arg: { ids: number[] } }) => {
    return deleteFetch(url, arg);
  };

  const { error: deleteError, trigger: drop } = useSWRMutation(
    `${Backend_URL}/products`,
    fetcher
  );

  const handleDelete = async () => {
    const data = await drop({ ids: idsToDelete });
    if (data.status) setIdsToDelete([]);
    refetch();
  };

  // single delete

  const singleDeleteFetcher = async (url: string) => {
    return deleteSingleFetch(url);
  };

  const { error: singleDeleteError, trigger: singleDrop } = useSWRMutation(
    `${Backend_URL}/products/${deleteId}`,
    singleDeleteFetcher
  );

  const handleSingleDelete = async () => {
    const data = await singleDrop();
    if (data.status) setDeleteId(undefined);
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

  return (
    <Container>
      <div className="space-y-5">
        <p className=" text-xl font-semibold">Products Page</p>

        <ProductControlBar
          isSelected={idsToDelete.length > 0}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          drop={handleDelete}
        />
export default function ProductsPage() {

        {error ? (
          <ErrorComponent refetch={refetch} />
        ) : (
          <>
            {isLoading || isValidating ? (
              <TableSkeletonLoader />
            ) : (
              <ProductTable
                data={data?.data}
                setIdsToDelete={setIdsToDelete}
                handleCheckboxChange={handleCheckboxChange}
                editId={editId}
                handleEdit={handleEdit}
                filterTable={filterTable}
                refetch={refetch}
                handleSingleDelete={handleSingleDelete}
                setDeleteId={setDeleteId}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
}

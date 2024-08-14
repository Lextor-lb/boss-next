"use client";

import Container from "@/components/Container.components";
import NavHeader from "@/components/pos/NavHeader";
import React, { useEffect, useRef, useState } from "react";
import { Backend_URL, getFetch, postMediaFetch, putFetch } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import TableSkeletonLoader from "@/components/TableSkeletonLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Plus, PlusCircle } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormInput from "@/components/FormInput.components";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { PaginationComponent } from "@/components/pos/inventory";

const StockControlPage = () => {
  const router = useRouter();

  const [sheetOpen, setSheetOpen] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [singleId, setSingleId] = useState<number | undefined>();

  // for fetching
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("name");
  const [sortBy, setSortBy] = useState("asc");
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<string>("");

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
    setCurrentPage(data?.totalPages);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const getData = (url: string) => {
    return getFetch(url);
  };

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `${Backend_URL}/stock-reports?page=${currentPage}`,
    getData,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      errorRetryInterval: 5000,
      revalidateOnMount: true,
      refreshWhenHidden: true,
    }
  );

  const [editId, setEditId] = useState({
    status: false,
    id: "",
  });

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const { data: sizeData } = useSWR(
    `${Backend_URL}/product-sizings/all`,
    getData
  );

  const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

  const schema = z.object({
    image:
      typeof window !== "undefined"
        ? z
            .instanceof(File)
            .refine(
              (file) => validImageTypes.includes(file.type),
              ".jpg, .jpeg and .png files are accepted."
            )
            .optional()
        : z.any(),
    shopCode:
      typeof window !== "undefined"
        ? z.string().min(2, { message: "This field cannot be empty!" })
        : z.any(),
    colorCode:
      typeof window !== "undefined"
        ? z.string().min(2, { message: "This field cannot be empty!" })
        : z.any(),
    barcode:
      typeof window !== "undefined"
        ? z.string().min(2, { message: "This field cannot be empty!" })
        : z.any(),
    productSizingId:
      typeof window !== "undefined"
        ? z.number().min(1, { message: "This field cannot be empty!" })
        : z.any(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: undefined,
      shopCode: "",
      colorCode: "",
      barcode: "",
      productSizingId: parseInt(""),
    },
  });
  const postFetcher = async (url: string, { arg }: { arg: any }) => {
    return postMediaFetch(url, arg);
  };

  const {
    data: putData,
    trigger: add,
    error: addError,
  } = useSWRMutation(`${Backend_URL}/product-variants`, postFetcher);

  const onSubmit = async (value: any) => {
    const formData = new FormData();
    formData.append("image", value.image);
    formData.append("shopCode", value.shopCode);
    formData.append("colorCode", value.colorCode);
    formData.append("barcode", value.barcode);
    formData.append("productSizingId", value.productSizingId);
    formData.append("productId", `${editId.id}`);

    const res = await add(formData);
    console.log(res);
    if (res.status) {
      closeRef.current && closeRef.current.click();
      reset({
        image: undefined,
        shopCode: "",
        colorCode: "",
        barcode: "",
        productSizingId: parseInt(""),
      });
      mutate(`${Backend_URL}/stock-reports?page=${currentPage}`);
    }
  };

  console.log(data);
  return (
    <Container>
      <div className=" space-y-4">
        <NavHeader parentPage="Stock" path="Stock Control" />
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <div className=" space-y-4">
            <div className=" min-h-[740px]">
              <Table>
                <TableHeader className="hover:bg-white z-50">
                  <TableRow className="hover:bg-white bg-white">
                    <TableHead>
                      <span>No</span>
                    </TableHead>

                    <TableHead>
                      <div
                        // onClick={() => filterTable("name")}
                        className="flex gap-1 cursor-pointer select-none items-center"
                      >
                        <span>Product</span> <CaretSortIcon />
                      </div>
                    </TableHead>
                    <TableHead className=" text-end">Sale Price</TableHead>
                    <TableHead className=" text-end">Total Stock</TableHead>
                    <TableHead className=" text-end">Stock Level</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.products &&
                    data?.products.map(
                      (
                        {
                          id,
                          name,
                          totalStock,
                          salePrice,
                          stockLevel,
                          gender,
                          productCategory,
                          productFitting,
                          productType,
                        }: {
                          id: any;
                          name: string;
                          salePrice: number;
                          stockLevel: string;
                          benefit: number;
                          gender: string;
                          productBrand: string;
                          productCategory: string;
                          productFitting: string;
                          productType: string;
                          totalStock: number;
                        },
                        index: any
                      ) => (
                        <TableRow
                          className=" bg-white cursor-pointer hover:bg-white/50"
                          key={id}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <span>{index + 1}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className=" flex items-center gap-3">
                              <div className=" flex gap-1.5 flex-col">
                                <p className=" capitalize">{name}</p>
                                <div className=" flex gap-1">
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {gender.toLocaleLowerCase()}
                                  </div>
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {productType}
                                  </div>
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {productCategory}
                                  </div>
                                  <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                                    {productFitting}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className=" text-end">
                            {salePrice}
                          </TableCell>
                          <TableCell className=" text-end">
                            {totalStock}
                          </TableCell>
                          <TableCell className=" text-end">
                            <Badge
                              className={`${
                                stockLevel == "LowStock" && "!bg-red-400"
                              }
                        ${stockLevel == "InStock" && "!bg-green-400"}
                        ${stockLevel == "SoldOut" && "!bg-white"}
                        `}
                            >
                              {stockLevel}
                            </Badge>
                          </TableCell>

                          <TableCell
                            onClick={() => setEditId({ ...editId, id })}
                          >
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="outline" size={"sm"}>
                                  <Plus /> <p className=" ms-1">Add Stock</p>
                                </Button>
                              </SheetTrigger>
                              <SheetContent>
                                <SheetHeader>
                                  <SheetTitle>Add Stock</SheetTitle>
                                  <SheetDescription>
                                    Make new product here. Click save when you
                                    are done.
                                  </SheetDescription>
                                </SheetHeader>
                                <form
                                  onSubmit={handleSubmit(onSubmit)}
                                  className=" space-y-4"
                                >
                                  <input
                                    type="file"
                                    id="image"
                                    name={name}
                                    onChange={(e) => {
                                      if (e.target.files) {
                                        const file = e.target.files[0];
                                        setValue("image", file);
                                      }
                                    }}
                                  />
                                  <div className=" space-y-3">
                                    <FormInput
                                      label="Shop Code"
                                      id="shopCode"
                                      type="text"
                                      {...register("shopCode")}
                                    />

                                    <FormInput
                                      label="Color Code"
                                      id="color_code"
                                      type="text"
                                      {...register("colorCode")}
                                    />

                                    <div className=" flex flex-col gap-1.5">
                                      <Label>Select Size</Label>
                                      <Popover
                                        open={open}
                                        onOpenChange={setOpen}
                                      >
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="justify-between !rounded-md"
                                          >
                                            {size ? size : "Sizes"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                          <Command>
                                            <CommandInput
                                              placeholder="Search Size..."
                                              className="h-9"
                                            />
                                            <CommandEmpty>
                                              No sizes found!
                                            </CommandEmpty>
                                            <CommandGroup>
                                              <CommandList>
                                                {sizeData?.data.map(
                                                  ({ id, name }: any) => (
                                                    <CommandItem
                                                      className={cn(
                                                        size === name
                                                          ? "bg-accent"
                                                          : ""
                                                      )}
                                                      key={id}
                                                      value={name}
                                                      onSelect={(e) => {
                                                        setSize(e);
                                                        setValue(
                                                          "productSizingId",
                                                          parseInt(id)
                                                        );
                                                        setOpen(false);
                                                      }}
                                                    >
                                                      <Check
                                                        className={cn(
                                                          "mr-2 h-4 w-4",
                                                          size === name
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                        )}
                                                      />
                                                      {name}
                                                    </CommandItem>
                                                  )
                                                )}
                                              </CommandList>
                                            </CommandGroup>
                                          </Command>
                                        </PopoverContent>
                                      </Popover>
                                    </div>

                                    <FormInput
                                      className="basis-3/12"
                                      label="Barcode"
                                      id="barcode"
                                      {...register("barcode")}
                                      type="text"
                                    />
                                  </div>
                                  <div className="flex justify-between">
                                    <Button
                                      ref={closeRef}
                                      type="button"
                                      onClick={() =>
                                        closeRef.current &&
                                        closeRef.current.click()
                                      }
                                      variant="link"
                                    >
                                      Cancel
                                    </Button>
                                    <Button size="sm">Save changes</Button>
                                  </div>
                                  {addError && (
                                    <p className=" text-red-500 text-sm">
                                      {addError.message}
                                    </p>
                                  )}
                                </form>
                                <SheetFooter
                                  className={
                                    "flex !justify-between items-center"
                                  }
                                >
                                  <SheetClose asChild>
                                    <Button
                                      className="hidden"
                                      ref={closeRef}
                                      variant="link"
                                    >
                                      Cancel
                                    </Button>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <Button className="hidden" size="sm">
                                      Save changes
                                    </Button>
                                  </SheetClose>
                                </SheetFooter>
                              </SheetContent>
                            </Sheet>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </div>
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
      </div>
    </Container>
  );
};

export default StockControlPage;

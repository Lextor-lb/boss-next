import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";
import { CalendarDays, Clock1, Edit2, MinusCircle } from "lucide-react";
import ConfirmBox from "@/components/ConfirmBox";
import { Checkbox } from "@/components/ui/checkbox";
import { Backend_URL, getFetch } from "@/lib/fetch";
import useSWR from "swr";

type ProductTableType = {
  data: [];
  handleCheckboxChange: (e: any) => void;
  setIdsToDelete: Dispatch<SetStateAction<number[]>>;
  editId: any;
  handleEdit: (id: number) => void;
  filterTable: (value: string) => void;
  refetch: () => void;
  handleSingleDelete: () => void;
  setDeleteId: any;
};

const ProductTable = ({
  data,
  handleCheckboxChange,
  editId,
  handleEdit,
  filterTable,
  refetch,
  handleSingleDelete,
  setDeleteId,
}: ProductTableType) => {
  const getProduct = (url: string) => {
    return getFetch(url);
  };

  const { data: ProductData } = useSWR(
    editId.status ? `${Backend_URL}/products/${editId.id}` : null,
    getProduct,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryInterval: 5000,
    }
  );

  return (
    <div className=" min-h-[780px]">
      <Table>
        <TableHeader className="hover:bg-white z-50">
          <TableRow className="hover:bg-white bg-white">
            <TableHead>
              <span>No</span>
            </TableHead>

            <TableHead>
              <div
                onClick={() => filterTable("name")}
                className="flex gap-1 cursor-pointer select-none items-center"
              >
                <span>Product</span> <CaretSortIcon />
              </div>
            </TableHead>
            <TableHead className=" text-end">Stock</TableHead>
            <TableHead className=" text-end">Sale Price</TableHead>
            <TableHead className=" text-end">Benefit</TableHead>
            <TableHead className=" text-end">
              <div
                onClick={() => filterTable("createdAt")}
                className="flex gap-1 justify-end cursor-pointer select-none items-center"
              >
                <span>Date</span> <CaretSortIcon />
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(
            (
              {
                id,
                name,
                date,
                salePrice,
                benefit,
                stock,
                gender,
                medias,
                productCategory,
                productFitting,
                productType,
                time,
              }: {
                id: any;
                name: string;
                date: string;
                salePrice: number;
                stock: number;
                benefit: number;
                gender: string;
                productBrand: { name: string };
                productCategory: { name: string };
                productFitting: { name: string };
                productType: { name: string };
                medias: { url: string };
                time: string;
              },
              index
            ) => (
              <TableRow
                className=" bg-white cursor-pointer hover:bg-white/50"
                key={id}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={id}
                      value={id}
                      onClick={(e) => handleCheckboxChange(e)}
                      // data-state={selectedSizes.includes(id)}
                    />
                    <span>{index + 1}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className=" flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md">
                      <img
                        className="object-cover w-9 h-9 rounded-md"
                        src={medias.url}
                      />
                    </div>
                    <div className=" flex gap-1.5 flex-col">
                      <p className=" capitalize">{name}</p>
                      <div className=" flex gap-1">
                        <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                          {gender.toLocaleLowerCase()}
                        </div>
                        <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                          {productType.name}
                        </div>
                        <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                          {productCategory.name}
                        </div>
                        <div className="bg-muted/90 text-xs font-medium capitalize text-muted-foreground px-1.5 py-0.5 rounded-md">
                          {productFitting.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className=" text-end">{stock}</TableCell>
                <TableCell className=" text-end">{salePrice}</TableCell>
                <TableCell className=" text-end">{benefit}</TableCell>

                <TableCell className=" flex justify-end  h-full items-center">
                  <div className=" space-y-1">
                    <div className=" flex items-center gap-1">
                      <CalendarDays />
                      <p className=" text-sm">{date}</p>
                    </div>
                    <div className="flex  ">
                      <div
                        onClick={() => console.log(time)}
                        className=" bg-muted flex rounded items-center p-0.5 ps-0.5 px-1 text-xs gap-1"
                      >
                        <Clock1 width={18} height={18} />
                        <p className=" text-xs">{time}</p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end">
                    <Button
                      variant={"ghost"}
                      className="!p-0"
                      onClick={() => handleEdit(id)}
                    >
                      <Edit2 />
                    </Button>

                    <ConfirmBox
                      buttonName={<MinusCircle />}
                      buttonSize="sm"
                      buttonVariant={"ghost"}
                      confirmTitle={"Are you sure?"}
                      confirmDescription={"This action can't be undone!"}
                      confirmButtonText={"Yes, delete this."}
                      run={async () => {
                        await setDeleteId(id);
                        handleSingleDelete();
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;

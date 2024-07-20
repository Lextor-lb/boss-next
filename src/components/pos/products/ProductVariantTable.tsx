import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MinusCircle } from "lucide-react";
import ConfirmBox from "@/components/ConfirmBox";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProductVariableTable = ({
  variant,
  step,
  handleEdit,
  handleDelete,
}: any) => {
  console.log(variant);
  return (
    <>
      {variant == undefined ? null : (
        <Table className="bg-white">
          {variant.length === 0 && (
            <TableCaption>This list is empty!</TableCaption>
          )}
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead className="flex items-center gap-3">
                <span>No</span>
              </TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Shop Code</TableHead>
              <TableHead>Product Code</TableHead>
              <TableHead>Color Code</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Barcode</TableHead>
              {step !== 5 && <TableHead>Status</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {variant.map(
              ({
                image,
                shopCode,
                id,
                productCode,
                colorCode,
                barcode,
                sizeName,
                stock_status,
              }: any) => (
                <TableRow key={id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span>1</span>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    {image && (
                      <>
                        {typeof image == "string" ? (
                          <>
                            <Avatar>
                              <AvatarImage
                                className=" object-cover"
                                src={image}
                              />
                            </Avatar>
                          </>
                        ) : (
                          <Avatar>
                            <AvatarImage
                              className=" object-cover"
                              src={URL.createObjectURL(image[0])}
                            />
                          </Avatar>
                        )}
                      </>
                    )}
                  </TableCell> */}
                  <TableCell className=" text-start">{""}</TableCell>
                  <TableCell className=" text-start">{shopCode}</TableCell>
                  <TableCell className=" text-start">{productCode}</TableCell>
                  <TableCell className=" text-start">{colorCode}</TableCell>
                  <TableCell className=" text-start">{sizeName}</TableCell>
                  <TableCell className=" text-start">{barcode}</TableCell>
                  <TableCell className=" text-start">
                    {step !== 5 && (
                      <>
                        {stock_status == "soldOut" && (
                          <Badge variant={"destructive"}>Sold Out</Badge>
                        )}
                      </>
                    )}
                  </TableCell>
                  {step == 5 && (
                    <TableCell>
                      <div className="flex gap-3 items-center justify-end">
                        <ConfirmBox
                          buttonName={<MinusCircle />}
                          buttonSize="sm"
                          buttonVariant={"ghost"}
                          confirmTitle={"Are you sure?"}
                          confirmDescription={"This action can't be undone!"}
                          confirmButtonText={"Yes, delete this."}
                          run={() => {}}
                        />

                        <Button
                          variant={"ghost"}
                          className="!p-0"
                          onClick={() => handleEdit(id)}
                        >
                          <Edit2 />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ProductVariableTable;

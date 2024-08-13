"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRightCircle, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CustomerTable = ({ data }: any) => {
  const router = useRouter();
  return (
    <div className=" min-h-[780px]">
      <Table>
        <TableHeader className="hover:bg-white z-50">
          <TableRow className="hover:bg-white bg-white">
            <TableHead>
              <span>No</span>
            </TableHead>

            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Age Range</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(
            (
              {
                id,
                name,
                phoneNumber,
                ageRange,
                special,
              }: {
                id: any;
                name: string;
                phoneNumber: string;
                ageRange: string;
                special: {
                  id: number;
                };
              },
              index: any
            ) => (
              <TableRow
                className=" bg-white cursor-pointer hover:bg-white/50"
                key={id}
                onClick={() => {
                  router.push(`/pos/app/crm/customer-detail/${id}`);
                }}
              >
                <TableCell>
                  <span>{index + 1}</span>
                </TableCell>

                <TableCell>{name}</TableCell>
                <TableCell>{phoneNumber}</TableCell>
                <TableCell>
                  <Badge variant={"secondary"}>{ageRange}</Badge>
                </TableCell>
                <TableCell>
                  {/* <Badge variant={"secondary"}>{special.id}</Badge> */}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-3 justify-end">
                    <Button
                      onClick={() =>
                        router.push(`/pos/app/crm/edit-customer/${id}`)
                      }
                      variant={"ghost"}
                      className="!p-0"
                    >
                      <Edit2 />
                    </Button>
                    <Button
                      onClick={() => {
                        router.push(`/pos/app/crm/customer-detail/${id}`);
                      }}
                      variant={"ghost"}
                      className="!p-0"
                    >
                      <ArrowRightCircle />
                    </Button>
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

export default CustomerTable;

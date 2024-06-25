import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";
import { Edit2 } from "lucide-react";

const SizingTable = ({ data }: { data: [] }) => {
  console.log(data);
  return (
    <div className=" min-h-[680px]">
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
                <span>Size</span> <CaretSortIcon />
              </div>
            </TableHead>
            <TableHead>
              <div
                // onClick={() => filterTable("created_at")}
                className="flex gap-1 cursor-pointer select-none items-center"
              >
                <span>Date</span> <CaretSortIcon />
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(({ id, name, date }, index) => (
            <TableRow className=" bg-white pointer-events-none" key={id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {/* <Checkbox
                    id={id}
                    value={id}
                    onClick={(e) => handleCheckboxChange(e)}
                    data-state={selectedSizes.includes(id)}
                  /> */}
                  <span>{index + 1}</span>
                </div>
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell className="">
                <div className="flex items-center justify-end">
                  {/* <ModalBox
                    trigger={<MinusCircle />}
                    size="sm"
                    variant={"ghost"}
                    title={"Are you sure?"}
                    description={"This action can't be undone!"}
                    confirm={"Yes, delete this."}
                    fun={() => deleteSize(id)}
                  /> */}

                  <Button
                    variant={"ghost"}
                    className="!p-0"
                    // onClick={() => handleEdit(id)}
                  >
                    <Edit2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SizingTable;

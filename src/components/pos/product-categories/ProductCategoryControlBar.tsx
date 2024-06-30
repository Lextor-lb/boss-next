import React from "react";
import { Input } from "../../ui/input";
import { Trash2 } from "lucide-react";
import SizeForm from "./ProductCategoryForm";
import ConfirmBox from "@/components/ConfirmBox";
import { InventoryControlSheet } from "../inventory";

type controlBar = {
  closeRef: any;
  isSelected: boolean;
  dropCategory: () => void;
  openSheetRef: any;
  editId: any;
  setEditId: any;
  inputValue: string;
  setInputValue: any;
  resetValue: () => void;
  searchInputValue: string;
  setSearchInputValue: any;
  refetch: () => void;
};

const ProductCategoryControlBar = ({
  closeRef,
  isSelected,
  dropCategory,
  openSheetRef,
  editId,
  inputValue,
  resetValue,
  searchInputValue,
  setSearchInputValue,
  refetch,
}: controlBar) => {
  return (
    <div className=" flex justify-between">
      <div className=" flex gap-3">
        <Input
          placeholder="Search..."
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
        {isSelected && (
          <>
            <ConfirmBox
              buttonName={
                <>
                  <Trash2 width={16} /> <span className="ms-1">Delete</span>
                </>
              }
              buttonSize="sm"
              buttonVariant={"outline"}
              confirmTitle={"Are you sure?"}
              confirmDescription={"This action can't be undone!"}
              confirmButtonText={"Yes, delete this."}
              run={dropCategory}
            />
          </>
        )}
      </div>
      <InventoryControlSheet
        buttonName="Product Type"
        openSheetRef={openSheetRef}
        title={"Add Product Type"}
        description="Make new product types here. Click save when you're done."
        resetValue={resetValue}
        closeRef={closeRef}
      >
        <SizeForm
          closeRef={closeRef}
          editId={editId}
          inputValue={inputValue}
          resetValue={resetValue}
          refetch={refetch}
        />
      </InventoryControlSheet>
    </div>
  );
};

export default ProductCategoryControlBar;

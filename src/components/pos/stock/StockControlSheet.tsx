import React from "react";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const StockControlSheet = () => {
  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        if (open) {
          resetValue();
        }
      }}
    >
      <SheetTrigger asChild>
        <Button ref={openSheetRef}>
          <PlusCircle className=" me-1" />
          Add {buttonName}
        </Button>
      </SheetTrigger>
      <SheetContent className=" space-y-4">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className=" my-8"></div>
        {children}
        <SheetFooter className={"flex !justify-between items-center"}>
          <SheetClose asChild>
            <Button className="hidden" ref={closeRef} variant="link">
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
  );
};

export default StockControlSheet;

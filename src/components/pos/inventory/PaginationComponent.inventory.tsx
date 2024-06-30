import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface PaginationComponentProps {
  goToFirstPage: () => void;
  currentPage: number;
  decrementPage: () => void;
  incrementPage: () => void;
  goToLastPage: () => void;
  lastPage: number;
}

const PaginationComponent = ({
  goToFirstPage,
  currentPage,
  decrementPage,
  incrementPage,
  goToLastPage,
  lastPage,
}: PaginationComponentProps) => {
  return (
    <div className="flex justify-end items-start">
      <div className="flex items-center">
        <p className="text-sm text-primary/50">
          page ( {currentPage} ) of ( {lastPage} )
        </p>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={goToFirstPage}
                  // disabled={currentPage === 1}
                  className="cursor-pointer"
                >
                  <DoubleArrowLeftIcon width={20} height={20} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={decrementPage}
                  className="cursor-pointer"
                  // disabled={currentPage === 1}
                >
                  <ChevronLeftIcon width={20} height={20} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={incrementPage}
                  // disabled={currentPage === lastPage}
                  className="cursor-pointer"
                >
                  <ChevronRightIcon width={20} height={20} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={goToLastPage}
                  // disabled={currentPage === lastPage}
                  className="cursor-pointer"
                >
                  <DoubleArrowRightIcon width={20} height={20} />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;

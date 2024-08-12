import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Avatar, AvatarImage } from "../ui/avatar";

const BreadCrumbComponent = ({
  path,
  currentPage,
}: {
  path: string;
  currentPage: string;
}) => {
  return (
    <div className=" flex justify-between mb-3 items-center">
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className=" font-semibold text-base">
                {path}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {currentPage !== undefined && (
              <BreadcrumbSeparator>
                <div className=" w-2 h-2  bg-gray-700 rounded-full"></div>
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary/75 capitalize text-sm ">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadCrumbComponent;

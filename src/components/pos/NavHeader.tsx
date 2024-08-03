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

const NavHeader = ({
  parentPage,
  path,
  currentPage,
}: {
  parentPage: string;
  path?: string;
  currentPage?: string;
}) => {
  return (
    <div className=" flex justify-between mb-3 items-center">
      <div className="space-y-2">
        <p className="text-2xl font-medium">{parentPage}</p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>{path}</BreadcrumbLink>
            </BreadcrumbItem>
            {currentPage !== undefined && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className=" gap-3 flex items-center">
        <div>
          <p className=" text-sm text-end">Kar Yan Kyaw</p>
          <p className=" text-sm opacity-50 font-light text-end">active</p>
        </div>

        <Avatar>
          <AvatarImage src={""} />
        </Avatar>
      </div>
    </div>
  );
};

export default NavHeader;

import { menu } from "@/utils/constants";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type header = {
  name?: string;
  open?: any;
  openId?: number;
  routes: Array<menu>;
  handleOpen: Function;
};

const SidebarNavHeading = ({
  name,
  open,
  openId,
  handleOpen,
  routes,
}: header) => {
  const pathName = usePathname();
  const isOpen: boolean = open == openId;

  return (
    <>
      {name && (
        <div
          onClick={handleOpen(openId)}
          className=" flex justify-between cursor-pointer items-center"
        >
          <p className=" capitalize py-2 text-base font-medium">{name}</p>
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </div>
      )}

      {isOpen && (
        <>
          {routes.map(({ id, path, pageName, icon }) => {
            const isActive = pathName.includes(path);
            return (
              <Link
                key={id}
                href={path}
                className={`flex gap-2 ${
                  isActive && " bg-secondary"
                } items-center cursor-pointer  select-none hover:bg-secondary capitalize text-sm px-3 py-2 mb-2 rounded-md`}
              >
                {icon} {pageName}
              </Link>
            );
          })}
        </>
      )}
    </>
  );
};

export default SidebarNavHeading;

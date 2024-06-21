// import { useAppSelector } from "@/store/hooks";
import {
  BadgeCheck,
  FlipHorizontal2,
  LayoutGrid,
  PackageCheck,
  Ruler,
  Shirt,
  Store,
  ShoppingCart,
  Users2,
  Coins,
  UserPlus,
  Crown,
} from "lucide-react";
import { RulerSquareIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { ReactNode } from "react";

export interface menu {
  id: number;
  group: string;
  pageName: String;
  path: string;
  icon: ReactNode;
}

interface menuItems extends Array<menu> {}

export const sidebarMenuItems: menuItems = [
  {
    id: 1,
    group: "control",
    pageName: "Dashboard",
    path: "/pos",
    icon: <Store size={20} strokeWidth={1.5} />,
  },
  {
    id: 2,
    group: "control",
    pageName: "Sale",
    path: "/pos/sale",
    icon: <ShoppingCart size={20} strokeWidth={1.5} />,
  },

  {
    id: 4,
    group: "report",
    pageName: "Today",
    path: "sale-report-today",
    icon: <Coins size={20} strokeWidth={1.5} />,
  },
  {
    id: 5,
    group: "report",
    pageName: "Time Filter",
    path: "sale-report",
    icon: <Coins size={20} strokeWidth={1.5} />,
  },
  {
    id: 6,
    group: "report",
    pageName: "Brand",
    path: "sale-report-brand",
    icon: <BadgeCheck size={20} strokeWidth={1.5} />,
  },
  {
    id: 7,
    group: "report",
    pageName: "Product Type",
    path: "sale-report-product-type",
    icon: <Shirt size={20} strokeWidth={1.5} />,
  },
  {
    id: 8,
    group: "report",
    pageName: "Product Categories",
    path: "sale-report-product-categories",
    icon: <FlipHorizontal2 size={20} strokeWidth={1.5} />,
  },
  {
    id: 9,
    group: "report",
    pageName: "Fitting",
    path: "sale-report-fitting",
    icon: <Ruler size={20} strokeWidth={1.5} />,
  },
  {
    id: 10,
    group: "report",
    pageName: "Size",
    path: "sale-report-size",
    icon: <RulerSquareIcon className=" me-1" strokeWidth={1.5} />,
  },

  {
    id: 12,
    group: "CRM",
    pageName: "Customer List",
    path: "crm",
    icon: <Users2 size={20} strokeWidth={1.5} />,
  },
  {
    id: 13,
    group: "CRM",
    pageName: "Add Customer",
    path: "customer-control",
    icon: <UserPlus size={20} strokeWidth={1.5} />,
  },

  {
    id: 14,
    group: "CRM",
    pageName: "Level List",
    path: "level-list",
    icon: <Crown size={20} strokeWidth={1.5} />,
  },

  {
    id: 16,
    group: "inventory",

    pageName: "Product List",
    path: "/pos/products",
    icon: <PackageCheck size={20} strokeWidth={1.5} />,
  },
  {
    id: 17,
    pageName: "Brand",
    group: "inventory",
    path: "/pos/product-brands",
    icon: <BadgeCheck size={20} strokeWidth={1.5} />,
  },
  {
    id: 18,
    pageName: "Type",
    group: "inventory",
    path: "/pos/product-types",
    icon: <Shirt size={20} strokeWidth={1.5} />,
  },
  {
    id: 19,
    group: "inventory",
    pageName: "Category",
    path: "/pos/product-categories",
    icon: <FlipHorizontal2 size={20} strokeWidth={1.5} />,
  },
  {
    id: 20,
    group: "inventory",
    pageName: "Fitting",
    path: "/pos/product-fittings",
    icon: <Ruler size={20} strokeWidth={1.5} />,
  },
  {
    id: 21,
    group: "inventory",
    pageName: "Sizing",
    path: "/pos/product-sizings",
    icon: <RulerSquareIcon strokeWidth={1.5} />,
  },

  {
    id: 23,
    group: "profile", 
    pageName: "profile",
    path: "/pos/profile",
    icon: <Users2 size={20} strokeWidth={1.5} />,
  },
];

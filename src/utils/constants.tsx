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
export const sidebarMenuItems = [
	{
		id: 1,
		pageName: "Dashboard",
		parent: "",
		path: "/pos/",
		icon: <Store size={20} strokeWidth={1.5} />,
		index: true,
	},
	{
		id: 2,
		pageName: "Sale",
		path: "/pos/sale",
		icon: <ShoppingCart size={20} strokeWidth={1.5} />,
	},
	{
		type: "subHeading",
		title: "Sale Report",
		id: 3,
	},
	{
		id: 4,
		pageName: "Today",
		path: "sale-report-today",
		parent: "Today",
		subpart: "Sale Report",
		location: "Today",
		icon: <Coins size={20} strokeWidth={1.5} />,
	},
	{
		id: 5,
		pageName: "Time Filter",
		path: "sale-report",
		parent: "Time Filter",
		subpart: "Sale Report",
		location: "Time Filter",
		icon: <Coins size={20} strokeWidth={1.5} />,
	},
	{
		id: 6,
		pageName: "Brand",
		path: "sale-report-brand",
		parent: "Brand",
		subpart: "Sale Report",
		location: "Brand",
		icon: <BadgeCheck size={20} strokeWidth={1.5} />,
	},
	{
		id: 7,
		pageName: "Product Type",
		parent: "Product Type",
		subpart: "Sale Report",
		location: "Product Type",
		path: "sale-report-product-type",
		icon: <Shirt size={20} strokeWidth={1.5} />,
	},
	{
		id: 8,
		pageName: "Product Categories",
		parent: "Product Categories",
		subpart: "Sale Report",
		location: "Product Categories",
		path: "sale-report-product-categories",
		icon: <FlipHorizontal2 size={20} strokeWidth={1.5} />,
	},
	{
		id: 9,
		pageName: "Fitting",
		path: "sale-report-fitting",
		parent: "Product Fitting",
		subpart: "Sale Report",
		location: "Fitting",
		icon: <Ruler size={20} strokeWidth={1.5} />,
	},
	{
		id: 10,
		pageName: "Size",
		parent: "Sizes",
		subpart: "Sale Report",
		location: "Sizes",
		path: "sale-report-size",
		icon: <RulerSquareIcon className=" me-1" size={20} strokeWidth={1.5} />,
	},

	{
		type: "subHeading",
		title: "CRM",
		id: 11,
	},

	{
		id: 12,
		pageName: "Customer List",
		path: "crm",
		subpart: "Customer",
		location: "Customer List",
		icon: <Users2 size={20} strokeWidth={1.5} />,
	},
	{
		id: 13,
		pageName: "Add Customer",
		path: "customer-control",
		parent: "Customer",
		subpart: "Customer",
		location: "Add Customer",
		icon: <UserPlus size={20} strokeWidth={1.5} />,
	},

	{
		id: 14,
		pageName: "Level List",
		path: "level-list",
		parent: "Level List",
		subpart: "CRM",
		location: "Level List",
		icon: <Crown size={20} strokeWidth={1.5} />,
	},
	{
		id: 14,
		pageName: "Add Level List",
		path: "level-list",
		parent: "Level List",
		subpart: "CRM",
		location: "Level List",
		icon: <Crown size={20} strokeWidth={1.5} />,
	},
	{
		type: "subHeading",
		title: "Manage Inventory",
		id: 15,
	},
	{
		id: 16,
		pageName: "Product List",
		parent: "Manage Inventory",
		path: "/pos/products",
		icon: <PackageCheck size={20} strokeWidth={1.5} />,
	},
	{
		id: 17,
		pageName: "Brand",
		path: "/pos/product-brands",
		parent: "Manage Inventory",
		icon: <BadgeCheck size={20} strokeWidth={1.5} />,
	},
	{
		id: 18,
		pageName: "Type",
		path: "/pos/product-types",
		parent: "Manage Inventory",
		icon: <Shirt size={20} strokeWidth={1.5} />,
	},
	{
		id: 19,
		pageName: "Category",
		path: "/pos/product-categories",
		parent: "Manage Inventory",
		icon: <FlipHorizontal2 size={20} strokeWidth={1.5} />,
	},
	{
		id: 20,
		pageName: "Fitting",
		path: "/pos/product-fittings",
		parent: "Manage Inventory",
		icon: <Ruler size={20} strokeWidth={1.5} />,
	},
	{
		id: 21,
		pageName: "Sizing",
		parent: "Manage Inventory",
		path: "/pos/product-sizings",
		icon: <RulerSquareIcon strokeWidth={1.5} />,
	},
	{
		type: "subHeading",
		title: "User",
		id: 22,
	},
	{
		id: 23,
		pageName: "profile",
		path: "/pos/profile",
		parent: "User",
		icon: <Users2 size={20} strokeWidth={1.5} />,
	},
];

// {
// 	id: 8,
// 	label: "Settings",
// 	icon: <IoMdSettings />,
// 	route: "/backoffice/settings",
// },

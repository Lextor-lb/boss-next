"use client";

import { sidebarMenuItems } from "@/utils/constants";
import Link from "next/link";

export default function Sidebar() {
	return (
		<div>
			<div className="space-y-3">
				<p className=" text-xl font-semibold">Boss Nation</p>{" "}
				<ul className=" space-y-2">
					{sidebarMenuItems.map(({ id, icon, path, pageName, title, type }) =>
						type === "subHeading" ? (
							<p className=" py-2 text-base font-medium" key={id}>
								{title}
							</p>
						) : (
							<Link
								key={id}
								href={path}
								className={
									"flex gap-2 items-center hover:bg-secondary  capitalize text-sm px-3 py-2 rounded-md"
								}
							>
								{icon} {pageName}
							</Link>
						)
					)}
				</ul>
			</div>
		</div>
	);
}

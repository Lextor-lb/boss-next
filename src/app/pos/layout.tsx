import Sidebar from "@/components/pos/dashboard/sidebar.dashboard";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect } from "react";

export default function BackofficeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<div className=" w-full h-full">{children}</div>
		</div>
	);
}

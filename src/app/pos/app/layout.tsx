"use client";
import Sidebar from "@/components/pos/dashboard/sidebar.dashboard";
import { Button } from "@/components/ui/button";
import { clearTokens } from "@/lib/lib";
import { useRouter } from "next/navigation";

export default function BackofficeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter(); // Use the useRouter hook

	const handleSubmit = async () => {
		const result = await clearTokens();
		router.push("/pos/login");
	};

	return (
		<div className="grid grid-cols-12">
			<div className=" col-span-2">
				<div className="p-5 h-screen">
					<div className="flex h-full justify-between flex-col">
						<Sidebar />
						<Button variant="outline" size="sm" onClick={handleSubmit}>
							Log Out
						</Button>
					</div>
				</div>
			</div>
			<div className="col-span-10">
				<div className="py-5 min-h-screen bg-secondary">
					<div className=" w-full h-full">{children}</div>
				</div>
			</div>
		</div>
	);
	return (
		<div className="grid grid-cols-12">
			<div className=" col-span-2">
				<div className="p-5 h-screen">
					<div className="flex h-full justify-between flex-col">
						<Sidebar />
						<Button variant="outline" size="sm">
							Log Out
						</Button>
					</div>
				</div>
			</div>
			<div className="col-span-10">
				<div className="p-5 min-h-screen bg-secondary">
					<div className=" w-full h-full">{children}</div>
				</div>
			</div>
		</div>
	);
}

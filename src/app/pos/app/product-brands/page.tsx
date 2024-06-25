'use client'
import { useSession } from "next-auth/react";

export default function ProductBrandsPage() {
	const { data: session } = useSession();
	console.log(session);

	return (
		<div className=" bg-black">
			<p className="text-red-600">ProductBrandsPage</p>
		</div>
	);
}

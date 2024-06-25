"use client";
import Container from "@/components/Container.components";
import TableSkeletonLoader from "@/components/TableSkeletonLoader";
import { SizeControlBar, SizingTable } from "@/components/pos/sizing";
import { Backend_URL, fetchApi } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
export default function ProductSizingsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const {data: session } = useSession();
	const getSizes = (url: string) => {
		return fetchApi(url, "GET",session?.accessToken);
	};

	const { data, error } = useSWR(
		`${Backend_URL}/product-sizings`,
		getSizes,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			errorRetryInterval: 1000,
			// revalidateOnMount: false,
		}
	);

	console.log(data);

	useEffect(() => {
		if (data) setIsLoading(false);
	}, [data]);

	return (
		<Container>
			<div className=" space-y-3">
				<p>ProductSizingsPage</p>

				<SizeControlBar />

				{/* <p>{error && <p>{data?.message}</p>}</p> */}

				{isLoading ? (
					<TableSkeletonLoader />
				) : (
					<SizingTable data={data?.data} />
				)}
			</div>
		</Container>
	);
}

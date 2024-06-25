"use client";

import Container from "@/components/Container.components";
import TableSkeletonLoader from "@/components/TableSkeletonLoader";
import { SizeControlBar, SizingTable } from "@/components/pos/sizing";
import { fetchApi } from "@/lib/api";
import { useEffect, useState } from "react";
import useSWR from "swr";
const Backend_URL = process.env.BACKEND_URL;

export default function ProductSizingsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const getSizes = (url: string) => {
		return fetchApi(url, "GET");
	};

	const { data, error } = useSWR(`https://amt.santar.store/product-sizings`, getSizes, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		errorRetryInterval: 10000,
		// revalidateOnMount: false,
	});

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

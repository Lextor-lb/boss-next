import { getSession } from "@/lib/lib";

export default async function ProductFittingsPage() {
	const session = await getSession();

	return (
		<div>
			<p>ProductFittingsPage</p>
			<div>{JSON.stringify(session, null, 2)}</div>
		</div>
	);
}

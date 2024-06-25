// 'use server'
import { cookies } from "next/headers";

export default function ProductTypesPage() {
	const token = cookies().get("next-auth.session-token");
	console.log('hi');
	return (
		<div>
			<p>ProductTypesPage</p>
		</div>
	);
}
